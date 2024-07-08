// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IMarket } from "@/supabase/types";

interface IMarketWithTopicDetails extends IMarket {
  // Extend your IMarket interface with additional properties that your function returns
  usdcStake: number;
  liquidityUSDC: number;
  outcomeA: number;
  outcomeB: number;
  topic_id: string; // Assuming these are returned by your SQL function
  topic_title: string;
  topic_description: string;
  topic_image: string;
}

const fetchMarketsForTopic = async (
  topicId: string
): Promise<IMarketWithTopicDetails[]> => {
  // Use the .rpc method to call your SQL function
  const { data, error } = await supabase.rpc("get_markets_for_topic", {
    input_topic_id: topicId,
  });

  if (error) {
    console.error("Error fetching markets for topic:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export function useGetMarketsForTopic(topicId: string) {
  return useQuery({
    queryKey: ["marketsTopic", topicId],
    queryFn: () => fetchMarketsForTopic(topicId),
    enabled: !!topicId, // This query will only run if topicId is truthy
  });
};
