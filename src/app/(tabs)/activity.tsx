import { StyleSheet } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";

export default function ActivityScreen() {
  return (
    <AppScreen contentStyle={styles.container}>
      <AppText role="display">Activity</AppText>
      <AppText tone="secondary">See recent expenses and payments.</AppText>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
