import { StyleSheet } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";

export default function GroupsScreen() {
  return (
    <AppScreen contentStyle={styles.container}>
      <AppText role="display">Groups</AppText>
      <AppText tone="secondary">Organize expenses for trips and roommates.</AppText>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
