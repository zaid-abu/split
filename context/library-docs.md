# Library Docs

This file records project-specific library usage rules for Split. For official behavior, check the current official docs first. For Expo APIs, use the exact SDK 57 docs.

Authority order:

```txt
Official current docs
-> Expo SDK 57 docs for Expo APIs
-> this file
-> existing code
```

Expo SDK 57 docs:

```txt
https://docs.expo.dev/versions/v57.0.0/
```

## Confirmed Local Baseline

Confirmed package baseline from the local project:

- `expo` `~57.0.4`
- `expo-router` `~57.0.4`
- `react-native` `0.86.0`
- `react` `19.2.3`
- `expo-image` `~57.0.0`

Before adding or changing library usage:

- Confirm SDK 57 compatibility.
- Prefer Expo modules over unmanaged native packages.
- Avoid config plugins unless required by the selected Expo module.
- Update `code-standards.md` if a new dependency is approved.

## Expo Router

Use for:

- File-based routing.
- Auth and tabs route groups.
- Stack navigation.
- Modal routes.
- Deep link destinations.

Recommended structure:

```txt
src/app/
  _layout.tsx
  +not-found.tsx
  (auth)/
    _layout.tsx
    splash.tsx
    welcome.tsx
    sign-in.tsx
    register.tsx
    verify.tsx
    profile-setup.tsx
    permissions.tsx
  (tabs)/
    _layout.tsx
    home.tsx
    friends.tsx
    groups.tsx
    activity.tsx
    account.tsx
  friends/
  groups/
  expenses/
  settle-up/
  analytics/
  search.tsx
  filters.tsx
```

Rules:

- Root layout initializes providers and global concerns.
- Auth layout owns unauthenticated presentation.
- Tabs layout owns bottom navigation only.
- Use stack routes for creation, details, and settings.
- Use modal presentation for filters, pickers, and confirmations when appropriate.
- Route params must be validated before use.
- Render not-found or no-access states instead of crashing.

## Supabase

Add or use `@supabase/supabase-js` for:

- Auth.
- Postgres reads and writes.
- Storage signed/public URLs.
- Realtime channels.
- Edge Function invocation.

Client setup belongs in `src/lib/supabase.ts`.

Rules:

