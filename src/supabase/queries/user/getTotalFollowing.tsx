import { supabase } from "@/supabase/supabaseClient"
import { useQuery } from "@tanstack/react-query"

const fetchTotalFollowing = async (userId: string) => {
  const { data, error, count } = await supabase
    .from("user_follows")
    .select("*", { count: "exact" })
    .eq("follower_id", userId)

  if (error) {
    console.error("Error fetching following count:", error.message)
    throw new Error(error.message)
  }

  return count
}

export const useGetTotalFollowing = (userId: string) => {
  return useQuery({
    queryKey: ["totalFollowing", userId],
    queryFn: () => fetchTotalFollowing(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}
