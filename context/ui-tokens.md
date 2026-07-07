# UI Tokens

Design tokens for Split. Use these values through `src/constants/theme.ts` and shared UI primitives. Do not hardcode colors, radii, shadows, or spacing inside screens.

The design direction is modern glassmorphism: translucent panels, soft blur, crisp borders, gentle depth, and clear financial color semantics.

---

## How to Use

```tsx
import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

const styles = StyleSheet.create({
  panel: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.radii.lg,
    padding: theme.spacing[4],
  },
});
```

Rules:

- Use `theme` tokens in React Native styles.
- Use semantic tokens like `positive`, `negative`, `warning`, and `accent`.
- Use `expo-glass-effect` for native glass surfaces where supported.
- Provide a tokenized translucent fallback for platforms where native glass is unavailable.
- Never use raw hex values directly in components.

---

## `src/constants/theme.ts`

```ts
export const theme = {
  colors: {
    background: "#F5F7FA",
    backgroundAlt: "#EEF3F8",
    surface: "#FFFFFF",
    surfaceMuted: "#F8FAFC",
    surfaceElevated: "#FFFFFF",

    glass: "rgba(255, 255, 255, 0.68)",
    glassStrong: "rgba(255, 255, 255, 0.82)",
    glassDark: "rgba(15, 23, 42, 0.58)",
    glassBorder: "rgba(255, 255, 255, 0.72)",
    glassStroke: "rgba(15, 23, 42, 0.08)",

    textPrimary: "#101828",
    textSecondary: "#475467",
    textMuted: "#98A2B3",
    textInverse: "#FFFFFF",

    accent: "#2563EB",
    accentPressed: "#1D4ED8",
    accentSoft: "#DBEAFE",
    accentGlass: "rgba(37, 99, 235, 0.14)",

    positive: "#059669",
    positiveSoft: "#D1FAE5",
    positiveGlass: "rgba(5, 150, 105, 0.14)",

    negative: "#DC2626",
    negativeSoft: "#FEE2E2",
    negativeGlass: "rgba(220, 38, 38, 0.12)",

    warning: "#F59E0B",
    warningSoft: "#FEF3C7",
    warningGlass: "rgba(245, 158, 11, 0.14)",

    info: "#0891B2",
    infoSoft: "#CFFAFE",

    border: "#E4E7EC",
    borderStrong: "#D0D5DD",
    overlay: "rgba(15, 23, 42, 0.42)",
    scrim: "rgba(15, 23, 42, 0.16)",
  },

  gradients: {
    appBackground: ["#F5F7FA", "#EAF6F2", "#EEF3FF"],
    heroBalance: ["#2563EB", "#059669"],
    warning: ["#F59E0B", "#EF4444"],
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
      shadowColor: "#101828",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    md: {
      shadowColor: "#101828",
      shadowOpacity: 0.1,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 5,
    },
    glass: {
      shadowColor: "#101828",
      shadowOpacity: 0.12,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 6,
    },
  },
} as const;
```

---

## Color Usage

| Use | Token |
| --- | --- |
| App background | `background`, `backgroundAlt`, `gradients.appBackground` |
| Main glass panels | `glass`, `glassBorder`, `glassStroke` |
| High emphasis surface | `glassStrong`, `surfaceElevated` |
| Primary text | `textPrimary` |
| Secondary text | `textSecondary` |
| Placeholder or metadata | `textMuted` |
| Primary action | `accent` |
| Owed to user / positive balance | `positive` |
| User owes / negative balance | `negative` |
| Pending, warning, sync conflict | `warning` |
| Informational states | `info` |

---

## Typography Usage

| Element | Token |
| --- | --- |
| Balance hero amount | `display` |
| Screen title | `title1` |
| Section title | `title3` |
| Body text | `bodyRegular` |
| Row title | `body` |
| Form label | `callout` |
| Metadata | `caption` |
| Badge text | `micro` |

Use Inter through `expo-font`. Do not scale font size with viewport width.

---

## Spacing

| Token | Value | Usage |
| --- | --- | --- |
| `spacing[1]` | 4 | Tight icon/text gap |
| `spacing[2]` | 8 | Chips, small row gaps |
| `spacing[3]` | 12 | Form field internal gaps |
| `spacing[4]` | 16 | Default screen and card padding |
| `spacing[5]` | 20 | Section gaps |
| `spacing[6]` | 24 | Major screen blocks |
| `spacing[8]` | 32 | Hero and modal spacing |

---

## Component Tokens

### Glass Panel

```ts
{
  backgroundColor: theme.colors.glass,
  borderColor: theme.colors.glassBorder,
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: theme.radii.lg,
  padding: theme.spacing[4],
  ...theme.shadows.glass,
}
```

### Button

| Variant | Background | Text | Border |
| --- | --- | --- | --- |
| Primary | `accent` | `textInverse` | none |
| Secondary | `glassStrong` | `textPrimary` | `glassStroke` |
| Positive | `positive` | `textInverse` | none |
| Danger | `negative` | `textInverse` | none |
| Ghost | transparent | `textPrimary` | none |

### Balance Indicators

| State | Token |
| --- | --- |
| You are owed | `positive`, `positiveSoft`, `positiveGlass` |
| You owe | `negative`, `negativeSoft`, `negativeGlass` |
| Settled | `textMuted`, `surfaceMuted` |
| Pending payment | `warning`, `warningSoft` |

### Inputs

```ts
{
  backgroundColor: theme.colors.glassStrong,
  borderColor: theme.colors.glassStroke,
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: theme.radii.md,
  minHeight: 48,
  paddingHorizontal: theme.spacing[4],
}
```
