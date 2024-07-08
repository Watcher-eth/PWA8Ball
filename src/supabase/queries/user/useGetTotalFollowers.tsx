
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const fetchTotalFollowers = async (userId: string) => {
  const { data, error, count } = await supabase
    .from("user_follows")
    .select("*", { count: "exact" })
    .eq("following_id", userId);

  if (error) {
    console.error("Error fetching followers:", error.message);
    throw new Error(error.message);
  }

  return count; // 'count' will be the total number of followers
};

export const useGetTotalFollowers = (userId: string) => {
  return useQuery({
    queryKey: ["totalFollowers", userId],
    queryFn: () => fetchTotalFollowers(userId),
    enabled: !!userId, // This query will only run if userId is truthy
    staleTime: 1000 * 60 * 5, // Optional: Adjust based on how frequently you expect follower counts to change
  });
};
