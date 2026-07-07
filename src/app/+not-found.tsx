import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlassScreen } from "@/components/ui/GlassScreen";
import { theme } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <GlassScreen scroll={false} contentStyle={styles.content}>
      <GlassPanel style={styles.panel}>
        <View style={styles.copy}>
          <AppText role="title2">This screen is not available</AppText>
          <AppText tone="secondary">
            The link may be expired, deleted, or not part of the current app shell yet.
          </AppText>
        </View>
        <Link href="/" asChild>
          <AppButton label="Back to Split" />
        </Link>
      </GlassPanel>
    </GlassScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
  },
  panel: {
    gap: theme.spacing[5],
  },
  copy: {
    gap: theme.spacing[2],
  },
});
