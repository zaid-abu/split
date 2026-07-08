# UI Registry

This is the living registry for Split UI components and visual patterns. Read this before creating a reusable component. Update it after every reusable component is built or materially changed.

The visual system is based on:

- `context/designs/Auth Flow.png`
- `context/designs/image.png`

Production UI must be consistent, accessible, tokenized, and state-aware.

## How to Use

Before building a component:

1. Check whether a similar component or pattern exists here.
2. Match its API, tokens, variants, accessibility expectations, and layout behavior.
3. If no component exists, build from `ui-rules.md` and `ui-tokens.md`.
4. Add the new component to this registry with file path, purpose, variants, tokens, states, and notes.

After changing a reusable component, record:

- Component name.
- File path.
- Purpose.
- Props and variants.
- Key style tokens.
- Required states.
- Accessibility notes.
- Design source or pattern notes.

## Design Pattern Source

### Auth Flow Pattern

Reference: `context/designs/Auth Flow.png`

Use for:

- Welcome and onboarding screens.
- Sign-in and registration screens.
- Verification, profile setup, and permission education.
- Icon-led rounded fields.
- Deep indigo full-width CTA buttons.
- Compact top bar with back control and avatar decoration.
- Finance illustration panels.

Do not imply working social login, phone OTP, or push/contact permission behavior until it is wired.

### Dashboard and Wallet Pattern

Reference: `context/designs/image.png`

Use for:

- Dashboard hierarchy.
- Net balance or wallet-style summary panels adapted to Split.
- Recent friends and sharing sections.
- Transaction/activity rows.
- Chart preview cards.
- Rounded bottom navigation and central action.

Replace wallet-specific actions with Split actions such as add expense, settle up, create group, invite friend, simplify debts, and export.

## Planned Core Components

| Component | Purpose | Status |
| --- | --- | --- |
| `AppText` | Tokenized typography primitive | Built |
| `AppScreen` | Safe-area screen wrapper with app background | Built |
| `AppCard` | Tokenized solid card | Built |
| `AppButton` | Primary, secondary, positive, danger, ghost buttons | Built |
| `IconButton` | Accessible icon-only button | Built |
| `TextField` | Labeled input with help/error text | Built |
| `AuthVisual` | Finance illustration panel for auth | Built |
| `AuthField` | Auth-specific icon-led field | Built |
| `AuthSocialButton` | Social auth placeholder button | Built |
| `AuthTopBar` | Auth back/avatar top row | Built |
| `AmountInput` | Currency-aware amount entry | Planned |
| `SegmentedControl` | Period/mode selection | Planned |
| `BalancePill` | Positive/negative/settled/pending balance indicator | Planned |
| `Avatar` | User avatar with fallback initials | Planned |
| `AvatarStack` | Compact overlapping participant avatars | Planned |
| `CategoryIcon` | Expense category visual | Planned |
| `EmptyState` | Empty screen or section with CTA | Planned |
| `SkeletonRow` | Loading placeholder for lists | Planned |
| `ErrorState` | Human-readable recoverable errors | Planned |
| `OfflineBanner` | Offline, stale, queued, and failed sync state | Planned |
| `BottomSheet` | Picker and confirmation sheet container | Planned |
| `MoneyRow` | Label + amount row with financial tone | Planned |
| `ExpenseRow` | Expense list row | Planned |
| `FriendRow` | Friend balance row | Planned |
| `GroupRow` | Group balance row | Planned |
| `ActivityRow` | Activity feed row | Planned |
| `SectionHeader` | Section title with optional action | Planned |
| `QuickAction` | Dashboard shortcut button/card | Planned |

## Built Components

### `AppText`