- Use `EXPO_PUBLIC_SUPABASE_URL`.
- Use `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- The anon key is public and protected by RLS.
- Never ship service role keys in Expo.
- Do not call Supabase directly from presentational components.
- Put domain queries and mutations in `src/services`.
- Validate mutation payloads before sending.
- Convert raw backend errors into typed app errors.

### Supabase Auth

Supported product paths:

- Email/password first.
- Phone OTP when wired.
- Google OAuth when wired.
- Apple OAuth when wired.

Rules:

- Root provider listens to auth state changes.
- Session bootstrap decides between auth, onboarding, permissions, and tabs.
- Profile row creation must be idempotent.
- Logout clears local UI state and navigates to sign-in.
- Do not show OAuth or OTP as working unless backend and redirect handling are complete.

### Supabase Realtime

Use for:

- Group activity feed while visible.
- Expense changes in active group detail.
- Notification badge counts.
- Possibly active friend detail.

Rules:

- Subscribe only on focused screens.
- Unsubscribe on cleanup.
- Realtime is not the source of truth; refetch after reconnect.
- Handle duplicate or out-of-order events defensively.

### Supabase Storage

Buckets:

- `avatars`
- `group-covers`
- `receipts`
- `exports`

Rules:

- Use scoped paths.
- Prefer signed URLs for private files.
- Compress or resize images before upload when needed.
- Show upload progress and retry state.
- Save storage path or URL in database after successful upload.
- Avoid keeping large base64 payloads in component state.

### Supabase Edge Functions

Use for:

- Privileged operations.
- Multi-table transactional writes when the client cannot guarantee atomicity.
- Invite token validation and creation if sensitive.
- Notification fan-out.
- Payment webhooks if payments are added.
- Scheduled recurring expense generation if implemented server-side.

Rules:

- Service role keys live only in Edge Function environment.
- Functions should validate caller identity and permissions.
- Return typed, user-safe error codes.

## `expo-image`

Use for:

- User avatars.
- Group covers.
- Receipt previews.
- Optional illustration assets.

Rules:

- Always provide fallback UI.
- Use stable width/height or aspect ratio.
- Avoid layout shift while images load.
- Do not use receipt images as decorative dark/blurred backgrounds when the user needs to inspect them.
- Avatar components need fallback initials.

## `expo-linking`

Use for:

- Group invite links.
- Friend invite links.
- Web redirects.
- Payment deep links if integrated later.

Rules:

- Invite tokens must be validated server-side.
- Show expired, invalid, already-used, no-access, and deleted-resource states.
- Never assume a deep link target exists.
- Use `EXPO_PUBLIC_APP_SCHEME` and `EXPO_PUBLIC_SITE_URL` for configured links.

## Expo Notifications

Use when notification features are implemented.

Notification categories:

- Friend request.
- Group invite.
- Expense added.
- Expense edited.
- Settlement recorded.
- Reminder.
- Comment mention or reply if comments are built.

Rules:

- Ask permission after onboarding or at a clear point of value.
- Provide notification preferences in Account.
- Store notification rows in Supabase even if push delivery fails.
- Edge Functions should fan out remote notifications.
- App UI must not depend only on push delivery.

## Expo Contacts

Use when contact import is implemented.

Rules:

- Request permission only from the contact import flow or permissions screen.
- Explain why contacts are needed before the OS prompt.
- Do not upload a full address book by default.
- Prefer hashed or user-confirmed identifiers for matching.
- Provide denied and limited/unavailable states.

## Expo Image Picker and Camera

Use for:

- Avatar selection.
- Group cover selection.
- Receipt attachment.

Rules:

- Request permission at point of use.
- Support replace and delete attachment.
- Show upload progress.
- Show retry on upload failure.
- Avoid storing large base64 images in state.
- Use Expo Camera only if direct capture is required; image picker camera launch may be enough.

## Expo Secure Store

Use only if selected for mobile auth persistence.

Rules:

- Confirm SDK 57 behavior before implementation.
- Do not store service role secrets.
- Store only session data appropriate for client persistence.
- Have a web fallback if needed.

## `expo-symbols`

Use where available for familiar SF Symbol-style icons, especially:

- Back.
- Search.
- Filter.
- Add.
- More.
- Edit.
- Trash.
- Check.
- Warning.
- Home/tabs.

Rules:

- Icon-only controls need accessibility labels.
- Icons should not be the only signal for financial state.
- If another icon library is added later, document why and use it consistently.

## Chart Library

Analytics charts are planned but the chart library is intentionally TBD.

Selection criteria:

- Expo SDK 57 compatibility.
- React Native and web behavior acceptable for development.
- Accessible labels or ability to render labels.
- Small enough bundle and maintenance risk.
- Works for simple bar, line, donut/pie, and trend visuals.

Do not add a chart dependency until analytics implementation begins and the choice is documented here.

## Money Helpers

Implement in:

- `src/lib/money.ts`
- `src/lib/splitMath.ts`
- `src/lib/debtSimplification.ts`

Rules:

- Keep helpers pure.
- Use minor units for durable calculations.
- Support currency minor-unit differences.
- Add tests for rounding and edge cases.
- Never bury split math inside components.

Required helper groups:

- Parse and format money.
- Split equally.
- Split by exact amounts.
- Split by percentages.
- Split by shares.
- Split by adjustments.
- Validate split total.
- Simplify group debts.

## Testing Libraries

Use the project’s existing test setup if present. If no setup exists, add the smallest compatible test setup only when a tested feature requires it.

Expected tests:

- Pure financial helpers.
- Debt simplification.
- Date and money formatting.
- Service payload validation where practical.

Do not add heavy end-to-end tooling until the app shell and core flows are stable.
