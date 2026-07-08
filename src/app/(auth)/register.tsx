import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SymbolView } from "expo-symbols";
import { useRouter } from "expo-router";

import { AuthField } from "@/components/auth/AuthField";
import { AuthFormScaffold } from "@/components/auth/AuthFormScaffold";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { theme } from "@/constants/theme";
import { registerWithEmail } from "@/services/auth";

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (): Promise<void> => {
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    if (!hasAcceptedTerms) {
      setError("Accept the terms to create your account.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerWithEmail(email, password);

      if (result.needsVerification) {
        router.push({ pathname: "/(auth)/verify", params: { email: email.trim(), fullName: fullName.trim(), phone } });
      } else {
        router.replace({ pathname: "/(auth)/profile-setup", params: { fullName: fullName.trim(), phone } });
      }
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to create your account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormScaffold
      title="Create account"
      subtitle="Register to start splitting group expenses clearly."
      footerPrompt="Already have an account?"
      footerActionLabel="Login"
      onFooterAction={() => router.push(routes.auth.signIn)}
    >
      <View style={styles.form}>
        <AuthField
          icon="person"
          label="Full name"
          placeholder="Full name"
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
          error={error && !fullName.trim() ? "Enter your full name." : undefined}
        />
        <AuthField
          icon="envelope"
          label="Email address"
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={error && !email.trim() ? "Enter your email address." : undefined}
        />
        <AuthField
          icon="phone"
          label="Phone number"
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <AuthField
          icon="lock"
          label="Password"
          placeholder="Password"
          isPassword
          value={password}
          onChangeText={setPassword}
          error={error && password.length > 0 && password.length < 8 ? "Use at least 8 characters." : undefined}
        />
        <AuthField
          icon="lock"
          label="Confirm password"
          placeholder="Confirm password"
          isPassword
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={error && password !== confirmPassword ? "Passwords do not match." : undefined}
        />

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: hasAcceptedTerms }}
          onPress={() => setHasAcceptedTerms((current) => !current)}
          style={styles.termsRow}
        >
          <View style={[styles.checkbox, hasAcceptedTerms && styles.checkboxChecked]}>
            {hasAcceptedTerms ? (
              <SymbolView name="checkmark" size={14} tintColor={theme.colors.textInverse} />
            ) : null}
          </View>
          <AppText role="callout" tone="secondary" style={styles.termsText}>
            I agree to the <AppText role="callout" tone="accent">Terms of Service</AppText> and{" "}
            <AppText role="callout" tone="accent">Privacy Policy</AppText>
          </AppText>
        </Pressable>

        {error ? (
          <AppText role="caption" tone="negative" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppButton
          label={isLoading ? "Registering..." : "Register"}
          onPress={handleRegister}
          disabled={isLoading}
          style={styles.primaryButton}
        />
      </View>
    </AuthFormScaffold>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: theme.spacing[3],
  },
  termsRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: theme.spacing[3],
    paddingTop: theme.spacing[1],
  },
  checkbox: {
    alignItems: "center",
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radii.full,
    borderWidth: StyleSheet.hairlineWidth,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  termsText: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
  },
  primaryButton: {
    marginTop: theme.spacing[5],
    minHeight: 66,
  },
});
