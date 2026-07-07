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

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else if (data.session === null) {
        router.push({ pathname: "/(auth)/verify", params: { email } });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <AppScreen scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <AppText role="display">Welcome</AppText>
        <AppText tone="secondary">Sign in to manage your shared expenses.</AppText>
      </View>

      <AppCard style={styles.form}>
        <TextField
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={error ? " " : undefined}
        />
        <TextField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        {error ? (
          <AppText tone="negative" role="caption" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}

        <AppButton 
          label={isSignUp ? "Create Account" : "Sign In"} 
          onPress={handleAuth} 
          disabled={isLoading}
          style={styles.submitBtn} 
        />
        <AppButton 
          label={isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"} 
          variant="ghost" 
          onPress={() => setIsSignUp(!isSignUp)} 
          disabled={isLoading}
        />
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
