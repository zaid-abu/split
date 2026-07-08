import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { TextField } from "@/components/ui/TextField";
import { theme } from "@/constants/theme";
import { upsertProfile } from "@/services/profiles";
import { useAuth } from "@/lib/auth";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { fullName: fullNameParam, phone: phoneParam } = useLocalSearchParams<{
    fullName?: string;
    phone?: string;
  }>();
  const { user, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(typeof fullNameParam === "string" ? fullNameParam : "");
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (): Promise<void> => {
    setError("");

    if (!user) {
      setError("Please sign in again to finish your profile.");
      return;
    }

    if (!fullName.trim()) {
      setError("Enter your name so friends know who they are splitting with.");
      return;
    }

    const normalizedCurrency = currency.trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(normalizedCurrency)) {
      setError("Use a 3-letter currency code, like USD or INR.");
      return;
    }

    setIsLoading(true);

    try {
      await upsertProfile(user.id, {
        email: user.email ?? null,
        full_name: fullName,
        phone: typeof phoneParam === "string" && phoneParam.trim() ? phoneParam.trim() : null,
        default_currency: normalizedCurrency,
        onboarding_completed: false,
      });
      await refreshProfile();
      router.replace("/(auth)/permissions");
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppScreen scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepBadge}>
          <AppText role="micro" tone="accent">
            step 1 of 2
          </AppText>
        </View>
        <AppText role="title1">Complete your profile</AppText>
        <AppText tone="secondary">
          Set the basics before you invite friends or add your first split.
        </AppText>
      </View>

      <AppCard style={styles.form}>
        <TextField
          label="Full Name"
          placeholder="Jane Doe"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextField
          label="Default Currency"
          placeholder="USD"
          value={currency}
          onChangeText={(value) => setCurrency(value.toUpperCase())}
          autoCapitalize="characters"
          maxLength={3}
        />
        {error ? (
          <AppText role="caption" tone="negative" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}
        <AppButton
          label={isLoading ? "Saving..." : "Continue"}
          onPress={handleSave}
          disabled={isLoading}
          style={styles.submitBtn}
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
    alignItems: "flex-start",
    gap: theme.spacing[2],
    marginBottom: theme.spacing[8],
  },
  stepBadge: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.full,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
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