- **File:** `src/components/ui/AppText.tsx`
- **Purpose:** Tokenized text primitive for typography and semantic text colors.
- **Variants:** `role` supports all `theme.typography` roles; `tone` supports primary, secondary, muted, inverse, accent, positive, negative, and warning.
- **Key style tokens:** `theme.typography`, `theme.colors.textPrimary`, `textSecondary`, `textMuted`, `textInverse`, `accent`, `positive`, `negative`, `warning`.
- **Required states:** Text remains readable on all card surfaces and does not use viewport-scaled font sizes.
- **Accessibility notes:** Do not use color tone alone to communicate financial meaning.

### `AppScreen`

- **File:** `src/components/ui/AppScreen.tsx`
- **Purpose:** Safe-area-aware screen wrapper with Split app background and mobile-first padding.
- **Variants:** `scroll` enables scrollable or fixed-height layouts; `contentStyle` allows screen-level layout composition.
- **Key style tokens:** `theme.colors.background`, `theme.spacing[4]`, `theme.spacing[5]`.
- **Required states:** Must respect safe areas and support 320px-wide mobile layouts.
- **Pattern notes:** Use as the default wrapper for screens unless a route needs a highly custom layout.

### `AppCard`

- **File:** `src/components/ui/AppCard.tsx`
- **Purpose:** Tokenized solid card for dashboard summaries, sections, grouped rows, and state modules.
- **Variants:** `default`, `primary`, `tintBlue`, and `tintPurple`.
- **Key style tokens:** `theme.colors.surface`, `surfaceElevated`, `surfaceTintBlue`, `surfaceTintPurple`, `theme.radii["2xl"]`, `theme.shadows.md`.
- **Required states:** Avoid nesting inside another card/panel. Support content with long text and large money values.
- **Pattern notes:** Match the rounded white and tinted card surfaces from both design references.

### `AppButton`

- **File:** `src/components/ui/AppButton.tsx`
- **Purpose:** Stable-height command button for app actions.
- **Variants:** `primary`, `secondary`, `positive`, `danger`, `ghost`.
- **Key style tokens:** `theme.colors.accent`, `accentPressed`, `surfaceMuted`, `positive`, `negative`, `textInverse`, `theme.radii.full`, `theme.spacing`.
- **Required states:** Pressed and disabled visual states; minimum 44px hit target.
- **Accessibility notes:** Button label must clearly describe the action.

### `IconButton`

- **File:** `src/components/ui/IconButton.tsx`
- **Purpose:** Accessible icon-only button using `expo-symbols`.
- **Variants:** `tone` supports primary, accent, and muted.
- **Key style tokens:** `theme.colors.surface`, `border`, `textPrimary`, `accent`, `textMuted`, `theme.radii.full`.
- **Required states:** Requires `label` for accessibility; pressed visual state; fixed 44x44 target.
- **Pattern notes:** Use for back, search, filter, close, more, edit, and share actions.

### `TextField`

- **File:** `src/components/ui/TextField.tsx`
- **Purpose:** General labeled text input with active, help, and error states.
- **Key style tokens:** `theme.colors.surface`, `border`, `accent`, `negative`, `textPrimary`, `theme.radii.md`.
- **Required states:** Focus ring; error text; disabled state when applicable.
- **Pattern notes:** Use for non-auth forms. Auth screens should prefer `AuthField`.

### `AuthVisual`

- **File:** `src/components/auth/AuthVisual.tsx`
- **Purpose:** Reusable finance-themed illustration panel for auth and onboarding screens.
- **Variants:** Default tall welcome illustration panel; `compact` low-height wallet summary strip for form-heavy screens.
- **Key style tokens:** `theme.colors.accent`, `accentPressed`, `surface`, `surfaceTintBlue`, `surfaceTintPurple`, `positive`, `warning`, `theme.radii`, `theme.shadows.md`.
- **Required states:** Decorative and non-blocking; surrounding screen copy owns accessible explanation.
- **Pattern notes:** Based on `context/designs/Auth Flow.png`. Keep visual rhythm without hardcoding inaccessible or unreadable text into the illustration.

### `AuthField`

