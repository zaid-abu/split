# Architecture

## System Overview

Split is an Expo Router application backed by Supabase. The app should be structured so screens compose UI and domain state, services own Supabase access, and pure helpers own financial calculations. Production behavior depends on clear boundaries: presentation components should not know about Supabase tables, and Supabase services should not know about visual layout.

Expo SDK 57 docs are the authority for Expo APIs:

```txt
https://docs.expo.dev/versions/v57.0.0/
```

Read the versioned docs before changing Expo-specific implementation.

## Stack

| Layer | Tool | Purpose |
| --- | --- | --- |
| App runtime | Expo SDK 57 | iOS, Android, and web runtime |
| Routing | Expo Router | File-based routes, stacks, tabs, modals, deep links |
| UI | React Native 0.86 + React 19 | Cross-platform screens and components |
| Language | TypeScript strict | Type safety and explicit domain contracts |
| Backend | Supabase | Auth, Postgres, Storage, Edge Functions, Realtime |
| Auth | Supabase Auth | Email/password, phone OTP, OAuth when wired |
| Database | Supabase Postgres | Source of truth for ledger and social data |
| Storage | Supabase Storage | Avatars, group covers, receipts, exports |
| Realtime | Supabase Realtime | Active feeds, notifications, balance refresh prompts |
| Styling | React Native StyleSheet + tokens | Stable tokenized visual system |
| Images | `expo-image` | Avatars, covers, receipt previews |
| Linking | `expo-linking` | Invites and app deep links |
| Notifications | Expo Notifications | Reminders and activity notifications |
| Contacts | Expo Contacts | Optional contact import |
| Media | Expo Image Picker / Camera | Avatars, covers, receipts |
| Charts | TBD | Analytics after library selection |

## Folder Structure

```txt
/
├── AGENTS.md
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   ├── progress-tracker.md
│   └── designs/
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── types/
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

## App Boundary Rules

| Area | Owns | Must Not Own |
| --- | --- | --- |
| `src/app/` | Route files, screen composition, navigation options, screen-level state | Raw Supabase queries in JSX, complex financial math |
| `src/components/` | Reusable presentational UI, local interaction states | Domain mutations, table names, service role logic |
| `src/hooks/` | Screen-facing state composition, subscriptions, loading/error orchestration | Unscoped Supabase calls, hidden global mutation side effects |
| `src/services/` | Supabase domain reads/writes, RLS-scoped queries, mutation payload validation | UI styling, React Native components |
| `src/lib/` | Pure helpers, Supabase client, money logic, dates, errors, debt simplification | React component rendering |
| `src/constants/` | Theme, categories, currencies, routes, fixed option sets | Runtime backend access |
| `src/types/` | Database and domain types | Business logic |
| `supabase/` | Migrations, RLS, functions, seed data | Client UI code |

## Data Flow

Read flow:

```txt
Screen route
  -> domain hook or service
  -> Supabase query with explicit scope
  -> typed domain model
  -> reusable UI component
  -> loading/empty/error/offline/success state
```

Mutation flow:

```txt
User action
  -> local validation
  -> service mutation or Edge Function
  -> Postgres transaction where needed
  -> activity and notification rows
  -> Realtime event or refetch
  -> user-visible saved/queued/failed state
```

Expense balance flow:

```txt
expenses
  -> expense_splits
  -> settlements
  -> ledger entries
  -> friend/group net balances
  -> dashboard, analytics, simplify debts
