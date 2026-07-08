import { StyleSheet, ActivityIndicator } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

export default function SplashScreen() {
  return (
    <AppScreen scroll={false} contentStyle={styles.container}>
      <AppText role="display" style={styles.title}>
        Split
      </AppText>
      <AppText tone="secondary" style={styles.subtitle}>
        Preparing your shared wallet
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
  subtitle: {
    marginTop: theme.spacing[2],
    textAlign: "center",
  },
  loader: {
    marginTop: theme.spacing[6],
  },
});
