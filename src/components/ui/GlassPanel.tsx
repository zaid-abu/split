import { StyleSheet, View, type ViewProps } from "react-native";

import { theme } from "@/constants/theme";

interface GlassPanelProps extends ViewProps {
  strength?: "default" | "strong" | "dark";
}

export function GlassPanel({ strength = "default", style, ...props }: GlassPanelProps) {
  return (
    <View
      style={[
        styles.root,
        strength === "default" && styles.default,
        strength === "strong" && styles.strong,
        strength === "dark" && styles.dark,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: theme.spacing[4],
    ...theme.shadows.glass,
  },
  default: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
  },
  strong: {
    backgroundColor: theme.colors.glassStrong,
    borderColor: theme.colors.glassStroke,
  },
  dark: {
    backgroundColor: theme.colors.glassDark,
    borderColor: theme.colors.glassStroke,
  },
});
