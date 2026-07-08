import { supabase } from "@/lib/supabase";

type AuthResult = {
  needsVerification: boolean;
};

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function registerWithEmail(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    needsVerification: data.session === null,
  };
}

export async function verifySignupOtp(email: string, token: string): Promise<void> {
  const { error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token: token.trim(),
    type: "signup",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function resendSignupOtp(email: string): Promise<void> {
  const { error } = await supabase.auth.resend({
    email: email.trim(),
    type: "signup",
  });

  if (error) {
    throw new Error(error.message);
  }
}
