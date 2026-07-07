# Library Docs

Project-specific usage patterns for third party libraries in Split. Check this file before touching any listed library.

---

## Authority Order

For library behavior:

```
Official current docs → Expo SDK 57 docs → This file → Existing code
```

For Expo APIs, read the exact versioned docs first:

`https://docs.expo.dev/versions/v57.0.0/`

---

## Expo SDK 57

Expo SDK 57 is the project baseline.

Confirmed package baseline from the local project:

- `expo` `~57.0.4`
- `react-native` `0.86.0`
- `react` `19.2.3`
- `expo-router` `~57.0.4`
- `expo-image` `~57.0.0`

Rules:

- Check Expo v57 docs before using or changing Expo APIs.
- Prefer Expo modules over unmanaged native packages.
- Do not add config plugins unless required by the selected Expo module.
- Keep app config changes in `app.json` or `app.config.ts`.

---

## Expo Router

Routes live in `src/app`.

Recommended structure:

```txt
src/app/
  _layout.tsx
  (auth)/
    _layout.tsx
    splash.tsx
    welcome.tsx
    sign-in.tsx
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
  friends/[id].tsx
  groups/[id].tsx
  expenses/new.tsx
  expenses/[id].tsx
```

Rules:

- Root layout initializes providers and global app concerns.
- Auth layout owns unauthenticated stack presentation.
- Tabs layout owns bottom navigation only.
- Use route params for resource IDs.
- Validate IDs and show not-found states when resources do not exist or are inaccessible.

---

## Supabase

Add `@supabase/supabase-js` before wiring backend features.

### Client Setup

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
);
```

Rules:

- The anon key is public and must be protected by RLS.
- Never ship service role keys in Expo.
- Put domain queries in `src/services`, not in screens.
- Validate mutation payloads before sending them.
- Use Edge Functions for privileged operations and multi-table transactions.

### Auth

Supported methods:

- Email/password or email magic link.
- Phone OTP.
- Google OAuth.
- Apple OAuth.

Rules:

- Root provider listens to auth state changes.
- Session bootstrap decides whether to show auth, onboarding, or tabs.
- Store only safe session state on the client.
- On logout, clear local UI state and navigate to sign-in.

### Realtime

Use Realtime for:

- Group activity feed.
- Expense changes inside active group detail.
- Notifications badge count.

Rules:

- Subscribe only on focused screens where realtime value is visible.
- Unsubscribe on cleanup.
- Do not rely on Realtime as the only data source; refetch after reconnect.

### Storage

Buckets:

- `avatars`
- `group-covers`
- `receipts`
- `exports`

Rules:

- Compress or resize images before upload if needed.
- Use scoped paths from `architecture.md`.
- Save resulting storage path or signed/public URL to the database.
- Do not keep large base64 images in component state longer than necessary.

---



## `expo-image`

Use for:

- User avatars.
- Group covers.
- Receipt previews.

Rules:

- Always provide placeholder/fallback UI.
- Use stable aspect ratios for receipts and covers.
- Avoid layout shift while images load.
- Do not use receipt images as dark or blurred decorative backgrounds when the user needs to inspect them.

---

## `expo-linking`

Use for:

- Group invite links.
- Friend invite links.
- Payment deep links if integrated later.

Rules:

- Validate invite tokens server-side.
- Show expired, deleted, or invalid invite states.
- Never assume a deep link target exists.

---

## Notifications

Use Expo Notifications when the feature is added.

Notification categories:

- Friend request.
- Group invite.
- Expense added or edited.
- Settlement confirmation.
- Reminder.

Rules:

- Ask permission after onboarding, not on first launch.
- Provide notification preferences in Account.
- Store notification records in Supabase even if push delivery fails.
- Edge Functions should fan out remote notifications.

---

## Contacts

Use Expo Contacts when contact import is added.

Rules:

- Request permission only from the contact sync screen.
- Explain why contacts are needed before the OS prompt.
- Do not upload a full address book by default.
- Prefer hashed or user-confirmed contact identifiers if backend matching is needed.

---

## Camera and Media Picker

Use Expo Image Picker for gallery selection and either Image Picker camera launch or Expo Camera for direct capture.

Rules:

- Request permission at the point of use.
- Support both receipt photo and avatar/group cover upload.
- Show upload progress and retry.
- Allow deleting or replacing receipt attachments.

---

## Money Helpers

Implement money logic in `src/lib/money.ts` and `src/lib/splitMath.ts`.

Required helpers:

- Format amount by currency and locale.
- Parse amount input safely.
- Split equally with deterministic remainder handling.
- Split by exact amounts.
- Split by percentages.
- Split by shares.
- Apply adjustments.
- Validate split total equals expense amount.

Rules:

- Keep calculation functions pure.
- Add tests for rounding and edge cases.
- Never bury split math inside components.

---

## Debt Simplification

Implement in `src/lib/debtSimplification.ts`.

Input:

- Net balances per user inside a group and currency.

Output:

- Minimal practical payments from debtors to creditors.

Rules:

- Do not mix currencies in one simplification pass.
- Preserve total net balance at zero after rounding.
- Sort suggestions deterministically.
- Show suggestions as recommendations, not automatic payments.
