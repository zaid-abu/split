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
| `GlassScreen` | Safe-area screen wrapper with app background | Planned |
| `GlassPanel` | Tokenized translucent panel | Planned |
| `AppButton` | Primary, secondary, positive, danger, ghost buttons | Planned |
| `IconButton` | Accessible icon-only button | Planned |
| `TextField` | Labeled input with error/help text | Planned |
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
- **Required states:** Text must remain readable on glass surfaces and should not use viewport-scaled font sizes.

### `GlassScreen`

- **File:** `src/components/ui/GlassScreen.tsx`
- **Purpose:** Safe-area-aware screen wrapper with Split app background and mobile-first padding.
- **Variants:** `scroll` enables scrollable or fixed-height layouts; `contentStyle` allows screen-level layout composition.
- **Key style tokens:** `theme.colors.background`, `theme.spacing[4]`, `theme.spacing[5]`.
- **Required states:** Must respect safe areas and support 320px-wide mobile layouts.

### `GlassPanel`

- **File:** `src/components/ui/GlassPanel.tsx`
- **Purpose:** Tokenized translucent panel for dashboard summaries, sections, and grouped rows.
- **Variants:** `default`, `strong`, and `dark` strengths.
- **Key style tokens:** `theme.colors.glass`, `glassStrong`, `glassDark`, `glassBorder`, `glassStroke`, `theme.radii.lg`, `theme.shadows.glass`.
- **Required states:** Avoid nesting inside another card/panel unless a future component explicitly requires it.

### `AppButton`

- **File:** `src/components/ui/AppButton.tsx`
- **Purpose:** Stable-height command button for primary and secondary app actions.
- **Variants:** `primary`, `secondary`, `positive`, `danger`, `ghost`.
- **Key style tokens:** `theme.colors.accent`, `glassStrong`, `positive`, `negative`, `textInverse`, `theme.radii.full`, `theme.spacing`.
- **Required states:** Pressed and disabled visual states; minimum 44px hit target.

### `IconButton`

- **File:** `src/components/ui/IconButton.tsx`
- **Purpose:** Accessible icon-only button using `expo-symbols`.
- **Variants:** `tone` supports primary, accent, and muted.
- **Key style tokens:** `theme.colors.glassStrong`, `glassStroke`, `textPrimary`, `accent`, `textMuted`, `theme.radii.full`.
- **Required states:** Requires `label` for accessibility; pressed visual state; fixed 44x44 target.
