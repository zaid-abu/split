import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { TextField } from "@/components/ui/TextField";
import { theme } from "@/constants/theme";
import { resendSignupOtp, verifySignupOtp } from "@/services/auth";

export default function VerifyScreen() {
  const router = useRouter();
  const { email, fullName, phone } = useLocalSearchParams<{
    email: string;
    fullName?: string;
    phone?: string;
  }>();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const safeEmail = typeof email === "string" ? email : "";

  const handleVerify = async (): Promise<void> => {
    setError("");
    setStatus("");

    if (!safeEmail) {
      setError("This verification link is missing an email address.");
      return;
    }

    if (!code.trim()) {
      setError("Please enter the verification code.");
      return;
    }

    setIsLoading(true);

    try {
      await verifySignupOtp(safeEmail, code);
      router.replace({
        pathname: "/(auth)/profile-setup",
        params: {
          fullName: typeof fullName === "string" ? fullName : "",
          phone: typeof phone === "string" ? phone : "",
        },
      });
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to verify that code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async (): Promise<void> => {
    setError("");
    setStatus("");

    if (!safeEmail) {
      setError("Enter your email again from the registration screen.");
      return;
    }

    setIsResending(true);

    try {
      await resendSignupOtp(safeEmail);
      setStatus("We sent a new code to your email.");
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to resend the code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AppScreen contentStyle={styles.container}>
      <View style={styles.header}>
        <AppText role="title1">Check your email</AppText>
        <AppText tone="secondary">
          {safeEmail ? `Enter the code we sent to ${safeEmail}.` : "Open registration again to request a new code."}
        </AppText>
      </View>

      <AppCard style={styles.form}>
        <TextField
          label="Verification Code"
          placeholder="000000"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          error={error ? "Check the code and try again." : undefined}
        />

        {error ? (
          <AppText tone="negative" role="caption" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}
        {status ? (
          <AppText tone="positive" role="caption" style={styles.errorText}>
            {status}
          </AppText>
        ) : null}

        <AppButton
          label={isLoading ? "Verifying..." : "Verify"}
          onPress={handleVerify}
          disabled={isLoading || isResending}
          style={styles.submitBtn}
        />
        <AppButton
          label={isResending ? "Sending..." : "Resend Code"}
          variant="ghost"
          onPress={handleResend}
          disabled={isLoading || isResending}
        />
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: theme.spacing[12],
  },
  header: {
    gap: theme.spacing[2],
    marginBottom: theme.spacing[8],
  },
  form: {
    gap: theme.spacing[4],
  },
  errorText: {
    textAlign: "center",
  },
  submitBtn: {
    marginTop: theme.spacing[2],
  },
});
