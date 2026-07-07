import { StyleSheet, Text, type TextProps } from "react-native";

import { theme, type TextTone, type TypographyRole } from "@/constants/theme";

interface AppTextProps extends Omit<TextProps, "role"> {
  role?: TypographyRole;
  tone?: TextTone;
}

const toneColor: Record<TextTone, string> = {
  primary: theme.colors.textPrimary,
  secondary: theme.colors.textSecondary,
  muted: theme.colors.textMuted,
  inverse: theme.colors.textInverse,
  accent: theme.colors.accent,
  positive: theme.colors.positive,
  negative: theme.colors.negative,
  warning: theme.colors.warning,
};

export function AppText({
  role = "bodyRegular",
  tone = "primary",
  style,
  ...props
}: AppTextProps) {
  return <Text style={[styles.base, theme.typography[role], { color: toneColor[tone] }, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
});
