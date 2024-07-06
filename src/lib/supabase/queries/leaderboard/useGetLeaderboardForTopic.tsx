// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";

// Function to fetch the leaderboard for a specific topic
const fetchLeaderboardForTopic = async (topicId: string) => {
  const { data, error } = await supabase.rpc("get_leaderboard_for_topic", {
    topic_id: topicId,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Hook to use the leaderboard data
export function useGetLeaderboardForTopic(topicId: string) {
  return useQuery({
    queryKey: ["leaderboardForTopic", topicId],
    queryFn: () => fetchLeaderboardForTopic(topicId),
    enabled: !!topicId, // The query will not execute until the topicId exists
    staleTime: 5 * 60 * 1000, // Adjust based on how often you expect this data to change
  });
};
