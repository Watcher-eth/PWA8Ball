import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IComment } from "../useGetAllCommentsForMarket";


interface ICommentWithMarket extends IComment {
  market_title: string;
  market_image: string;
}

const fetchCommentsForTopic = async (
  topicId: string
): Promise<ICommentWithMarket[]> => {
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
      users (
        name,
        pfp
      ),
      markets (
        title,
        image
      )
    `
    )
    .eq("topic_id", topicId);

  if (error) throw new Error(error.message);

  // Transform the data to include market title and image directly in the comment object
  return data.map((comment: any) => ({
    ...comment,
    market_title: comment.markets.title,
    market_image: comment.markets.image,
  }));
};

export const useGetCommentsForTopic = (topicId: string) => {
  return useQuery({
    queryKey: ["commentsForTopic", topicId],
    queryFn: () => fetchCommentsForTopic(topicId),
    enabled: !!topicId, // This query will only run if topicId is truthy
  });
};
