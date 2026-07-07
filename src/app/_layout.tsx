import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { theme } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

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
