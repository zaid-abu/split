import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { theme } from "@/constants/theme";

export default function PermissionsScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Route to tabs
      router.replace("/(tabs)/home" as any);
    }, 1000);
  };

  return (
    <AppScreen contentStyle={styles.container}>
      <View style={styles.header}>
        <AppText role="title1">Stay in the loop</AppText>
        <AppText tone="secondary">Enable notifications so you never miss a split or payment request.</AppText>
      </View>

      <AppCard style={styles.form}>
        <AppButton label="Enable Notifications" onPress={handleContinue} disabled={isLoading} />
        <AppButton label="Not Now" variant="ghost" onPress={handleContinue} disabled={isLoading} />
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
});
