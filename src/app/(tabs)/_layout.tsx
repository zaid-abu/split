import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SymbolView } from "expo-symbols";

import { theme } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <SymbolView name="house.fill" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => <SymbolView name="person.2.fill" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => <SymbolView name="person.3.fill" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <SymbolView name="bell.fill" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <SymbolView name="person.crop.circle.fill" tintColor={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
    shadowOpacity: 0,
  },
});
