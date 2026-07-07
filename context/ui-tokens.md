# UI Tokens

Design tokens for Split. Use these values through `src/constants/theme.ts` and shared UI primitives. Do not hardcode colors, radii, shadows, or spacing inside screens.

The design direction is a vibrant flat UI: solid surface cards, crisp borders, gentle depth via drop shadows, and clear financial color semantics.

---

## How to Use

```tsx
import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii["2xl"],
    padding: theme.spacing[4],
    ...theme.shadows.md,
  },
});
```

Rules:

- Use `theme` tokens in React Native styles.
- Use semantic tokens like `positive`, `negative`, `warning`, and `accent`.
- Never use raw hex values directly in components.
- Do not use translucency or blur.

---

## `src/constants/theme.ts`

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

---

## Color Usage

| Use | Token |
| --- | --- |
| App background | `background` |
| Main cards | `surface`, `surfaceElevated` |
| Tinted cards | `surfaceTintBlue`, `surfaceTintPurple` |
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

### App Card

```ts
{
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radii["2xl"],
  padding: theme.spacing[4],
  ...theme.shadows.md,
}
```

### Button

| Variant | Background | Text | Border |
| --- | --- | --- | --- |
| Primary | `accent` | `textInverse` | none |
| Secondary | `surfaceMuted` | `textPrimary` | none |
| Positive | `positive` | `textInverse` | none |
| Danger | `negative` | `textInverse` | none |
| Ghost | transparent | `textPrimary` | none |

### Balance Indicators

| State | Token |
| --- | --- |
| You are owed | `positive`, `positiveSoft` |
| You owe | `negative`, `negativeSoft` |
| Settled | `textMuted`, `surfaceMuted` |
| Pending payment | `warning`, `warningSoft` |

### Inputs

```ts
{
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: theme.radii.md,
  minHeight: 48,
  paddingHorizontal: theme.spacing[4],
}
```