```

Cached totals may exist for performance only if they can be rebuilt from ledger source data.

## Route Architecture

Auth routes:

```txt
src/app/(auth)/_layout.tsx
src/app/(auth)/splash.tsx
src/app/(auth)/welcome.tsx
src/app/(auth)/sign-in.tsx
src/app/(auth)/register.tsx
src/app/(auth)/verify.tsx
src/app/(auth)/profile-setup.tsx
src/app/(auth)/permissions.tsx
```

Authenticated tabs:

```txt
src/app/(tabs)/_layout.tsx
src/app/(tabs)/home.tsx
src/app/(tabs)/friends.tsx
src/app/(tabs)/groups.tsx
src/app/(tabs)/activity.tsx
src/app/(tabs)/account.tsx
```

Stack routes should sit outside tabs for details and full-screen flows. Modal-like routes should use Expo Router presentation options when appropriate.

Routing rules:

- Root layout owns fonts, splash handling, app providers, session bootstrap, and global error boundaries.
- Auth layout owns unauthenticated stack screens.
- Tabs layout owns only bottom navigation.
- Detail screens validate route params and resource access.
- Missing or inaccessible resources render a not-found state, not a crash.
- Deep links for invites must validate server-side before opening group or friend detail.

## Supabase Data Model

### `profiles`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | References `auth.users` |
| username | text | Unique, searchable |
| full_name | text | Required after setup |
| avatar_url | text | Storage path or signed/public URL |
| phone | text | Optional |
| email | text | From auth |
| default_currency | text | ISO 4217, default `USD` |
| locale | text | Device or user preference |
| onboarding_completed | boolean | Controls auth flow |
| created_at | timestamptz | Server generated |
| updated_at | timestamptz | Server generated |

### `friendships`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| requester_id | uuid | Sender |
| addressee_id | uuid | Receiver |
| status | text | pending / accepted / blocked |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

Constraints:

- A pair can have only one active friendship relationship.
- Users cannot create friendships with themselves.
- RLS must restrict visibility to involved users.

### `groups`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| name | text | Required |
| type | text | trip / home / couple / event / other |
| icon | text | Emoji or app icon key |
| cover_url | text | Storage path or URL |
| default_currency | text | ISO 4217 |
| created_by | uuid | References profiles |
| archived_at | timestamptz | Null when active |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

### `group_members`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| group_id | uuid | References groups |
| user_id | uuid | References profiles |
| role | text | admin / member |
| status | text | invited / active / removed / left |
| joined_at | timestamptz |  |

Rules:

- Every active group needs at least one admin.
- Removed or left users keep historical expense references.
- Membership controls group read/write RLS.

### `expenses`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| group_id | uuid | Nullable for one-to-one expenses |
| created_by | uuid | References profiles |
| paid_by | uuid | References profiles |
| title | text | Required |
| amount_minor | integer | Minor units for exact arithmetic |
| currency | text | ISO 4217 |
| category | text | Category key |
| expense_date | date | User-selected date |
| notes | text | Optional |
| receipt_url | text | Storage path or URL |
| split_method | text | equal / percentage / shares / exact / adjustment |
| version | integer | Optimistic conflict detection |
| deleted_at | timestamptz | Soft delete |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

Use `amount_minor` for durable calculations. If an existing migration uses numeric amounts, client helpers must normalize to deterministic minor-unit math before split calculations.

### `expense_splits`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| expense_id | uuid | References expenses |
| user_id | uuid | References profiles |
| amount_minor | integer | Owed amount in expense currency |
| currency | text | ISO 4217, same as expense unless explicit conversion added |
| share_value | numeric | Optional method-specific input |
| created_at | timestamptz |  |

Rules:

- Split rows must sum exactly to the expense total in minor units.
- Participants remain visible even if they later leave a group.

### `settlements`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| group_id | uuid | Nullable for friend settlement |
| payer_id | uuid | User who paid |
| receiver_id | uuid | User who received |
| amount_minor | integer | Minor units |
| currency | text | ISO 4217 |
| method | text | cash / bank / card / other / recorded |
| note | text | Optional |
| created_by | uuid | References profiles |
| created_at | timestamptz |  |

### Supporting Tables

Use these when phases require them:

- `activity_items`: audit feed for expense, settlement, group, friend, invite, and comment changes.
- `notifications`: durable in-app notification records independent of push delivery.
- `expense_comments`: comments on expenses.
- `recurring_expenses`: recurring templates, schedule metadata, next run date.
- `attachments`: optional generalized file metadata for receipts, avatars, covers, and exports.
- `invite_tokens`: group/friend invite links with expiry and usage state.

## RLS and Security

Security rules:

- Never ship Supabase service role keys in the Expo app.
- All client queries must rely on RLS and include explicit user, friend, or group scope.
- Privileged writes, multi-table transactions, notification fan-out, and payment webhooks belong in Edge Functions.
- Storage paths must be scoped by user, group, or expense.
- Signed URLs should be used for private files.
- Raw Supabase error details should be logged for developers but translated for users.

Minimum RLS expectations:

- Profiles: user can read limited public profile fields for friends/group members; user can update only self.
- Friendships: only requester/addressee can read or change relevant rows.
- Groups: only active members can read; only admins can update destructive settings.
- Expenses/splits/settlements: only involved users or active group members can read; writes require membership and validation.
- Activity/notifications: only relevant users can read.

## Realtime Strategy

Use Realtime only where live updates improve the visible screen:

- Active group detail expense feed.
- Active activity feed.
- Notification badge count.
- Possibly friend detail when settling or editing.

Rules:

- Subscribe only while the screen is focused.
- Unsubscribe during cleanup.
- Realtime events should prompt local cache update or refetch.
- Reconnect should trigger a refetch because Realtime is not the source of truth.

## Offline and Sync Strategy

The production target should support offline-aware states even before full offline mutation persistence is built.

Required behavior:

- Show when data may be stale.
- Disable actions that cannot be safely queued.
- For queueable mutations, show queued, syncing, synced, and failed states.
- Never pretend a mutation succeeded before the app can reconcile it.
- Reconcile conflicts on editable financial records by comparing `version` or updated timestamps.

## Error Taxonomy

Use consistent error categories:

- `validation`: user input is incomplete or invalid.
- `auth`: session expired or user lacks permission.
- `network`: request failed or device appears offline.
- `not_found`: resource deleted, expired, or inaccessible.
- `conflict`: stale version or concurrent edit.
- `server`: unexpected backend failure.

Services should convert raw backend failures into typed errors. Screens should convert typed errors into human-readable UI.

## Performance Expectations

- Lists should render with stable keys and virtualized components when large.
- Dashboard queries should be compact and scoped to visible summaries.
- Receipt and avatar images should use stable dimensions to avoid layout shift.
- Expensive financial calculations should be pure and memoizable.
- Avoid large base64 image payloads in component state.

## Testing Expectations

Minimum coverage by layer:

- `src/lib/money.ts`: parse, format, rounding, minor unit conversion.
- `src/lib/splitMath.ts`: all split methods and remainder handling.
- `src/lib/debtSimplification.ts`: deterministic suggestions, multi-currency guard.
- `src/services/*`: payload validation and typed error mapping where practical.
- Screens: smoke coverage or manual QA for loading, empty, error, offline, and success states.

## Production Release Gates

Before considering a phase complete:

- `npm run lint` passes.
- TypeScript checks pass if configured.
- Financial helper tests pass when touched.
- No new dependency is added without documenting it in `code-standards.md` and `library-docs.md`.
- `ui-registry.md` is updated for reusable UI.
- `progress-tracker.md` is updated for completed feature work.
