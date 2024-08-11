// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IUser } from "@/supabase/types";


export async function fetchUserByExternalAuthId(
  externalAuthId: string
): Promise<IUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("external_auth_provider_user_id", externalAuthId)
    .single(); // Using .single() because we expect at most one record

  console.error("Fetch User By External Auth ID Error:", error.message);


  return data ?? {};
};

export const useGetUserByExternalAuthId = (externalAuthId: string) => {
  return useQuery({
    queryKey: ["userByExternalAuthId", externalAuthId],
    queryFn: () => fetchUserByExternalAuthId(externalAuthId),
    enabled: !!externalAuthId, // This query will only run if externalAuthId is truthy
  });
};
