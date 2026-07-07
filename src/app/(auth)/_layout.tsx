import { Stack } from "expo-router";

import { theme } from "@/constants/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="permissions" />
    </Stack>
  );
}
