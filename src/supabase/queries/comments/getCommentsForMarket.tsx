import { supabase } from "../../supabaseClient"
import { getMarketById } from "@/graphql/queries/markets/useGetMarketById"
import { getUserById } from "@/graphql/queries/users/useUserById"

interface IUser {
  name: string
  pfp: string // profile picture
}

export interface IComment {
  id: string
  market_id: number
  content: string
  created_by: string
  created_at: Date
  total_likes: number
  total_replies: number
  parent_id?: string // Optional parent ID for replies
  user: IUser // Nested user object to hold related user data
  userLiked?: boolean // Indicates if the user liked the comment
  market_title?: string // Included in the trarnsformed data
  market_image?: string // Included in the transformed data
  market_question?: string // Included in the transformed data
  replies?: IComment[] // Nested comments (replies)
}

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
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error.message, marketId)
    throw new Error(error.message)
  }

  // Fetch likes for all comments in the market
  const commentIds = data.map((comment: any) => comment.id)
  const { data: likesData, error: likesError } = await supabase
    .from("likes")
    .select("comment_id, liked_by")
    .in("comment_id", commentIds)

  if (likesError) {
    console.error("Error fetching likes:", likesError.message)
    throw new Error(likesError.message)
  }

  // Create a lookup for likes
  const likesLookup: Record<string, string[]> = {}
  likesData.forEach((like: any) => {
    if (!likesLookup[like.comment_id]) {
      likesLookup[like.comment_id] = []
    }
    likesLookup[like.comment_id].push(like.liked_by)
  })

  // Transform the data to include market details and user liked status
  const commentsWithDetails = await Promise.all(
    data.map(async (comment: any) => {
      // Fetch user details
      const user = await getUserById(comment.created_by)
      if (!user) throw new Error(`User not found for id ${comment.created_by}`)

      return {
        ...comment,
        user: {
          name: user.name,
          pfp: user.pfp,
          walletAddress: user?.walletAddress,
        },
        userLiked: likesLookup[comment.id]?.includes(userId) || false,
        replies: data
          .filter((reply: any) => reply.parent_id === comment.id)
          .map((reply: any) => ({
            ...reply,
            user: {
              name: user.name,
              pfp: user.pfp,
              walletAddress: user?.walletAddress,
            },
            userLiked: likesLookup[reply.id]?.includes(userId) || false,
          })),
      }
    })
  )
  // Filter out replies from the top-level comments
  return commentsWithDetails.filter((comment: any) => !comment.parent_id)
}

export default fetchCommentsForMarket

import { useQuery } from "@tanstack/react-query"

export const useGetAllCommentsForMarket = (
  marketId: number,
  userId: string
) => {
  return useQuery<IComment[], Error>({
    queryKey: ["comments", marketId, userId],
    queryFn: () => fetchCommentsForMarket(marketId, userId),
    // You can add options such as `staleTime`, `cacheTime`, etc., here if needed
  })
}
