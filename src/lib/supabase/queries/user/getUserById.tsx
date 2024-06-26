// @ts-nocheck
interface IUser {
  internal_id: string;
  external_auth_provider_user_id: string;
  liquiditypoints: number;
  rewardpoints: number;
  walletaddress: string;
  socials: any; // Adjust according to the specific structure if known
  friends: any; // Adjust according to the specific structure if known
  created_at: string;
  updated_at: string;
  theme: string;
  name: string;
  pfp: string;
}

// useGetUserByExternalAuthId.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

const fetchUserByExternalAuthId = async (
  externalAuthId: string
): Promise<IUser | null> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("external_auth_provider_user_id", externalAuthId)
    .single(); // Using .single() because we expect at most one record

  if (error) {
    console.error("Fetch User By External Auth ID Error:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useGetUserByExternalAuthId = (externalAuthId: string) => {
  return useQuery({
    queryKey: ["userByExternalAuthId", externalAuthId],
    queryFn: () => fetchUserByExternalAuthId(externalAuthId),
    enabled: !!externalAuthId, // This query will only run if externalAuthId is truthy
  });
};
