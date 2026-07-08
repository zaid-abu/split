import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { AppScreen } from "@/components/ui/AppScreen";
import { theme } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <AppScreen contentStyle={styles.container}>
      <View style={styles.copy}>
        <AppText role="display">Home</AppText>
        <AppText tone="secondary">Your dashboard will appear here.</AppText>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    alignItems: "center",
    gap: theme.spacing[2],
  },
});
