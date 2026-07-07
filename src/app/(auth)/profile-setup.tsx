import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { TextField } from "@/components/ui/TextField";
import { theme } from "@/constants/theme";
import { updateProfile } from "@/services/profiles";
import { useAuth } from "@/lib/auth";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateProfile(user.id, {
        full_name: fullName,
        default_currency: currency,
        onboarding_completed: true,
      });
      await refreshProfile();
      router.replace("/(auth)/permissions");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppScreen scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <AppText role="title1">Complete your profile</AppText>
        <AppText tone="secondary">Add your name and preferred currency.</AppText>
      </View>

      <AppCard style={styles.form}>
        <TextField
          label="Full Name"
          placeholder="Jane Doe"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextField
          label="Default Currency"
          placeholder="USD"
          value={currency}
          onChangeText={setCurrency}
        />
        <AppButton label="Save Profile" onPress={handleSave} disabled={isLoading} style={styles.submitBtn} />
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: theme.spacing[12],
  },
  header: {
    gap: theme.spacing[2],
    marginBottom: theme.spacing[8],
  },
  form: {
    gap: theme.spacing[4],
  },
  submitBtn: {
    marginTop: theme.spacing[2],
  },
});
