import { useEffect } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, ActivityIndicator } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Mock delay for splash
    const timer = setTimeout(() => {
      router.replace("/(auth)/sign-in");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AppScreen contentStyle={styles.container}>
      <AppText role="display" style={styles.title}>
        Split
      </AppText>
      <ActivityIndicator color={theme.colors.accent} style={styles.loader} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: theme.colors.accent,
  },
  loader: {
    marginTop: theme.spacing[6],
  },
});
