import "@/global.css";

import { Platform } from "react-native";

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

export type AppTheme = typeof theme;
export type TextTone =
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "accent"
  | "positive"
  | "negative"
  | "warning";
export type TypographyRole = Exclude<keyof AppTheme["typography"], "family">;

export const Colors = {
  light: {
    text: theme.colors.textPrimary,
    background: theme.colors.background,
    backgroundElement: theme.colors.surface,
    backgroundSelected: theme.colors.surfaceTintBlue,
    textSecondary: theme.colors.textSecondary,
  },
  dark: {
    text: theme.colors.textPrimary, // Fallback since flat design relies heavily on light UI for now
    background: theme.colors.background,
    backgroundElement: theme.colors.surface,
    backgroundSelected: theme.colors.surfaceTintBlue,
    textSecondary: theme.colors.textSecondary,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});

export const Spacing = {
  half: 2,
  one: theme.spacing[1],
  two: theme.spacing[2],
  three: theme.spacing[4],
  four: theme.spacing[6],
  five: theme.spacing[8],
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
