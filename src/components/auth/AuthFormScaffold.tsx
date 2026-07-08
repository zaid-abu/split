import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AuthTopBar } from "@/components/auth/AuthTopBar";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { theme } from "@/constants/theme";

type AuthFormScaffoldProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerPrompt?: string;
  footerActionLabel?: string;
  onFooterAction?: () => void;
  onBack?: () => void;
  bottomSlot?: ReactNode;
};

export function AuthFormScaffold({
  title,
  subtitle,
  children,
  footerPrompt,
  footerActionLabel,
  onFooterAction,
  onBack,
  bottomSlot,
}: AuthFormScaffoldProps) {
  const router = useRouter();

  return (
    <AppScreen scroll contentStyle={styles.container}>
      <AuthTopBar onBack={onBack ?? (() => router.replace(routes.auth.welcome))} />

      <View style={styles.header}>
        <AppText role="title1" style={styles.title}>
          {title}
        </AppText>
        <AppText tone="secondary" style={styles.subtitle}>
          {subtitle}
        </AppText>
      </View>

      <View style={styles.content}>{children}</View>

      {bottomSlot ? <View style={styles.bottomSlot}>{bottomSlot}</View> : null}

      {footerPrompt && footerActionLabel && onFooterAction ? (
        <View style={styles.inlinePrompt}>
          <AppText role="callout" tone="secondary">
            {footerPrompt}
          </AppText>
          <Pressable onPress={onFooterAction} hitSlop={theme.spacing[2]}>
            <AppText role="callout" tone="accent">
              {footerActionLabel}
            </AppText>
          </Pressable>
        </View>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[6],
    justifyContent: "flex-start",
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[5],
  },
  header: {
    gap: theme.spacing[3],
    paddingTop: theme.spacing[3],
  },
  title: {
    maxWidth: 320,
  },
  subtitle: {
    maxWidth: 320,
  },
  content: {
    gap: theme.spacing[4],
  },
  bottomSlot: {
    gap: theme.spacing[5],
  },
  inlinePrompt: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing[1],
    justifyContent: "center",
    paddingBottom: theme.spacing[6],
  },
});
