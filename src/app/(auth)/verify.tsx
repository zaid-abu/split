import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { TextField } from "@/components/ui/TextField";
import { theme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";

export default function VerifyScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    if (!code || !email) {
      setError("Please enter the verification code.");
      return;
    }
    setIsLoading(true);
    
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });

    setIsLoading(false);
    
    if (error) {
      setError(error.message);
    }
    // On success, AuthProvider will detect the session and route to profile-setup
  };

  return (
    <AppScreen contentStyle={styles.container}>
      <View style={styles.header}>
        <AppText role="title1">Check your email</AppText>
        <AppText tone="secondary">We sent a verification code to you.</AppText>
      </View>

      <AppCard style={styles.form}>
        <TextField
          label="Verification Code"
          placeholder="000000"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          error={error ? " " : undefined}
        />

        {error ? (
          <AppText tone="negative" role="caption" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppButton label="Verify" onPress={handleVerify} disabled={isLoading} style={styles.submitBtn} />
        <AppButton label="Resend Code" variant="ghost" onPress={() => {}} disabled={isLoading} />
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
  errorText: {
    textAlign: "center",
  },
  submitBtn: {
    marginTop: theme.spacing[2],
  },
});
