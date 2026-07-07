# UI Registry

Living document. Update this after every reusable component is built. Read this before creating a new component so the app stays visually consistent.

---

## How to Use

Before building any component:

1. Check whether a similar component already exists here.
2. If yes, match its API, tokens, states, and layout behavior.
3. If no, build it from `ui-rules.md` and `ui-tokens.md`, then add it here.

After building a reusable component, record:

- Component name.
- File path.
- Purpose.
- Variants.
- Key style tokens.
- Required states.

---

## Planned Core Components

These are expected primitives for the Split UI. Add exact file paths and implementation notes as they are created.

| Component | Purpose | Status |
| --- | --- | --- |
| `AppScreen` | Safe-area screen wrapper with app background | Built |
| `AppCard` | Tokenized solid card | Built |
| `AppButton` | Primary, secondary, positive, danger, ghost buttons | Built |
| `IconButton` | Accessible icon-only button | Built |
| `TextField` | Labeled input with error/help text | Built |
| `AmountInput` | Currency-aware amount entry | Planned |
| `SegmentedControl` | Period and mode selection | Planned |
| `BalancePill` | Positive/negative/settled balance indicator | Planned |
| `Avatar` | User avatar with fallback initials | Planned |
| `CategoryIcon` | Expense category visual | Planned |
| `EmptyState` | Empty screen or section with CTA | Planned |
| `SkeletonRow` | Loading placeholder for lists | Planned |
| `ErrorState` | Human-readable recoverable errors | Planned |
| `OfflineBanner` | Offline and queued sync state | Planned |
| `BottomSheet` | Picker and confirmation sheet container | Planned |

---

## Built Components

### `AppText`

- **File:** `src/components/ui/AppText.tsx`
- **Purpose:** Tokenized text primitive for Split typography and semantic text colors.
- **Variants:** `role` supports all `theme.typography` roles; `tone` supports primary, secondary, muted, inverse, accent, positive, negative, and warning.
- **Key style tokens:** `theme.typography`, `theme.colors.textPrimary`, `textSecondary`, `textMuted`, `textInverse`, `accent`, `positive`, `negative`, `warning`.
- **Required states:** Text must remain readable on all card surfaces and should not use viewport-scaled font sizes.

### `AppScreen`

- **File:** `src/components/ui/AppScreen.tsx`
- **Purpose:** Safe-area-aware screen wrapper with Split app background and mobile-first padding.
- **Variants:** `scroll` enables scrollable or fixed-height layouts; `contentStyle` allows screen-level layout composition.
- **Key style tokens:** `theme.colors.background`, `theme.spacing[4]`, `theme.spacing[5]`.
- **Required states:** Must respect safe areas and support 320px-wide mobile layouts.

### `AppCard`

- **File:** `src/components/ui/AppCard.tsx`
- **Purpose:** Tokenized solid card for dashboard summaries, sections, and grouped rows.
- **Variants:** `default`, `primary`, `tintBlue`, and `tintPurple` variants.
- **Key style tokens:** `theme.colors.surface`, `surfaceElevated`, `surfaceTintBlue`, `surfaceTintPurple`, `theme.radii["2xl"]`, `theme.shadows.md`.
- **Required states:** Avoid nesting inside another card/panel unless a future component explicitly requires it.

### `AppButton`

- **File:** `src/components/ui/AppButton.tsx`
- **Purpose:** Stable-height command button for primary and secondary app actions.
- **Variants:** `primary`, `secondary`, `positive`, `danger`, `ghost`.
- **Key style tokens:** `theme.colors.accent`, `surfaceMuted`, `positive`, `negative`, `textInverse`, `theme.radii.full`, `theme.spacing`.
- **Required states:** Pressed and disabled visual states; minimum 44px hit target.

### `IconButton`

- **File:** `src/components/ui/IconButton.tsx`
- **Purpose:** Accessible icon-only button using `expo-symbols`.
- **Variants:** `tone` supports primary, accent, and muted.
- **Key style tokens:** `theme.colors.surface`, `border`, `textPrimary`, `accent`, `textMuted`, `theme.radii.full`.
- **Required states:** Requires `label` for accessibility; pressed visual state; fixed 44x44 target.

### `TextField`

- **File:** `src/components/ui/TextField.tsx`
- **Purpose:** Labeled text input with active and error states.
- **Key style tokens:** `theme.colors.surface`, `border`, `accent`, `negative`, `textPrimary`, `theme.radii.md`.
- **Required states:** Active focus ring; error text state.
