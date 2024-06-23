// @ts-nocheck

import { supabase } from "../../supabaseClient";

const checkUserHasPushToken = async (userId: string): Promise<boolean> => {
  const { data, error, count } = await supabase
    .from("push_tokens")
    .select("id", { count: "exact" }) // Using count to get the number of entries
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return count > 0; // Returns true if there's at least one token, false otherwise
};

import { useQuery } from "@tanstack/react-query";

export const useCheckUserHasPushToken = (userId: string) => {
  return useQuery({
    queryKey: ["userPushToken", userId],
    queryFn: () => checkUserHasPushToken(userId),
    enabled: !!userId, // Ensures the query runs only when userId is available
  });
};
