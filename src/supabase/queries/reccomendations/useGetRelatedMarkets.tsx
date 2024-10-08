import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/supabase/supabaseClient"
import { IMarketWithTopicDetails } from "@/supabase/types"

const fetchRelatedMarketsTopic = async (
  topicId: string
): Promise<IMarketWithTopicDetails[]> => {
  console.log(`fetching order count for market ${topicId}:`)

  // Use the .rpc method to call your SQL function
  const { data, error } = await supabase.rpc("get_related_markets_with_count", {
    topic_id: topicId,
  })

  if (error) {
    console.error("Error fetching markets for topic:", error.message)
    throw new Error(error.message)
  }

  return data
}

export const useGetRelatedMarkets = (topicId: string) => {
  return useQuery({
    queryKey: ["RelatedMarkets", topicId],
    queryFn: () => fetchRelatedMarketsTopic(topicId),
    enabled: !!topicId, // This query will only run if topicId is truthy
  })
}
