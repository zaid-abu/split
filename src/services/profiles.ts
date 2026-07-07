import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code !== "PGRST116") {
      console.warn("[getProfile] Error fetching profile:", error);
    }
    return null;
  }
  return data;
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    console.error("[updateProfile] Error updating profile:", error);
    throw new Error(error.message);
  }
}
