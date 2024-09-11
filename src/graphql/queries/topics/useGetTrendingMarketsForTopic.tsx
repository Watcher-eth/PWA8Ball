import { useApiEndpoint } from "@/graphql/useApiEndpoint"

export function useGetTrendingMarketsForTopic(topicId?: number) {
  const endpoint = `/markets/trending/${topicId ?? 0}?limit=15&hours=100`

  const { data, isValidating } = useApiEndpoint(endpoint)

  const loading = isValidating && !data

  return { data, loading }
}
