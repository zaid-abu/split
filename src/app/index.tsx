import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlassScreen } from "@/components/ui/GlassScreen";
import { IconButton } from "@/components/ui/IconButton";
import { theme } from "@/constants/theme";

const summaryRows = [
  { label: "You are owed", value: "$128.40", tone: "positive" as const },
  { label: "You owe", value: "$42.15", tone: "negative" as const },
  { label: "Net balance", value: "$86.25", tone: "primary" as const },
];

export default function HomeScreen() {
  return (
    <GlassScreen>
      <View style={styles.header}>
        <View>
          <AppText role="caption" tone="secondary">
            Split foundation
          </AppText>
          <AppText role="title1">Shared money, clearly tracked.</AppText>
        </View>
        <IconButton label="Open settings" name="gearshape" tone="accent" />
      </View>

      <GlassPanel style={styles.hero}>
        <View style={styles.heroHeader}>
          <View>
            <AppText role="caption" tone="secondary">
              Net balance
            </AppText>
            <AppText role="display" tone="positive">
              $86.25
            </AppText>
          </View>
          <View style={styles.statusPill}>
            <AppText role="micro" tone="accent">
              Synced
            </AppText>
          </View>
        </View>
        <AppText tone="secondary">
          Your dashboard will show balances derived from expenses, splits, and settlements.
        </AppText>
      </GlassPanel>

      <View style={styles.summaryGrid}>
        {summaryRows.map((row) => (
          <GlassPanel key={row.label} strength="strong" style={styles.summaryPanel}>
            <AppText role="caption" tone="secondary">
              {row.label}
            </AppText>
            <AppText role="title3" tone={row.tone}>
              {row.value}
            </AppText>
          </GlassPanel>
        ))}
      </View>

      <GlassPanel strength="strong" style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <AppText role="title3">Foundation ready</AppText>
            <AppText role="caption" tone="secondary">
              Phase 1 app shell and theme
            </AppText>
          </View>
        </View>
        <View style={styles.checkList}>
          <AppText tone="secondary">Root stack navigation is ready for auth and tabs.</AppText>
          <AppText tone="secondary">Shared glass primitives are available for future screens.</AppText>
          <AppText tone="secondary">Supabase setup begins in the next foundation feature.</AppText>
        </View>
      </GlassPanel>

      <View style={styles.actions}>
        <AppButton label="Add expense" />
        <AppButton label="Settle up" variant="secondary" />
      </View>
    </GlassScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: theme.spacing[4],
    justifyContent: "space-between",
  },
  hero: {
    gap: theme.spacing[4],
  },
  heroHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: theme.spacing[4],
    justifyContent: "space-between",
  },
  statusPill: {
    backgroundColor: theme.colors.accentGlass,
    borderRadius: theme.radii.full,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
  },
  summaryGrid: {
    gap: theme.spacing[3],
  },
  summaryPanel: {
    gap: theme.spacing[1],
  },
  section: {
    gap: theme.spacing[4],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkList: {
    gap: theme.spacing[3],
  },
  actions: {
    gap: theme.spacing[3],
  },
});
