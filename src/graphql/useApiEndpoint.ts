import { useSwr } from "@/hooks/useSwr";
import { GRAPH_ENDPOINT_URL } from "@/providers/GraphQlProvider";
export function useApiEndpoint(endpoint: string) {
  return useSwr(`${GRAPH_ENDPOINT_URL}${endpoint}`);
}