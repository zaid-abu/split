import { StyleSheet } from "react-native";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";

export default function FriendsScreen() {
  return (
    <AppScreen contentStyle={styles.container}>
      <AppText role="display">Friends</AppText>
      <AppText tone="secondary">Add friends to easily split expenses.</AppText>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
