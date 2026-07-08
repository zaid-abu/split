import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { theme } from "@/constants/theme";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AuthProvider, useAuth } from "@/lib/auth";
import { routes } from "@/constants/routes";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const { session, profile, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const authRoute = segments[1];

    if (!session) {
      if (!inAuthGroup || authRoute === "splash") {
        router.replace(routes.auth.welcome);
      }
      return;
    }

    if (!profile || !profile.onboarding_completed) {
      if (authRoute !== "profile-setup" && authRoute !== "permissions") {
        router.replace(routes.auth.profileSetup);
      }
      return;
    }

    if (inAuthGroup) {
      router.replace(routes.tabs.home);
    }
  }, [session, profile, isLoading, segments, router]);

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareShell(): Promise<void> {
      try {
        await SystemUI.setBackgroundColorAsync(theme.colors.background);
      } catch (error) {
        console.warn("[RootLayout] Unable to prepare shell", error);
      } finally {
        setIsReady(true);
      }
    }

    prepareShell();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const hasSupabaseEnv =
    !!process.env.EXPO_PUBLIC_SUPABASE_URL &&
    !!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasSupabaseEnv) {
    return (
      <AppScreen contentStyle={{ justifyContent: "center" }}>
        <AppCard>
          <AppText role="title2" tone="negative" style={{ marginBottom: theme.spacing[2] }}>
            Missing Configuration
          </AppText>
          <AppText>
            Please create a .env file at the project root with your Supabase credentials:
          </AppText>
          <AppText tone="muted" style={{ marginTop: theme.spacing[4] }}>
            EXPO_PUBLIC_SUPABASE_URL
          </AppText>
          <AppText tone="muted">
            EXPO_PUBLIC_SUPABASE_ANON_KEY
          </AppText>
        </AppCard>
      </AppScreen>
    );
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
