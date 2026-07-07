import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

import { theme } from "@/constants/theme";

interface IconButtonProps extends PressableProps {
  name: SymbolViewProps["name"];
  label: string;
  tone?: "primary" | "accent" | "muted";
}

const toneColor = {
  primary: theme.colors.textPrimary,
  accent: theme.colors.accent,
  muted: theme.colors.textMuted,
} as const;

export function IconButton({ name, label, tone = "primary", style, ...props }: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={theme.spacing[2]}
      style={(state) => [
        styles.root,
        state.pressed && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      <SymbolView name={name} size={20} tintColor={toneColor[tone]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.full,
    borderWidth: StyleSheet.hairlineWidth,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  pressed: {
    opacity: 0.76,
  },
});
