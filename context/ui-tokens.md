# UI Tokens

Split uses a tokenized React Native design system. All screen and component styles must use `src/constants/theme.ts` values for colors, spacing, radii, typography, and shadows. Do not hardcode raw hex values, spacing numbers, radii, or shadow definitions inside screen components.

The visual target comes from:

- `context/designs/Auth Flow.png`
- `context/designs/image.png`

The design language is friendly, rounded, high-contrast, and finance-focused: white surfaces, deep indigo primary actions, soft lavender and sky panels, compact icons, avatar-led social rows, and subtle depth.

## Canonical Theme

`src/constants/theme.ts` should remain the implementation authority. The following shape is the expected baseline:

```ts
export const theme = {
  colors: {
    background: "#F8F9FA",
    backgroundAlt: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    surfaceElevated: "#FFFFFF",
    surfaceTintBlue: "#DDF0FF",
    surfaceTintPurple: "#EFE9FF",

    textPrimary: "#1C1C1E",
    textSecondary: "#8E8E93",
    textMuted: "#98A2B3",
    textInverse: "#FFFFFF",

    accent: "#281B5A",
    accentPressed: "#1C1242",
    accentSoft: "#EFE9FF",

    positive: "#34C759",
    positiveSoft: "#E8F8EA",

    negative: "#FF3B30",
    negativeSoft: "#FFEBEA",

    warning: "#FFCC00",
    warningSoft: "#FFF9E5",

    info: "#0A84FF",
    infoSoft: "#E6F2FF",

    border: "#E5E5EA",
    borderStrong: "#C7C7CC",
    overlay: "rgba(0, 0, 0, 0.4)",
    scrim: "rgba(0, 0, 0, 0.1)",
  },

  gradients: {
    appBackground: ["#F8F9FA", "#F8F9FA"],
    heroBalance: ["#281B5A", "#4A3399"],
    warning: ["#FFCC00", "#FF9500"],
  },

  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },

  radii: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    full: 999,
  },

  typography: {
    family: "Inter",
    display: { fontSize: 34, lineHeight: 40, fontWeight: "700" },
    title1: { fontSize: 28, lineHeight: 34, fontWeight: "700" },
    title2: { fontSize: 22, lineHeight: 28, fontWeight: "700" },
    title3: { fontSize: 18, lineHeight: 24, fontWeight: "600" },
    body: { fontSize: 16, lineHeight: 24, fontWeight: "500" },
    bodyRegular: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
    callout: { fontSize: 14, lineHeight: 20, fontWeight: "500" },
    caption: { fontSize: 12, lineHeight: 16, fontWeight: "500" },
    micro: { fontSize: 11, lineHeight: 14, fontWeight: "600" },
  },

  shadows: {
    sm: {
      shadowColor: "#281B5A",
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    md: {
      shadowColor: "#281B5A",
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    lg: {
      shadowColor: "#281B5A",
      shadowOpacity: 0.12,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
  },
} as const;
```

## Color Semantics

| Use | Token | Notes |
| --- | --- | --- |
| App background | `background` | Pale neutral gray from the design references |
| Primary surfaces | `surface`, `surfaceElevated` | Cards, sheets, list sections |
| Muted surfaces | `surfaceMuted` | Secondary buttons, skeletons, neutral states |
| Blue tint | `surfaceTintBlue` | Bill cards, informational modules |
| Purple tint | `surfaceTintPurple`, `accentSoft` | Selection backgrounds, avatar shells, onboarding accents |
| Primary text | `textPrimary` | Main labels and amounts |
| Secondary text | `textSecondary` | Subtitles, form placeholders |
| Muted text | `textMuted` | Metadata, inactive nav, disabled copy |
| Primary action | `accent` | Buttons, active tabs, central action |
| Pressed primary | `accentPressed` | Pressed button state, strongest indigo |
| Positive money | `positive` | Owed to user, received, settled success |
| Negative money | `negative` | User owes, destructive actions |
| Warning | `warning` | Pending, conflicts, queued sync |
| Info | `info` | Permission education and neutral notices |
| Border | `border`, `borderStrong` | Input and card separators |
| Overlay | `overlay`, `scrim` | Modals and bottom sheets |

Use red only for destructive actions or money the user owes. Use green only for positive balances, money owed to the user, or successful settlement states.

## Typography