- **File:** `src/components/auth/AuthField.tsx`
- **Purpose:** Icon-led rounded input field for auth screens.
- **Variants:** `isPassword` adds a trailing show/hide password control.
- **Key style tokens:** `theme.colors.surface`, `borderStrong`, `accent`, `negative`, `textPrimary`, `textSecondary`, `theme.radii.lg`, `theme.spacing[3]`, `theme.spacing[5]`.
- **Required states:** Focus border, error border, optional error text, minimum 64px field height, password visibility toggle.
- **Accessibility notes:** Must expose labels and error text despite placeholder-led visual style.
- **Pattern notes:** Matches the auth mockup. Future auth-only fields should use this style instead of the general `TextField`.

### `AuthSocialButton`

- **File:** `src/components/auth/AuthSocialButton.tsx`
- **Purpose:** Square social sign-in button for auth screens.
- **Variants:** `provider` supports `google`, `apple`, and `facebook`.
- **Key style tokens:** `theme.colors.surface`, `border`, `textPrimary`, `info`, `theme.radii.lg`.
- **Required states:** Accessible provider label, pressed opacity state, stable 84px by 104px button size.
- **Pattern notes:** UI placeholder until OAuth is configured. Do not imply backend support before `expo-auth-session` or Supabase OAuth wiring is added.

### `AuthTopBar`

- **File:** `src/components/auth/AuthTopBar.tsx`
- **Purpose:** Auth screen top row with back affordance and small decorative profile avatar.
- **Variants:** None.
- **Key style tokens:** `theme.colors.surface`, `accentSoft`, `accentPressed`, `warningSoft`, `theme.radii.full`, `theme.radii.lg`.
- **Required states:** Back button must expose an accessibility label and keep a 44px hit target.
- **Pattern notes:** Use on compact auth forms under a hidden native header. The avatar is decorative until the user is authenticated.

## Planned Component Specifications

### `AmountInput`

- **Purpose:** Money input with currency selector, parsing, formatting, and validation.
- **Variants:** Default, compact, read-only.
- **Required states:** Focused, invalid, disabled, parsing error.
- **Key tokens:** `surface`, `borderStrong`, `accent`, `negative`, `theme.radii.lg`.
- **Behavior:** Stores draft as text, exposes parsed minor units only when valid.

### `BalancePill`

- **Purpose:** Compact financial status indicator.
- **Variants:** `positive`, `negative`, `settled`, `pending`, `failed`.
- **Required states:** Long currency values fit without overlap.
- **Accessibility:** Label must include semantic state, not only signed amount.

### `EmptyState`

- **Purpose:** Reusable empty screen or section module.
- **Variants:** friends, groups, expenses, activity, analytics, search, notifications.
- **Required states:** Optional CTA; optional icon/illustration; concise copy.
- **Pattern notes:** Use friendly but practical copy. Do not create marketing-style hero blocks.

### `OfflineBanner`

- **Purpose:** Show offline, stale, queued, syncing, synced, or failed mutation state.
- **Variants:** `offline`, `stale`, `queued`, `syncing`, `synced`, `failed`.
- **Required states:** Retry when available; dismiss only when safe.
- **Pattern notes:** Must never hide data-loss risk.

### `BottomSheet`

- **Purpose:** Focused selector or confirmation container.
- **Variants:** Standard picker, destructive confirmation, money confirmation.
- **Required states:** Drag/close behavior, safe-area bottom padding, keyboard awareness.
- **Pattern notes:** Use for category, split method, filters, payer, participants, currency, payment method.

## Pattern Rules

- Do not add raw design values in screens.
- Do not nest `AppCard` inside `AppCard`.
- Do not create duplicated row components when a registry component can be extended.
- Components that render money need explicit currency.
- Components that render people need fallback initials or placeholder avatar.
- Components that trigger mutations need loading and disabled states.
- Components used in network-backed screens need enough API surface to render loading, empty, error, offline, and success states.
