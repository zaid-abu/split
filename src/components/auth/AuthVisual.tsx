import { StyleSheet, View } from "react-native";
import { SymbolView } from "expo-symbols";

import { AppText } from "@/components/ui/AppText";
import { theme } from "@/constants/theme";

type AuthVisualProps = {
  compact?: boolean;
};

export function AuthVisual({ compact = false }: AuthVisualProps) {
  if (compact) {
    return (
      <View style={styles.stripRoot}>
        <View style={styles.stripCopy}>
          <AppText role="caption" tone="secondary">
            Group split
          </AppText>
          <AppText role="title2">USD 84.00</AppText>
          <View style={styles.stripPill}>
            <SymbolView name="checkmark.circle.fill" size={14} tintColor={theme.colors.positive} />
            <AppText role="micro" tone="positive">
              ready to split
            </AppText>
          </View>
        </View>

        <View style={styles.stripStack}>
          <View style={styles.stripCardBack} />
          <View style={styles.stripCardFront}>
            <SymbolView name="arrow.left.arrow.right" size={22} tintColor={theme.colors.accent} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.sweepOne} />
      <View style={styles.sweepTwo} />
      <View style={styles.sweepThree} />
      <View style={styles.sweepFour} />

      <View style={styles.billCard}>
        <View style={styles.billIcon}>
          <SymbolView name="doc.text.fill" size={20} tintColor={theme.colors.info} />
        </View>
        <AppText role="caption" tone="secondary">
          Trip dinner
        </AppText>
        <AppText role="title2">USD 84</AppText>
      </View>

      <View style={styles.path}>
        <View style={styles.coinOne}>
          <AppText role="micro" tone="inverse">
            $
          </AppText>
        </View>
        <View style={styles.coinTwo}>
          <AppText role="micro" tone="inverse">
            $
          </AppText>
        </View>
        <View style={styles.transferButton}>
          <SymbolView name="arrow.left.arrow.right" size={22} tintColor={theme.colors.textInverse} />
        </View>
      </View>

      <View style={styles.cashOne}>
        <AppText role="micro" tone="positive">
          $
        </AppText>
      </View>
      <View style={styles.cashTwo}>
        <AppText role="micro" tone="positive">
          $
        </AppText>
      </View>

      <View style={styles.personOne}>
        <View style={styles.personHead} />
        <View style={styles.personBody} />
      </View>

      <View style={styles.personTwo}>
        <View style={styles.personHeadTwo} />
        <View style={styles.personBodyTwo} />
      </View>

      <View style={styles.friendRow}>
        <View style={[styles.avatar, styles.avatarBlue]}>
          <AppText role="micro">AZ</AppText>
        </View>
        <View style={[styles.avatar, styles.avatarPurple]}>
          <AppText role="micro">MJ</AppText>
        </View>
        <View style={styles.balancePill}>
          <AppText role="caption" tone="positive">
            settled
          </AppText>
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={[styles.chartBar, styles.chartBarShort]} />
        <View style={[styles.chartBar, styles.chartBarTall]} />
        <View style={[styles.chartBar, styles.chartBarMid]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.accent,
    borderBottomLeftRadius: theme.radii["3xl"],
    borderBottomRightRadius: theme.radii["3xl"],
    minHeight: 404,
    overflow: "hidden",
    padding: theme.spacing[5],
    width: "100%",
  },
  stripRoot: {
    alignItems: "center",
    backgroundColor: theme.colors.surfaceTintBlue,
    borderRadius: theme.radii["2xl"],
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 124,
    overflow: "hidden",
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[4],
  },
  stripCopy: {
    gap: theme.spacing[1],
  },
  stripPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: theme.colors.positiveSoft,
    borderRadius: theme.radii.full,
    flexDirection: "row",
    gap: theme.spacing[1],
    marginTop: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
  },
  stripStack: {
    height: 88,
    position: "relative",
    width: 106,
  },
  stripCardBack: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.xl,
    height: 76,
    position: "absolute",
    right: 0,
    top: 0,
    transform: [{ rotate: "-10deg" }],
    width: 82,
  },
  stripCardFront: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    bottom: 0,
    height: 72,
    justifyContent: "center",
    position: "absolute",
    right: 22,
    width: 76,
    ...theme.shadows.sm,
  },
  sweepOne: {
    backgroundColor: theme.colors.accentPressed,
    borderRadius: theme.radii["3xl"],
    height: 420,
    position: "absolute",
    right: -210,
    top: -74,
    transform: [{ rotate: "24deg" }],
    width: 320,
  },
  sweepTwo: {
    backgroundColor: theme.colors.surfaceTintPurple,
    borderRadius: theme.radii["3xl"],
    height: 310,
    left: 92,
    opacity: 0.92,
    position: "absolute",
    top: 40,
    transform: [{ rotate: "34deg" }],
    width: 84,
  },
  sweepThree: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radii.full,
    height: 260,
    left: -112,
    opacity: 0.18,
    position: "absolute",
    top: -44,
    transform: [{ rotate: "20deg" }],
    width: 240,
  },
  sweepFour: {
    backgroundColor: theme.colors.negativeSoft,
    borderRadius: theme.radii.full,
    height: 180,
    left: 112,
    opacity: 0.42,
    position: "absolute",
    top: 160,
    transform: [{ rotate: "28deg" }],
    width: 70,
  },
  billCard: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    gap: theme.spacing[2],
    padding: theme.spacing[4],
    transform: [{ rotate: "6deg" }],
    width: 148,
    ...theme.shadows.md,
  },
  billIcon: {
    alignItems: "center",
    backgroundColor: theme.colors.infoSoft,
    borderRadius: theme.radii.md,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  path: {
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.full,
    height: 118,
    justifyContent: "center",
    position: "absolute",
    right: 42,
    top: 104,
    transform: [{ rotate: "-10deg" }],
    width: 118,
    ...theme.shadows.md,
  },
  coinOne: {
    alignItems: "center",
    backgroundColor: theme.colors.positive,
    borderRadius: theme.radii.full,
    height: 34,
    justifyContent: "center",
    left: 16,
    position: "absolute",
    top: 16,
    width: 34,
  },
  coinTwo: {
    alignItems: "center",
    backgroundColor: theme.colors.warning,
    borderRadius: theme.radii.full,
    bottom: 14,
    height: 30,
    justifyContent: "center",
    position: "absolute",
    right: 18,
    width: 30,
  },
  transferButton: {
    alignItems: "center",
    backgroundColor: theme.colors.accentPressed,
    borderRadius: theme.radii.full,
    height: 52,
    justifyContent: "center",
    transform: [{ rotate: "18deg" }],
    width: 52,
  },
  cashOne: {
    alignItems: "center",
    backgroundColor: theme.colors.positiveSoft,
    borderRadius: theme.radii.xs,
    height: 34,
    justifyContent: "center",
    left: 32,
    position: "absolute",
    top: 104,
    transform: [{ rotate: "-8deg" }],
    width: 56,
  },
  cashTwo: {
    alignItems: "center",
    backgroundColor: theme.colors.positiveSoft,
    borderRadius: theme.radii.xs,
    bottom: 74,
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: 126,
    transform: [{ rotate: "12deg" }],
    width: 56,
  },
  personOne: {
    bottom: 30,
    height: 104,
    left: -6,
    position: "absolute",
    transform: [{ rotate: "-18deg" }],
    width: 74,
  },
  personHead: {
    backgroundColor: theme.colors.warning,
    borderRadius: theme.radii.full,
    height: 28,
    left: 30,
    position: "absolute",
    top: 0,
    width: 28,
    zIndex: 2,
  },
  personBody: {
    backgroundColor: theme.colors.negativeSoft,
    borderRadius: theme.radii["2xl"],
    height: 76,
    left: 8,
    position: "absolute",
    top: 24,
    width: 58,
  },
  personTwo: {
    height: 118,
    position: "absolute",
    right: -2,
    top: 54,
    transform: [{ rotate: "22deg" }],
    width: 74,
  },
  personHeadTwo: {
    backgroundColor: theme.colors.warning,
    borderRadius: theme.radii.full,
    height: 28,
    left: 18,
    position: "absolute",
    top: 0,
    width: 28,
    zIndex: 2,
  },
  personBodyTwo: {
    backgroundColor: theme.colors.accentPressed,
    borderRadius: theme.radii["2xl"],
    height: 86,
    left: 8,
    position: "absolute",
    top: 24,
    width: 58,
  },
  friendRow: {
    alignItems: "center",
    bottom: theme.spacing[8],
    flexDirection: "row",
    left: theme.spacing[5],
    position: "absolute",
  },
  avatar: {
    alignItems: "center",
    borderColor: theme.colors.surface,
    borderRadius: theme.radii.full,
    borderWidth: 3,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  avatarBlue: {
    backgroundColor: theme.colors.surfaceTintBlue,
  },
  avatarPurple: {
    backgroundColor: theme.colors.surfaceTintPurple,
    marginLeft: -theme.spacing[3],
  },
  balancePill: {
    backgroundColor: theme.colors.positiveSoft,
    borderRadius: theme.radii.full,
    marginLeft: theme.spacing[3],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  chartCard: {
    alignItems: "flex-end",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    bottom: theme.spacing[8],
    flexDirection: "row",
    gap: theme.spacing[2],
    height: 82,
    justifyContent: "center",
    padding: theme.spacing[3],
    position: "absolute",
    right: theme.spacing[5],
    width: 104,
    ...theme.shadows.sm,
  },
  chartBar: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radii.full,
    width: 14,
  },
  chartBarShort: {
    height: 30,
    opacity: 0.28,
  },
  chartBarTall: {
    height: 54,
  },
  chartBarMid: {
    height: 40,
    opacity: 0.48,
  },
});
