import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";
import { IMarket } from "../../types";

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

const fetchRelatedMarketsTopic = async (
  topicId: string
): Promise<IMarketWithTopicDetails[]> => {
  console.log(`fetching order count for market ${topicId}:`);

  // Use the .rpc method to call your SQL function
  const { data, error } = await supabase.rpc("get_related_markets_with_count", {
    topic_id: topicId,
  });

  if (error) {
    console.error("Error fetching markets for topic:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useGetRelatedMarkets = (topicId: string) => {
  return useQuery({
    queryKey: ["RelatedMarkets", topicId],
    queryFn: () => fetchRelatedMarketsTopic(topicId),
    enabled: !!topicId, // This query will only run if topicId is truthy
  });
};
