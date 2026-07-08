import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { IconButton } from "@/components/ui/IconButton";
import { theme } from "@/constants/theme";

type AuthTopBarProps = {
  onBack: () => void;
};

export function AuthTopBar({ onBack }: AuthTopBarProps) {
  return (
    <View style={styles.root}>
      <IconButton name="chevron.left" label="Go back" onPress={onBack} style={styles.backButton} />
      <View style={styles.avatar}>
        <View style={styles.avatarHair} />
        <View style={styles.avatarFace}>
          <AppText role="micro">A</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.lg,
    height: 48,
    justifyContent: "center",
    overflow: "hidden",
    width: 48,
  },
  avatarHair: {
    backgroundColor: theme.colors.accentPressed,
    borderRadius: theme.radii.full,
    height: 24,
    position: "absolute",
    top: 6,
    width: 24,
  },
  avatarFace: {
    alignItems: "center",
    backgroundColor: theme.colors.warningSoft,
    borderRadius: theme.radii.full,
    height: 26,
    justifyContent: "center",
    marginTop: theme.spacing[3],
    width: 26,
  },
});
