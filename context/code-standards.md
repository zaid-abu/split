# Code Standards

These standards keep Split production-grade across sessions. Follow them for every implementation unless the current user request explicitly overrides them.

## Engineering Principles

- Read the relevant context docs before implementation.
- Read Expo SDK 57 docs before changing Expo-specific APIs.
- Build visible UI with realistic mock data before wiring backend behavior unless the task is backend-only.
- Keep changes scoped to the active feature.
- Prefer existing local patterns over new abstractions.
- Add abstractions only when they remove real duplication or clarify a shared contract.
- Treat money logic as critical infrastructure: pure, deterministic, tested.
- Never hide failures, conflicts, queued writes, or permission denials.

## TypeScript

Rules:

- Strict TypeScript only.
- Do not use `any`.
- Use `unknown` and narrow when the shape is uncertain.
- Exported functions should have explicit return types.
- Use `type` for domain shapes and unions.
- Use `interface` only for component props intended to be extended.
- Prefer `const`.
- Avoid broad type assertions.
- Keep discriminated unions for state machines and service result types.

Example:

```ts
type Loadable<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; message: string; retryable: boolean };
```

## React and React Native

Rules:

- Use function components and named exports.
- Use React Native primitives and project UI primitives.
- Use `StyleSheet.create`.
- Use theme tokens for colors, spacing, radii, typography, and shadows.
- No inline styles except one-off animated values or platform-specific values that cannot be represented cleanly otherwise.
- Use `Pressable` for custom touch targets.
- Keep touch targets at least 44px.
- Respect safe areas.
- Keep components small enough to understand their state and props.
- Do not store derived financial truth in component state.

Component order:

