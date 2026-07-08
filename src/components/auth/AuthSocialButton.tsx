import { Pressable, StyleSheet, type PressableProps } from "react-native";
import { SymbolView } from "expo-symbols";

import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

type SocialProvider = "google" | "apple" | "facebook";

interface AuthSocialButtonProps extends PressableProps {
  provider: SocialProvider;
}

const providerLabel: Record<SocialProvider, string> = {
  google: "Continue with Google",
  apple: "Continue with Apple",
  facebook: "Continue with Facebook",
};

export function AuthSocialButton({ provider, style, ...props }: AuthSocialButtonProps) {
  return (
    <Pressable
      accessibilityLabel={providerLabel[provider]}
      accessibilityRole="button"
      style={(state) => [
        styles.root,
        state.pressed && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      {provider === "apple" ? (
        <SymbolView name="apple.logo" size={30} tintColor={theme.colors.textPrimary} />
      ) : (
        <AppText role="title2" style={provider === "google" ? styles.googleMark : styles.facebookMark}>
          {provider === "google" ? "G" : "f"}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    height: 84,
    justifyContent: "center",
    width: 104,
  },
  pressed: {
    opacity: 0.76,
  },
  googleMark: {
    color: theme.colors.info,
    fontSize: 30,
    lineHeight: 34,
  },
  facebookMark: {
    color: theme.colors.info,
    fontSize: 34,
    lineHeight: 36,
  },
});
