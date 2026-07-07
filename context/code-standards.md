# Code Standards

Implementation rules for Split. These prevent pattern drift across sessions.

---

## Engineering Mindset

- Read `project-overview.md`, `architecture.md`, `ui-rules.md`, and this file before implementing a feature.
- Check Expo SDK 57 docs before writing Expo-specific code.
- Build visible UI first with realistic mock data, then wire Supabase.
- Keep changes scoped to the active feature.
- Every feature must have loading, empty, error, and success states.
- Financial logic must be deterministic, tested, and easy to audit.

---

## TypeScript

- Strict TypeScript only.
- Never use `any`; use `unknown` and narrow.
- Prefer explicit return types for exported functions.
- Use `type` for domain shapes and unions.
- Use `interface` only for component props that are intentionally extendable.
- Use `const` by default.
- All async work must handle errors.
- Domain calculations must be pure functions where possible.

---

## Expo and React Native

- Expo SDK 57 is the version authority.
- Expo Router file-based routing lives under `src/app`.
- Use route groups for auth and tabs: `(auth)` and `(tabs)`.
- Use `Stack`, `Tabs`, and modal presentation from Expo Router.
- Root layout owns font loading, splash handling, theme bootstrap, Supabase session provider, and global error boundaries.
- Screen files compose features; reusable UI lives in `src/components`.
- Use React Native primitives and project UI primitives. Do not introduce web-only assumptions.
- Use `StyleSheet.create` with theme tokens for stable styles.
- Use `Pressable` for custom press targets and ensure minimum 44px hit areas.
- Respect safe areas on every screen.

---

## File and Folder Naming

- Folders: kebab-case for feature folders when needed.
- Screen route files: Expo Router conventions.
- Component files: PascalCase, one component per file.
- Hooks: camelCase starting with `use`.
- Services: camelCase domain names, e.g. `expenses.ts`.
- Utilities: camelCase, e.g. `splitMath.ts`.
- Types: `domain.ts`, `database.ts`, `navigation.ts`.

---

## Component Structure

```tsx
// 1. External imports
import { Pressable, StyleSheet, View } from "react-native";

// 2. Internal imports
import { theme } from "@/constants/theme";
import { AppText } from "@/components/ui/AppText";

// 3. Types
type Props = {
  title: string;
  amount: string;
  tone: "positive" | "negative" | "neutral";
};

// 4. Component
export function BalanceRow({ title, amount, tone }: Props) {
  return (
    <View style={styles.root}>
      <AppText>{title}</AppText>
      <AppText>{amount}</AppText>
    </View>
  );
}

// 5. Styles
const styles = StyleSheet.create({
  root: {
    padding: theme.spacing[4],
  },
});
```

Rules:

- Named exports only for components.
- Props type lives directly above the component unless shared.
- No inline styles except one-off animated values.
- No direct Supabase calls from presentational components.
- Keep components small enough to reason about their states.

---

## Supabase Usage

- Supabase client setup lives in `src/lib/supabase.ts`.
- Domain reads and writes live in `src/services`.
- Every query must rely on RLS and include explicit user/group scope where applicable.
- Validate inputs before calling Supabase.
- Never store service role keys in the app.
- Use Edge Functions for privileged operations, transactions, push notification fan-out, and payment webhooks.
- Storage uploads must use scoped paths.
- Realtime subscriptions must unsubscribe on cleanup.

---

## Money and Split Logic

- Never use floating point math casually for final stored money values.
- Store amount and currency explicitly.
- Convert display values through money helpers.
- Split calculations must sum exactly to the expense total after rounding.
- Remainders should be assigned deterministically.
- Support split methods: equal, percentage, shares, exact, adjustment.
- Settlement suggestions must never produce negative or impossible payments.
- Multi-currency groups must show conversion assumptions and conflict states.

---

## Error Handling

- Never use empty catch blocks.
- Log developer details with a clear prefix.
- User-facing errors must be human readable.
- Retryable network failures should expose a retry action.
- Auth failures should route to sign-in only when the session is invalid.
- Offline mutations must show queued, synced, or failed status.

---

## Events and Analytics

Approved event names:

| Event | When | Key Properties |
| --- | --- | --- |
| `sign_up_completed` | User completes onboarding | userId |
| `friend_added` | Friendship accepted or contact invited | userId, friendId or inviteMethod |
| `group_created` | Group is created | userId, groupId, groupType |
| `expense_added` | Expense is saved | userId, expenseId, groupId, amount, currency, splitMethod |
| `expense_edited` | Expense changes | userId, expenseId, version |
| `settlement_recorded` | Settlement is saved | userId, settlementId, amount, currency |
| `debts_simplified` | User views simplified suggestions | userId, groupId, suggestionCount |
| `export_created` | CSV/PDF export generated | userId, exportType |

Do not invent new event names without updating this table.

---

## Environment Variables

Use Expo public variables only for values safe to ship to the client.

| Variable | Used In |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase client |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase client |
| `EXPO_PUBLIC_APP_SCHEME` | Deep links |
| `EXPO_PUBLIC_SITE_URL` | Web redirects and invite links |

Secrets belong in Supabase Edge Function environment variables, not in Expo.

---

## Dependencies

Current core dependencies are Expo SDK 57 packages, React 19, and React Native 0.86.

Approved additions when needed:

- `@supabase/supabase-js` for Supabase client.
- `expo-secure-store` for mobile auth token storage if selected for Supabase persistence.
- `expo-auth-session` if OAuth flow requires explicit session handling.
- `expo-notifications` for push and local notifications.
- `expo-contacts` for contact import.
- `expo-image-picker` for receipts and avatars.
- `expo-camera` if direct camera capture is required.
- Chart library TBD for analytics.

Do not install a new dependency without updating this list and explaining why native Expo APIs are insufficient.

---

## Import Aliases

Use the `@/` alias for imports from `src`.

```ts
import { theme } from "@/constants/theme";
import { createExpense } from "@/services/expenses";
```

Avoid deep relative imports that go up more than one level.

---

## Comments

- Prefer readable code over explanatory comments.
- Comment the reason for non-obvious financial, auth, sync, or platform decisions.
- Do not leave TODO comments in completed feature code.
