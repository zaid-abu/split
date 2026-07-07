# Architecture

## Stack

| Layer | Tool | Purpose |
| --- | --- | --- |
| App framework | Expo SDK 57 | iOS, Android, and web app runtime |
| Routing | Expo Router | File-based routing, tabs, stacks, modals, deep links |
| UI runtime | React Native 0.86 + React 19 | Cross-platform UI |
| Backend | Supabase | Auth, Postgres, Storage, Edge Functions, Realtime |
| Auth | Supabase Auth | Email, phone OTP, Google, Apple |
| Database | Supabase Postgres | Source of truth for users, groups, expenses, balances |
| Storage | Supabase Storage | Avatars, group covers, receipt photos |
| Realtime | Supabase Realtime | Activity, group, and balance updates |
| Styling | React Native StyleSheet + tokens | Tokenized flat UI |
| Images | `expo-image` | Avatars, covers, receipts |
| Linking | `expo-linking` | Invite links and deep links |
| Notifications | Expo Notifications | Reminders and activity notifications |
| Camera/media | Expo Image Picker / Camera | Receipt attachment |
| Charts | TBD | Analytics visualizations |
| Language | TypeScript strict | App-wide type safety |

Expo SDK 57 docs are the implementation authority for Expo APIs. Check `https://docs.expo.dev/versions/v57.0.0/` before writing Expo-specific code.

---

## Folder Structure

```
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
│   └── progress-tracker.md
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── +not-found.tsx
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx
│   │   │   ├── splash.tsx
│   │   │   ├── welcome.tsx
│   │   │   ├── sign-in.tsx
│   │   │   ├── verify.tsx
│   │   │   ├── profile-setup.tsx
│   │   │   └── permissions.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── friends.tsx
│   │   │   ├── groups.tsx
│   │   │   ├── activity.tsx
│   │   │   └── account.tsx
│   │   ├── friends/
│   │   ├── groups/
│   │   ├── expenses/
│   │   ├── settle-up/
│   │   ├── analytics/
│   │   ├── search.tsx
│   │   └── filters.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── friends/
│   │   ├── groups/
│   │   ├── expenses/
│   │   ├── settlements/
│   │   ├── activity/
│   │   ├── analytics/
│   │   └── account/
│   ├── constants/
│   │   ├── theme.ts
│   │   ├── categories.ts
│   │   └── currencies.ts
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   ├── balances.ts
│   │   ├── splitMath.ts
│   │   ├── debtSimplification.ts
│   │   ├── money.ts
│   │   ├── dates.ts
│   │   └── errors.ts
│   ├── services/
│   │   ├── profiles.ts
│   │   ├── friends.ts
│   │   ├── groups.ts
│   │   ├── expenses.ts
│   │   ├── settlements.ts
│   │   ├── activity.ts
│   │   ├── notifications.ts
│   │   └── analytics.ts
│   └── types/
│       ├── database.ts
│       ├── domain.ts
│       └── navigation.ts
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
├── assets/
├── app.json
├── package.json
└── tsconfig.json
```

---

## System Boundaries

| Area | Owns |
| --- | --- |
| `src/app/` | Route files, screen composition, navigation options |
| `src/components/` | Reusable UI only, no direct Supabase writes |
| `src/services/` | Supabase queries and mutations by domain |
| `src/lib/` | Shared clients, pure calculations, formatting, error helpers |
| `src/constants/` | Tokens, categories, currencies, fixed option sets |
| `src/hooks/` | UI-facing state composition and subscriptions |
| `src/types/` | Shared TypeScript types |
| `supabase/` | Migrations, policies, Edge Functions, seed data |

---

## Data Flow

### Read Flow

```
Screen
  ↓
Domain hook or service
  ↓
Supabase query
  ↓
Typed domain model
  ↓
Tokenized UI component
```

### Mutation Flow

```
User action
  ↓
Validate input locally
  ↓
Service mutation or Edge Function
  ↓
Postgres write in transaction where needed
  ↓
Activity row + notification rows
  ↓
Realtime update or query refresh
```

### Expense Balance Flow

```
Expense
  ↓
Expense participants and split rows
  ↓
Ledger entries
  ↓
Friend/group balance view
  ↓
Dashboard, analytics, settle-up suggestions
```

Balances must be derivable from ledger data. Cached totals are allowed only if they can be rebuilt.

---

## Supabase Database Schema

