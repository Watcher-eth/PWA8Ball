import { useApiEndpoint } from "@/graphql/useApiEndpoint"

export function useGetGlobalLeaderboard() {
  const { data, isLoading } = useApiEndpoint("/leaderboard")

  return { data: data, isLoading }
}
