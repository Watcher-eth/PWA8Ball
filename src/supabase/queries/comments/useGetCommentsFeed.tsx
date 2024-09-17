import { useQuery } from "@tanstack/react-query";
import { IComment } from "../useGetAllCommentsForMarket";
import { supabase } from "@/supabase/supabaseClient";
import { getUserById } from "@/graphql/queries/users/useUserById";
import { getMarketById } from "@/graphql/queries/markets/useGetMarketById";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";

interface ICommentWithMarket extends IComment {
  market_title: string;
  market_image: string;
}

const fetchCommentsForTopic = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      market_id,
      content,
      created_by,
      created_at,
      likes
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

const fetchCommentsWithDetails = async (): Promise<ICommentWithMarket[]> => {
  const comments = await fetchCommentsForTopic();

  const commentsWithDetails = await Promise.all(
    comments.map(async (comment) => {
      const [user, market] = await Promise.all([
        getUserById(comment.created_by),
        getMarketById(String(comment?.market_id))
      ])

      const enhancedMarket = enhanceMarketsWithImageAndPolyId(
        market,
        HARD_MARKETS,
        HARD_TOPICS
      );

      return {
        ...comment,
        market_title: market?.title || "",
        market_image: enhancedMarket?.image || "",
        market_question: market?.question || "",
        user_name: user?.name || "",
        user_pfp: user?.pfp || "",
      };
    })
  );

  return commentsWithDetails;
};

export const useGetCommentsFeed = () => {
  return useQuery({
    queryKey: ["commentsForFeed"],
    queryFn: fetchCommentsWithDetails,
  });
};
