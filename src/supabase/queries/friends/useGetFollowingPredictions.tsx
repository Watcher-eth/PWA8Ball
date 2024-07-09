// @ts-nocheck

import { supabase } from "@/supabase/supabaseClient";

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

const fetchPredictionsByFollowing = async (followingIds: string[]) => {
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
          title,
          id
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
    .limit(65);

  if (error) {
    console.error("Error fetching predictions:", error.message);
    throw new Error(error.message);
  }

  // Fetch initialProb for each market
  const marketIds = data.map((prediction) => prediction.markets.id);

  const { data: onchainData, error: onchainError } = await supabase
    .from("OnchainMarkets")
    .select("id, initialProb")
    .in("id", marketIds);

  if (onchainError) {
    console.error("Error fetching onchain market data:", onchainError.message);
    throw new Error(onchainError.message);
  }

  const initialProbMap = Object.fromEntries(
    onchainData.map((item) => [item.id, item.initialProb])
  );

  return data.map((prediction) => ({
    ...prediction,
    markets: {
      ...prediction.markets,
      initialProb: initialProbMap[prediction.markets.id] || null,
    },
  }));
};

import { useQuery } from "@tanstack/react-query";

export const useGetFollowingPredictions = (userId) => {
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
