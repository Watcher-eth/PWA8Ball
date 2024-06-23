// @ts-nocheck

import { supabase } from "../../supabaseClient";

const fetchFollowingIds = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_follows")
    .select("following_id")
    .eq("follower_id", userId);

  if (error) {
    console.error("Error fetching following IDs:", error.message);
    throw new Error(error.message);
  }

  return data.map((row) => row.following_id);
};

const fetchPredictionsByFollowing = async (followingIds) => {
  if (followingIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("predictions")
    .select(
      `
        *,
        markets (
          image,
          question,
          title
        ),
        users (
            pfp,
            name,
            external_auth_provider_user_id
        )
      `
    )
    .in("user_id", followingIds)
    .order("created_at", { ascending: false })
    .limit(25);

  if (error) {
    console.error("Error fetching predictions:", error.message);
    throw new Error(error.message);
  }

  return data;
};

import { useQuery } from "@tanstack/react-query";

export const useGetFollowingPredictions = (userId: string) => {
  return useQuery({
    queryKey: ["followingPredictions", userId],
    queryFn: async () => {
      const followingIds = await fetchFollowingIds(userId);
      return fetchPredictionsByFollowing(followingIds);
    },
    enabled: !!userId, // This query will only run if userId is truthy
    staleTime: 1000 * 60 * 5, // Optional: Adjust based on how frequently you expect data to change
  });
};