### `profiles`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | References `auth.users` |
| username | text | Unique, searchable |
| full_name | text | Required after setup |
| avatar_url | text | Supabase Storage URL |
| phone | text | Optional |
| email | text | From auth |
| default_currency | text | ISO 4217, default `USD` |
| locale | text | Default from device |
| onboarding_completed | boolean | Controls auth flow |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

### `friendships`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| requester_id | uuid | User who sent request |
| addressee_id | uuid | User who receives request |
| status | text | pending / accepted / blocked |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

### `groups`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| name | text | Required |
| type | text | trip / home / couple / event / other |
| icon | text | Emoji or icon key |
| cover_url | text | Storage URL |
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

### `expenses`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| group_id | uuid | Nullable for one-to-one friend expenses |
| created_by | uuid | References profiles |
| paid_by | uuid | References profiles |
| title | text | Required |
| amount | numeric | Original amount |
| currency | text | ISO 4217 |
| category | text | Category key |
| expense_date | date | User-selected date |
| notes | text | Optional |
| receipt_url | text | Storage URL |
| split_method | text | equal / percentage / shares / exact / adjustment |
| version | integer | Optimistic conflict detection |
| deleted_at | timestamptz | Soft delete |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

### `expense_splits`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| expense_id | uuid | References expenses |
| user_id | uuid | Participant |
| owed_amount | numeric | Amount owed in expense currency |
| percentage | numeric | Nullable |
| shares | numeric | Nullable |
| adjustment_amount | numeric | Nullable |

### `settlements`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| group_id | uuid | Nullable |
| payer_id | uuid | User sending money |
| receiver_id | uuid | User receiving money |
| amount | numeric | Settlement amount |
| currency | text | ISO 4217 |
| method | text | cash / bank / upi / stripe / paypal / venmo / other |
| status | text | recorded / processing / completed / failed |
| note | text | Optional |
| settled_at | timestamptz |  |
| created_at | timestamptz |  |

### `activity`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| actor_id | uuid | User who caused the event |
| group_id | uuid | Nullable |
| expense_id | uuid | Nullable |
| settlement_id | uuid | Nullable |
| type | text | expense_added / expense_edited / settled / comment_added / invite_sent / etc. |
| metadata | jsonb | Display payload |
| created_at | timestamptz |  |

### `comments`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| expense_id | uuid | References expenses |
| author_id | uuid | References profiles |
| body | text | Required |
| created_at | timestamptz |  |
| updated_at | timestamptz |  |

### `notifications`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| user_id | uuid | Recipient |
| type | text | reminder / friend_request / payment / invite / activity |
| title | text | Display title |
| body | text | Display body |
| metadata | jsonb | Navigation payload |
| read_at | timestamptz | Null if unread |
| created_at | timestamptz |  |

### `recurring_expenses`

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid | Primary key |
| group_id | uuid | Nullable |
| created_by | uuid | Owner |
| template | jsonb | Expense defaults and split settings |
| frequency | text | weekly / monthly / yearly / custom |
| next_run_at | timestamptz |  |
| active | boolean |  |

---

## Storage Buckets

| Bucket | Path | Contents |
| --- | --- | --- |
| `avatars` | `{user_id}/avatar.{ext}` | Profile photos |
| `group-covers` | `{group_id}/cover.{ext}` | Group cover images |
| `receipts` | `{expense_id}/{file_id}.{ext}` | Receipt photos |
| `exports` | `{user_id}/{export_id}.{ext}` | CSV/PDF exports |

Access must be scoped by RLS policies and signed URLs where appropriate.

---

## Authentication

- Provider: Supabase Auth.
- Methods: email, phone OTP, Google OAuth, Apple OAuth.
- Auth state is initialized in the root layout.
- Protected groups: all tabs and domain detail routes.
- Public groups: splash, welcome, sign-in, verify.
- On first login, route to profile setup until `onboarding_completed = true`.

---

## Invariants

- Every Supabase read/write is scoped to the current user through RLS and query filters.
- Money is stored as numeric values with explicit currency. Never infer currency from locale.
- Balance views are derived from expenses, splits, and settlements.
- Mutations that affect multiple tables use a transaction or Supabase Edge Function.
- Expense edits increment `version` for conflict detection.
- Soft delete expenses and groups where historical balances depend on them.
- UI must show loading, empty, error, offline, and conflict states for production workflows.
