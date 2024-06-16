import { useQuery } from "@tanstack/react-query";
import { IComment } from "../getComments";
import { supabase } from "../../supabaseClient";

interface ICommentWithMarket extends IComment {
  market_title: string;
  market_image: string;
}

const fetchCommentsForTopic = async (): Promise<ICommentWithMarket[]> => {
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
        question,
        image
      )
    `
    )
    .order("created_at", { ascending: false }); // Sort by creation time

  if (error) throw new Error(error.message);

  // Transform the data to include market title and image directly in the comment object
  return data.map((comment: any) => ({
    ...comment,
    market_title: comment.markets.title,
    market_image: comment.markets.image,
    market_question: comment.markets.question,
  }));
};

export const useGetCommentsFeed = () => {
  return useQuery({
    queryKey: ["commentsForTopic"],
    queryFn: () => fetchCommentsForTopic(),
  });
};
