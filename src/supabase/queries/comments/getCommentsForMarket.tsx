import { supabase } from "../../supabaseClient";
import { getMarketById } from "@/graphql/queries/markets/useGetMarketById";

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
  total_likes: number;
  total_replies: number;
  parent_id?: string; // Optional parent ID for replies
  user: IUser; // Nested user object to hold related user data
  userLiked?: boolean; // Indicates if the user liked the comment
  market_title?: string; // Included in the transformed data
  market_image?: string; // Included in the transformed data
  market_question?: string; // Included in the transformed data
  replies?: IComment[]; // Nested comments (replies)
}

// Default fallback user object in case no user is found
const DEFAULT_USER = {
  name: "Anon",
  pfp: DEFAULT_PFP_PLACEHOLDER, // Provide a default avatar
};

const fetchCommentsForMarket = async (
  marketId: number,
  userId: string
): Promise<IComment[]> => {
  // Fetch comments and their replies
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
        id,
        market_id,
        content,
        created_at,
        total_likes,
        total_replies,
        parent_id,
        created_by
      `
    )
    .eq("market_id", marketId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error.message);
    throw new Error(error.message);
  }

  // Fetch likes for all comments in the market
  const commentIds = data.map((comment: any) => comment.id);
  const { data: likesData, error: likesError } = await supabase
    .from("likes")
    .select("comment_id, liked_by")
    .in("comment_id", commentIds);

  if (likesError) {
    console.error("Error fetching likes:", likesError.message);
    throw new Error(likesError.message);
  }

  const likesLookup: Record<string, string[]> = {};
  likesData.forEach((like: any) => {
    if (!likesLookup[like.comment_id]) {
      likesLookup[like.comment_id] = [];
    }
    likesLookup[like.comment_id].push(like.liked_by);
  });

  const market = await getMarketById(String(marketId));
  if (!market) throw new Error("Market not found");

  const commentsWithDetails = await Promise.all(
    data.map(async (comment: any) => {
      let user;
      try {
        user = await getUserById(comment.created_by);
        if (!user) throw new Error(); // If no user found, catch the error
      } catch {
        console.warn(`User not found for id ${comment.created_by}`);
        user = DEFAULT_USER; // Assign default user if not found
      }

      const replies = await Promise.all(
        data
          .filter((reply: any) => reply.parent_id === comment.id)
          .map(async (reply: any) => {
            let replyUser;
            try {
              replyUser = await getUserById(reply.created_by);
              if (!replyUser) throw new Error();
            } catch {
              console.warn(`User not found for id ${reply.created_by}`);
              replyUser = DEFAULT_USER; // Use default user for replies as well
            }
            return {
              ...reply,
              user: {
                name: replyUser.name,
                pfp: replyUser.pfp,
                walletAddress: replyUser?.walletAddress,
              },
              userLiked: likesLookup[reply.id]?.includes(userId) || false,
            };
          })
      );

      return {
        ...comment,
        market_title: market.title,
        market_image: market.image,
        market_question: market.question,
        marketId: market?.id,
        user: {
          name: user.name,
          pfp: user.pfp,
          walletAddress: user?.walletAddress,
        },
        userLiked: likesLookup[comment.id]?.includes(userId) || false,
        replies,
      };
    })
  );

  return commentsWithDetails;
};

export default fetchCommentsForMarket;

import { useQuery } from "@tanstack/react-query";
import { defaultAvatar } from "@/constants/System";
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData";
import { getUserById } from "@/graphql/queries/users/useUserById";

export const useGetAllCommentsForMarket = (
  marketId: number,
  userId: string
) => {
  return useQuery<IComment[], Error>({
    queryKey: ["comments", marketId, userId],
    queryFn: async () => {
      const comments = await fetchCommentsForMarket(marketId, userId);
      console.log("Comments in React Query:", comments);
      return comments;
    },
  });
};