```tsx
// 1. External imports
import { StyleSheet, View } from "react-native";

// 2. Internal imports
import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

// 3. Types
type BalanceRowProps = {
  label: string;
  amount: string;
  tone: "positive" | "negative" | "neutral";
};

// 4. Component
export function BalanceRow({ label, amount, tone }: BalanceRowProps) {
  return (
    <View style={styles.root}>
      <AppText role="body">{label}</AppText>
      <AppText role="body" tone={tone === "neutral" ? "primary" : tone}>
        {amount}
      </AppText>
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

## Expo Router

Rules:

- Routes live under `src/app`.
- Use `(auth)` and `(tabs)` route groups.
- Root layout owns providers, fonts, splash handling, and session bootstrap.
- Auth layout owns unauthenticated stack presentation.
- Tabs layout owns bottom navigation.
- Creation and edit flows should be full-screen routes.
- Focused selectors can be modal routes or bottom-sheet components.
- Validate route params before data access.
- Render not-found or no-access states for inaccessible resources.

## Imports and Files

Rules:

- Use `@/` alias for imports from `src`.
- Avoid relative imports that climb more than one directory.
- Component files use PascalCase.
- Hook files start with `use`.
- Service files use camelCase domain names.
- Utility files use camelCase.
- Keep one reusable component per file unless small private subcomponents are tightly coupled.
- Do not leave unused exports.

## UI Components

Rules:

- Reusable UI lives in `src/components`.
- Presentational components do not import Supabase clients or services.
- Components should expose explicit variants instead of style bags where possible.
- Reusable components need accessibility labels when interactive.
- Built reusable components must be added to `context/ui-registry.md`.
- Components must support realistic long names, large amounts, empty values, disabled state, and loading state when relevant.

## Services

Services live in `src/services/` and own Supabase access.

Rules:

- Validate payloads before mutation.
- Scope every query by current user, friend, group, or route resource.
- Rely on RLS but still avoid broad client queries.
- Map raw backend errors into typed domain errors.
- Never expose service role behavior in the client.
- Use Edge Functions for privileged or multi-table transactional operations.
- Realtime subscriptions must unsubscribe on cleanup.

Suggested service result shape:

```ts
type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };
```

## Supabase

Rules:

- Supabase client setup lives in `src/lib/supabase.ts`.
- Use public Expo env vars only for safe client values.
- Never ship service role keys.
- Storage uploads use scoped paths.
- Signed URLs should be used for private files.
- Mutations that must be atomic should use Edge Functions or Postgres RPC/transaction patterns.
- Activity and notification records should be created with financial mutations.

## Money and Split Logic

Rules:

- Store amount and currency explicitly.
- Prefer minor-unit integer calculations for durable money logic.
- Never use floating point math casually for final stored values.
- Format display values through money helpers.
- Parse amount input through money helpers.
- Split calculations must sum exactly to total minor units.
- Remainders are assigned deterministically.
- Multi-currency debt simplification is forbidden in a single pass.
- Settlement suggestions must never produce negative or impossible payments.

Required helpers:

- `formatMoney`.
- `parseMoneyInput`.
- `toMinorUnits`.
- `fromMinorUnits`.
- `splitEqually`.
- `splitByPercentages`.
- `splitByShares`.
- `splitByExactAmounts`.
- `splitWithAdjustments`.
- `validateSplitTotal`.
- `simplifyDebts`.

Required tests:

- Zero and negative validation.
- Currencies with different minor units.
- Equal split with remainder.
- Percent split rounding.
- Shares with uneven totals.
- Exact split mismatch.
- Adjustment split.
- Debt simplification deterministic ordering.

## State Management

Rules:

- Keep server truth in services/hooks.
- Keep form draft state local to screens or form hooks.
- Keep pure derived values computed from source data.
- Avoid global state until a cross-screen need is proven.
- Represent loading, empty, error, offline, success, and conflict as explicit states.
- Do not collapse all failures into a boolean.

## Error Handling

Rules:

- Never use empty catch blocks.
- Log developer details with a clear prefix.
- User-facing errors must be human-readable.
- Retryable failures expose retry.
- Auth failures route to sign-in only when the session is invalid.
- Offline mutations show queued, syncing, synced, or failed.
- Preserve user-entered form data after recoverable failures.

Error categories:

- `validation`
- `auth`
- `permission`
- `network`
- `not_found`
- `conflict`
- `server`

## Accessibility

Rules:

- Icon-only controls require accessibility labels.
- Inputs require labels and error announcements.
- Touch targets should be at least 44px.
- Financial state cannot rely on color alone.
- Avoid clipped text containers.
- Use semantic copy for states and actions.

## Dependencies

Current core dependencies are Expo SDK 57 packages, React 19, and React Native 0.86.

Approved additions when needed:

- `@supabase/supabase-js` for Supabase client.
- `expo-secure-store` for mobile auth token persistence if selected.
- `expo-auth-session` for OAuth when required.
- `expo-notifications` for push and local notifications.
- `expo-contacts` for contact import.
- `expo-image-picker` for receipts, avatars, and group covers.
- `expo-camera` if direct camera capture is required.
- Chart library TBD for analytics.

Do not add a dependency without:

- Confirming Expo SDK 57 compatibility.
- Updating this file.
- Updating `library-docs.md`.
- Explaining why existing Expo or React Native APIs are insufficient.

## Events and Analytics

Approved event names:

| Event | When | Key Properties |
| --- | --- | --- |
| `sign_up_completed` | User completes onboarding | userId |
| `friend_added` | Friendship accepted or contact invited | userId, friendId or inviteMethod |
| `group_created` | Group is created | userId, groupId, groupType |
| `expense_added` | Expense is saved | userId, expenseId, groupId, amountMinor, currency, splitMethod |
| `expense_edited` | Expense changes | userId, expenseId, version |
| `expense_deleted` | Expense soft-deleted | userId, expenseId, version |
| `settlement_recorded` | Settlement is saved | userId, settlementId, amountMinor, currency |
| `debts_simplified` | User views simplified suggestions | userId, groupId, suggestionCount |
| `export_created` | CSV/PDF export generated | userId, exportType |

Do not invent new event names without updating this table.

## Environment Variables

Use Expo public variables only for values safe to ship to the client.

| Variable | Used In |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase client |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase client |
| `EXPO_PUBLIC_APP_SCHEME` | Deep links |
| `EXPO_PUBLIC_SITE_URL` | Web redirects and invite links |

Secrets belong in Supabase Edge Function environment variables, never in Expo.

## Comments and Documentation

Rules:

- Prefer readable code over comments.
- Comment the reason for non-obvious financial, auth, sync, or platform decisions.
- Do not leave TODO comments in completed feature code.
- Update `ui-registry.md` after reusable UI work.
- Update `progress-tracker.md` after completed feature work.

## Validation Before Done

Before handing off a feature:

- Run `npm run lint` unless impossible.
- Run tests for touched financial helpers.
- Check TypeScript if a script exists.
- Manually review 320px mobile layout.
- Confirm loading, empty, error, offline, and success states.
- Confirm docs are updated when required.
