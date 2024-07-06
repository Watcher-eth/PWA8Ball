// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import { IMarket } from "@/lib/supabase/types";

const fetchTrendingMarkets = async (topicId: string): Promise<IMarket[]> => {
  const { data, error } = await supabase
    .from("markets")
    .select(
      `
        *,
        topics (
          id,
          title,
          description,
          image
        ),
        predictions:predictions (count)
      `
    )
    .eq("topicid", topicId)
    .lte("predictions.created_at", new Date(Date.now() - 48 * 60 * 60 * 1000)) // predictions from the last 48 hours
    .order("count", { foreignTable: "predictions", ascending: false }) // Order by count of predictions descending
    .limit(15); // Limit to top 15

  if (error) throw new Error(error.message);
  return data;
};

export const useGetTrendingMarketsForTopic = (topicId: string) => {
  return useQuery({
    queryKey: ["trendingMarketsForTopic", topicId],
    queryFn: () => fetchTrendingMarkets(topicId),
    enabled: !!topicId, // This query will only run if topicId is truthy
  });
};
