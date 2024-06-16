// types.ts
interface IUser {
  name: string;
  pfp: string; // profile picture
}

export interface IComment {
  id: string;
  market_id: number;
  content: string;
  created_by: string;
  created_at: Date;
  likes: { count: number; user_ids: string[] };
  user: IUser; // Nested user object to hold related user data
}

// fetchComments.ts
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";

const fetchCommentsForMarket = async (
  marketId: number
): Promise<IComment[]> => {
  const { data, error } = await supabase
    .from<IComment>("comments")
    .select(
      `
        id,
        market_id,
        content,
        created_at,
        likes,
        created_by,
        user:created_by ( 
          name,
          pfp
        )
      `
    )
    .eq("market_id", marketId);

  if (error) {
    console.error("Error fetching comments:", error.message);
    throw new Error(error.message);
  }

  return data;
};
// useGetAllCommentsForMarket.ts

export const useGetAllCommentsForMarket = (marketId: number) => {
  return useQuery<IComment[], Error>({
    queryKey: ["comments", marketId],
    queryFn: () => fetchCommentsForMarket(marketId),
    // You can add options such as `staleTime`, `cacheTime`, etc., here if needed
  });
};
