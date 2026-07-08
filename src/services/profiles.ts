import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

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

export async function updateProfile(userId: string, updates: ProfileUpdate): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    console.error("[updateProfile] Error updating profile:", error);
    throw new Error(error.message);
  }
}

export async function upsertProfile(userId: string, profile: Omit<ProfileInsert, "id">): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...profile });

  if (error) {
    console.error("[upsertProfile] Error saving profile:", error);
    throw new Error(error.message);
  }
}
