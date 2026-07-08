import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AuthField } from "@/components/auth/AuthField";
import { AuthSocialButton } from "@/components/auth/AuthSocialButton";
import { AuthTopBar } from "@/components/auth/AuthTopBar";
import { AppButton } from "@/components/ui/AppButton";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { theme } from "@/constants/theme";
import { signInWithEmail } from "@/services/auth";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (): Promise<void> => {
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnavailableSocial = (): void => {
    setError("Social sign-in is not configured yet. Use email and password for now.");
  };

  return (
    <AppScreen scroll contentStyle={styles.container}>
      <AuthTopBar onBack={() => router.replace(routes.auth.welcome)} />

      <View style={styles.header}>
        <AppText role="title1">Welcome back 👋</AppText>
        <AppText tone="secondary">Login to continue to your account</AppText>
      </View>

      <View style={styles.form}>
        <AuthField
          icon="envelope"
          placeholder="Email or Phone number"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={error && !email.trim() ? "Enter your email address." : undefined}
        />
        <AuthField
          icon="lock"
          placeholder="Password"
          isPassword
          value={password}
          onChangeText={setPassword}
          error={error && !password ? "Enter your password." : undefined}
        />

        <Pressable onPress={() => setError("Password reset is not configured yet.")} style={styles.forgotLink}>
          <AppText role="callout" tone="accent">
            Forgot password?
          </AppText>
        </Pressable>

        {error ? (
          <AppText role="caption" tone="negative" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppButton
          label={isLoading ? "Logging in..." : "Login"}
          onPress={handleSignIn}
          disabled={isLoading}
          style={styles.primaryButton}
        />
      </View>

      <View style={styles.socialBlock}>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <AppText role="callout" tone="secondary">
            or continue with
          </AppText>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <AuthSocialButton provider="google" onPress={handleUnavailableSocial} />
          <AuthSocialButton provider="apple" onPress={handleUnavailableSocial} />
          <AuthSocialButton provider="facebook" onPress={handleUnavailableSocial} />
        </View>
      </View>

      <View style={styles.inlinePrompt}>
        <AppText role="callout" tone="secondary">
          Do not have an account?
        </AppText>
        <Pressable onPress={() => router.push(routes.auth.register)} hitSlop={theme.spacing[2]}>
          <AppText role="callout" tone="accent">
            Register
          </AppText>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[8],
    justifyContent: "flex-start",
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[5],
  },
  header: {
    gap: theme.spacing[3],
    paddingTop: theme.spacing[3],
  },
  form: {
    gap: theme.spacing[4],
  },
  forgotLink: {
    alignSelf: "flex-end",
  },
  errorText: {
    textAlign: "center",
  },
  primaryButton: {
    marginTop: theme.spacing[4],
    minHeight: 66,
  },
  socialBlock: {
    gap: theme.spacing[5],
  },
  dividerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing[4],
  },
  divider: {
    backgroundColor: theme.colors.border,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  socialRow: {
    flexDirection: "row",
    gap: theme.spacing[4],
    justifyContent: "center",
  },
  inlinePrompt: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing[1],
    justifyContent: "center",
    paddingBottom: theme.spacing[6],
  },
});