| Element | Token | Usage |
| --- | --- | --- |
| Dashboard net balance | `display` | Only for major balance heroes |
| Screen title | `title1` | Top-level screen heading |
| Secondary screen title | `title2` | Detail headers and large section titles |
| Section title | `title3` | Cards, list groups, form sections |
| Row title | `body` | Friend, group, expense, activity rows |
| Body text | `bodyRegular` | Explanatory and paragraph text |
| Field label | `callout` | Form labels and button-adjacent metadata |
| Metadata | `caption` | Dates, currencies, statuses |
| Badge | `micro` | Pills, counters, compact state labels |

Rules:

- Use Inter through `expo-font`.
- Do not use negative letter spacing.
- Do not scale font size based on viewport width.
- Text must fit at 320px width without overlapping adjacent controls.
- Large display type belongs only in balance heroes or major onboarding moments.

## Spacing

| Token | Value | Usage |
| --- | --- | --- |
| `spacing[1]` | 4 | Tight icon/text gaps |
| `spacing[2]` | 8 | Chips, compact row gaps |
| `spacing[3]` | 12 | Input internals, row spacing |
| `spacing[4]` | 16 | Default screen padding and card padding |
| `spacing[5]` | 20 | Section gaps |
| `spacing[6]` | 24 | Major screen blocks |
| `spacing[8]` | 32 | Hero spacing, modal rhythm |
| `spacing[10]` | 40 | Large vertical separation |
| `spacing[12]` | 48 | First-screen hero spacing |

Mobile layout rules:

- Default horizontal screen padding is `spacing[4]`.
- Use `spacing[5]` between major sections.
- Keep bottom actions reachable and safe-area aware.
- Fixed controls such as icon buttons and tab items need stable dimensions.

## Radii

| Token | Usage |
| --- | --- |
| `xs` | Tiny badges or internal image corners |
| `sm` | Compact chips |
| `md` | Form fields |
| `lg` | Auth fields and small cards |
| `xl` | Cards and bottom sheets |
| `2xl` | Primary app cards and dashboard modules |
| `3xl` | Large onboarding panels |
| `full` | Pills, avatars, circular icon buttons |

The references use strong rounding. Keep app cards rounded, but do not nest rounded cards inside rounded cards.

## Shadows and Depth

Use shadows sparingly:

- `sm`: rows, small floating controls, subtle buttons.
- `md`: standard cards and auth visual panels.
- `lg`: major hero cards, bottom sheets, floating central action.

Do not use blur, translucent glass, decorative orbs, or busy dark overlays. Depth should come from solid surfaces, shadows, spacing, and clear hierarchy.

## Component Recipes

### App Card

```ts
{
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radii["2xl"],
  padding: theme.spacing[4],
  ...theme.shadows.md,
}
```

### Primary Button

```ts
{
  minHeight: 56,
  borderRadius: theme.radii.lg,
  backgroundColor: theme.colors.accent,
  paddingHorizontal: theme.spacing[5],
}
```

### Secondary Button

```ts
{
  minHeight: 48,
  borderRadius: theme.radii.lg,
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  borderWidth: StyleSheet.hairlineWidth,
}
```

### Input

```ts
{
  minHeight: 56,
  borderRadius: theme.radii.lg,
  borderColor: theme.colors.borderStrong,
  borderWidth: StyleSheet.hairlineWidth,
  backgroundColor: theme.colors.surface,
  paddingHorizontal: theme.spacing[4],
}
```

### Balance Pill

Use:

- Positive: `positive` foreground with `positiveSoft` background.
- Negative: `negative` foreground with `negativeSoft` background.
- Settled: `textMuted` foreground with `surfaceMuted` background.
- Pending: `warning` foreground with `warningSoft` background.

## Design Asset Usage

Use `context/designs/Auth Flow.png` for:

- Welcome, sign-in, register, verification, profile setup, and permissions visual rhythm.
- Auth top bars with a back affordance and small avatar decoration.
- Icon-led fields with generous height and rounded borders.
- Deep indigo full-width CTA buttons.
- Social sign-in placeholders only when backend support is not wired.

Use `context/designs/image.png` for:

- Dashboard card density and hierarchy.
- Friend avatars and sharing sections.
- Balance or wallet summary layouts adapted to Split balances.
- Chart and transaction preview structure for analytics.
- Bottom tab icon style and central action emphasis.

Do not copy wallet-specific product semantics blindly. Replace top-up, exchange, and withdraw behaviors with Split actions such as add expense, settle up, create group, add friend, and export.
