import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import {
  enhanceMarketsWithImageAndPolyId,
  enhanceSingleMarketWithImageAndPolyId,
} from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { hardMarkets } from "@/constants/markets";
import { hardTopics } from "@/constants/topics";

import {
  getMarketById,
  useGetMarketById,
} from "@/graphql/queries/markets/useGetMarketById";
import { IComment } from "../useGetAllCommentsForMarket";
import { getUserById } from "@/graphql/queries/users/useUserById";

interface ICommentWithMarket extends IComment {
  market_title: string;
  market_image: string;
  user_name: string;
  user_pfp: string;
  market_question: string;
}

const fetchCommentsForTopic = async (topicId: string): Promise<IComment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      market_id,
      content,
      created_by,
      created_at,
      likes,
      topic_id
    `
    )
    .eq("topic_id", topicId) // Filtering by topic_id
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

const fetchCommentsWithDetails = async (
  topicId: string
): Promise<ICommentWithMarket[]> => {
  const comments = await fetchCommentsForTopic(topicId);

  const commentsWithDetails = await Promise.all(
    comments.map(async (comment) => {
      const user = await getUserById(comment.created_by);
      const market = await getMarketById(String(comment?.market_id));

      const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
        market,
        hardMarkets,
        hardTopics
      );

      return {
        ...comment,
        market_title: enhancedMarket?.title || "",
        market_image: enhancedMarket?.image || "",
        market_question: enhancedMarket?.question || "",
        user_name: user?.name || "",
        user_pfp: user?.pfp || "",
      };
    })
  );

  return commentsWithDetails;
};

export const useGetCommentsByTopicId = (topicId: string) => {
  return useQuery({
    queryKey: ["commentsForTopic", topicId],
    queryFn: () => fetchCommentsWithDetails(topicId),
  });
};
