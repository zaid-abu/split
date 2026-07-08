import { StyleSheet, View } from "react-native";
import { SymbolView } from "expo-symbols";

import { IconButton } from "@/components/ui/IconButton";
import { theme } from "@/constants/theme";

type AuthTopBarProps = {
  onBack: () => void;
  backLabel?: string;
};

export function AuthTopBar({ onBack, backLabel = "Go back" }: AuthTopBarProps) {
  return (
    <View style={styles.root}>
      <IconButton name="arrow.left" label={backLabel} tone="accent" onPress={onBack} style={styles.backButton} />
      <View style={styles.avatar}>
        <View style={styles.avatarFace} />
        <View style={styles.avatarHair} />
        <View style={styles.avatarShoulders} />
        <SymbolView name="sparkles" size={13} tintColor={theme.colors.textInverse} style={styles.avatarSpark} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 52,
  },
  backButton: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
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
    height: 22,
    position: "absolute",
    top: 7,
    transform: [{ rotate: "12deg" }],
    width: 30,
  },
  avatarFace: {
    backgroundColor: theme.colors.warning,
    borderRadius: theme.radii.full,
    height: 24,
    position: "absolute",
    top: 15,
    width: 24,
    zIndex: 2,
  },
  avatarShoulders: {
    backgroundColor: theme.colors.negativeSoft,
    borderRadius: theme.radii.full,
    bottom: -10,
    height: 30,
    position: "absolute",
    width: 40,
    zIndex: 1,
  },
  avatarSpark: {
    position: "absolute",
    right: 6,
    top: 6,
    zIndex: 3,
  },
});
