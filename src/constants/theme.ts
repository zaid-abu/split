import "@/global.css";

import { Platform } from "react-native";

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
    backgroundElement: theme.colors.glassStrong,
    backgroundSelected: theme.colors.accentSoft,
    textSecondary: theme.colors.textSecondary,
  },
  dark: {
    text: theme.colors.textInverse,
    background: "#0F172A",
    backgroundElement: theme.colors.glassDark,
    backgroundSelected: "rgba(255, 255, 255, 0.12)",
    textSecondary: "#CBD5E1",
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
