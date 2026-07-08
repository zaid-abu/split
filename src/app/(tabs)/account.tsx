import { StyleSheet } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";

export default function AccountScreen() {
  return (
    <AppScreen contentStyle={styles.container}>
      <AppText role="display">Account</AppText>
      <AppText tone="secondary">Manage your profile and settings.</AppText>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
