import { Pressable, StyleSheet, View, type PressableProps } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "positive" | "danger" | "ghost";

interface AppButtonProps extends PressableProps {
  label: string;
  variant?: ButtonVariant;
}

export function AppButton({ label, variant = "primary", disabled, style, ...props }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.root,
        styles[variant],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        typeof style === "function" ? style({ pressed }) : style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        <AppText
          role="callout"
          tone={variant === "secondary" || variant === "ghost" ? "primary" : "inverse"}
          style={styles.label}
        >
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    borderRadius: theme.radii.full,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: theme.spacing[5],
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing[2],
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  secondary: {
    backgroundColor: theme.colors.glassStrong,
    borderColor: theme.colors.glassStroke,
    borderWidth: StyleSheet.hairlineWidth,
  },
  positive: {
    backgroundColor: theme.colors.positive,
  },
  danger: {
    backgroundColor: theme.colors.negative,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.48,
  },
});
