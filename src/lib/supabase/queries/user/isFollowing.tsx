import { supabase } from "../../supabaseClient";

const checkIfFollowing = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from("user_follows")
    .select("follower_id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .single(); // Use .single() to get a single row

  if (error) {
    console.error("Error checking if following:", error.message);
    throw new Error(error.message);
  }

  return data !== null; // Return true if data exists, otherwise false
};

import { useQuery } from "@tanstack/react-query";

export const useCheckIfFollowing = (
  followerId: string,
  followingId: string
) => {
  return useQuery({
    queryKey: ["isFollowing", followerId, followingId],
    queryFn: () => checkIfFollowing(followerId, followingId),
    enabled: !!followerId && !!followingId, // This query will only run if both IDs are truthy
    staleTime: 1000 * 60 * 5, // Optional: Adjust based on how frequently you expect follow relationships to change
  });
};
