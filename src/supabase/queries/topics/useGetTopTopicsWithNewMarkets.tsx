// @ts-nocheck
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { ITopic } from "@/supabase/types";

export function useGetTopTopicsWithNewMarkets(): UseQueryResult<
  ITopic[],
  Error
> {
  return useQuery<ITopic[], Error>(["topTopicsNewMarkets"], async () => {
    let { data: markets, error: marketError } = await supabase
      .from("markets")
      .select("topicId, created_at")
      .gte(
        "created_at",
        new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      );

    if (marketError) throw new Error(marketError.message);

    // Assuming each market has a topicId and you're manually aggregating counts
    let topicCounts = markets.reduce((acc, { topicId }) => {
      acc[topicId] = (acc[topicId] || 0) + 1;
      return acc;
    }, {});

    let topicIds = Object.keys(topicCounts)
      .sort((a, b) => topicCounts[b] - topicCounts[a])
      .slice(0, 20);

    let { data: topics, error: topicsError } = await supabase
      .from("topics")
      .select("*")
      .in("id", topicIds);

    if (topicsError) throw new Error(topicsError.message);

    // Sort topics based on the count of new markets
    topics.sort((a, b) => topicCounts[b.id] - topicCounts[a.id]);

    return topics;
  });
};
