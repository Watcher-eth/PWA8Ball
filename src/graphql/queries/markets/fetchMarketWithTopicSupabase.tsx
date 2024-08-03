import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IMarket } from "@/supabase/types";

interface IMarketWithTopic extends IMarket {
  topic: {
    id: string;
    title: string;
    description: string;
    image: string;
    members: number;
  };
  joined: boolean;
}

export async function fetchMarketById(
  marketId: string,
  userId: string
): Promise<IMarketWithTopic | null> {
  const { data, error } = await supabase
    .from("markets")
    .select(
      `
      id,
      topicid,
      title,
      question,
      options,
      image,
      participants,
      pair,
      "Points_Balance",
      "US_Participants",
      "isResolved",
      total_comments,
      created_by,
      topics (
        id,
        title,
        description,
        image,
        members
      ),
      CASE 
        WHEN ? IS NULL THEN false
        ELSE EXISTS (
          SELECT 1 
          FROM public.user_topics ut 
          WHERE ut.topic_id = markets.topicid 
            AND ut.user_id = ?
        )
      END AS joined
      `,
      [userId, userId]
    )
    .eq("id", marketId)
    .single();

  if (error) {
    console.error("Fetch Market By ID Error:", error.message);
    throw new Error(error.message);
  }

  return data ?? null;
}

export const useGetMarketById = (marketId: string, userId: string) => {
  return useReactQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchMarketById(marketId, userId),
    enabled: !!marketId, // This query will only run if marketId is truthy
  });
};
