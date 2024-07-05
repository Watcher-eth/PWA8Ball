// @ts-nocheck

// hooks/useInitializeUser.ts
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useUserStore } from "@/lib/stores/UserStore";
import { getUSDCBalance } from "@/lib/onchain/contracts/Usdc";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";

export function useInitializeUser() {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { user, setUser } = useUserStore();
  const { smartAccountAddress } = useSmartAccount();

  useEffect(() => {
    async function fetchUser() {
      if (ready && authenticated && privyUser) {
        // Check if user exists in the database
        const dbUser = await getUserFromDB(privyUser?.id);

        if (dbUser) {
          // Update user context with DB values
          console.log("dbUser", dbUser);
          const balance = await getUSDCBalance(dbUser?.walletaddress);

          const updatedUser = { ...dbUser, balance };
          setUser(updatedUser);
          console.log("Balance", balance, smartAccountAddress);
        } else {
          // Create new user in DB
          const newUser = await createUserInDB(privyUser.id);
          setUser({ ...newUser, balance: "0" });
        }
      }
    }

    fetchUser();
  }, [ready, authenticated, privyUser, setUser, smartAccountAddress]);
}

// utils/userApi.ts
import { supabase } from "../supabase/supabaseClient"; // Import your Supabase client
import { IUser } from "../supabase/types";

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
