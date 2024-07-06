
// utils/userApi.ts
import { supabase } from "@/lib/supabase/supabaseClient"; // Import your Supabase client
import { IUser } from "@/lib/supabase/types";

export async function getUserFromDB(userId: string): Promise<IUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("external_auth_provider_user_id", userId)
    .single();
  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  return data as IUser;
}

export async function createUserInDB(userId: string): Promise<IUser | null> {
  const { data, error } = await supabase
    .from("users")
    .insert([{ external_auth_provider_user_id: userId }])
    .single();
  if (error) {
    console.error("Error creating user:", error);
    return null;
  }
  return data as IUser;
}

export async function updateUserInDB(
  userId: string,
  updates: Partial<IUser>
): Promise<IUser | null> {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("external_auth_provider_user_id", userId)
    .single();
  if (error) {
    console.error("Error updating user:", error);
    return null;
  }
  return data as IUser;
}
