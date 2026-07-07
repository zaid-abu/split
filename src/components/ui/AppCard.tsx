import { StyleSheet, View, type ViewProps } from "react-native";

import { theme } from "@/constants/theme";

interface AppCardProps extends ViewProps {
  variant?: "default" | "primary" | "tintBlue" | "tintPurple";
}

export function AppCard({ variant = "default", style, ...props }: AppCardProps) {
  return (
    <View
      style={[
        styles.root,
        variant === "default" && styles.default,
        variant === "primary" && styles.primary,
        variant === "tintBlue" && styles.tintBlue,
        variant === "tintPurple" && styles.tintPurple,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: theme.radii["2xl"],
    padding: theme.spacing[4],
    ...theme.shadows.md,
  },
  default: {
    backgroundColor: theme.colors.surface,
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  tintBlue: {
    backgroundColor: theme.colors.surfaceTintBlue,
  },
  tintPurple: {
    backgroundColor: theme.colors.surfaceTintPurple,
  },
});
