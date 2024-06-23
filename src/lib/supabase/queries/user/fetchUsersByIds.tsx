// @ts-nocheck
import { supabase } from "../../supabaseClient";
import { IUser } from "../../types";

const fetchUsersByIds = async (userIds: string[]): Promise<IUser[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .in("external_auth_provider_user_id", userIds);

  if (error) {
    console.error("Fetch Users By IDs Error:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export default fetchUsersByIds;

// useGetUsersByIds.ts
import { useQuery } from "@tanstack/react-query";

export const useGetUsersByIds = (userIds: string[]) => {
  return useQuery<IUser[], Error>({
    queryKey: ["usersByIds", userIds],
    queryFn: () => fetchUsersByIds(userIds),
    enabled: userIds.length > 0, // This query will only run if there are user IDs
  });
};

