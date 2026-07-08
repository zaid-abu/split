import type { Href } from "expo-router";

export const routes = {
  auth: {
    welcome: "/welcome" as Href,
    signIn: "/sign-in" as Href,
    register: "/register" as Href,
    profileSetup: "/profile-setup" as Href,
  },
  tabs: {
    home: "/home" as Href,
  },
} as const;
