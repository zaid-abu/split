import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { theme } from "@/constants/theme";
import { routes } from "@/constants/routes";
import { useAuth } from "@/lib/auth";
import { updateProfile } from "@/services/profiles";

export default function PermissionsScreen() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const completeOnboarding = async (): Promise<void> => {
    setError("");

    if (!user) {
      setError("Please sign in again to finish onboarding.");
      return;
    }

    setIsLoading(true);

    try {
      await updateProfile(user.id, { onboarding_completed: true });
      await refreshProfile();
      router.replace(routes.tabs.home);
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to finish onboarding.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppScreen contentStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.stepBadge}>
          <AppText role="micro" tone="accent">
            step 2 of 2
          </AppText>
        </View>
        <AppText role="title1">Stay in the loop</AppText>
        <AppText tone="secondary">
          Split can remind you about new expenses, payment requests, and group updates.
        </AppText>
      </View>

      <AppCard style={styles.form}>
        <View style={styles.permissionRow}>
          <View style={styles.permissionIcon}>
            <SymbolView name="bell.badge.fill" size={24} tintColor={theme.colors.accent} />
          </View>
          <View style={styles.permissionCopy}>
            <AppText role="body">Notifications</AppText>
            <AppText role="caption" tone="secondary">
              Get payment reminders and important group activity.
            </AppText>
          </View>
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionIcon}>
            <SymbolView name="person.2.fill" size={24} tintColor={theme.colors.info} />
          </View>
          <View style={styles.permissionCopy}>
            <AppText role="body">Contacts later</AppText>
            <AppText role="caption" tone="secondary">
              Import friends only when you choose to from the Friends tab.
            </AppText>
          </View>
        </View>

        {error ? (
          <AppText role="caption" tone="negative" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppButton
          label={isLoading ? "Finishing..." : "Enable Later"}
          onPress={completeOnboarding}
          disabled={isLoading}
        />
        <AppButton
          label="Not Now"
          variant="ghost"
          onPress={completeOnboarding}
          disabled={isLoading}
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
  permissionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing[3],
  },
  permissionIcon: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radii.lg,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  permissionCopy: {
    flex: 1,
    gap: theme.spacing[1],
  },
  errorText: {
    textAlign: "center",
  },
});
