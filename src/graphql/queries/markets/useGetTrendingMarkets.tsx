import { useApiEndpoint } from "@/graphql/useApiEndpoint";

export function useGetTrendingMarkets(topicId?: number) {
  const endpoint = `/markets/trending/${topicId ?? 0}?limit=15&hours=24`;

  const { data, isValidating } = useApiEndpoint(endpoint);

  const loading = isValidating && !data;

  return { data, loading };
}
