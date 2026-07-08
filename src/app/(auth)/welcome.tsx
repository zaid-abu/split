import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AuthVisual } from "@/components/auth/AuthVisual";
import { AppButton } from "@/components/ui/AppButton";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { theme } from "@/constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <AppScreen scroll contentStyle={styles.container}>
      <AuthVisual />

      <View style={styles.body}>
        <View style={styles.copy}>
          <AppText role="display" style={styles.title}>
            Welcome to your <AppText role="display" tone="accent">wallet</AppText>
          </AppText>
          <AppText tone="secondary" style={styles.subtitle}>
            Manage shared money, add expenses, and track what everyone owes in one place.
          </AppText>
        </View>

        <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.actions}>
          <AppButton
            label="Get Started"
            onPress={() => router.push(routes.auth.register)}
            style={styles.primaryButton}
          />
          <View style={styles.inlinePrompt}>
            <AppText role="callout" tone="secondary">
              Already have an account?
            </AppText>
            <Pressable onPress={() => router.push(routes.auth.signIn)} hitSlop={theme.spacing[2]}>
              <AppText role="callout" tone="accent">
                Login
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[0],
    paddingHorizontal: theme.spacing[0],
    paddingTop: theme.spacing[0],
  },
  body: {
    flex: 1,
    gap: theme.spacing[6],
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing[8],
    paddingTop: theme.spacing[8],
  },
  copy: {
    alignItems: "center",
    gap: theme.spacing[4],
  },
  title: {
    maxWidth: 300,
    textAlign: "center",
  },
  subtitle: {
    maxWidth: 300,
    textAlign: "center",
  },
  dots: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing[3],
    justifyContent: "center",
  },
  dot: {
    backgroundColor: theme.colors.borderStrong,
    borderRadius: theme.radii.full,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: theme.colors.accent,
  },
  actions: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[5],
  },
  primaryButton: {
    minHeight: 66,
  },
  inlinePrompt: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing[1],
    justifyContent: "center",
  },
});
