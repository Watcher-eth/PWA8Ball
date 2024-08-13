import { useApiEndpoint } from "@/graphql/useApiEndpoint"

export function useGetGlobalLeaderboard() {
  const { data } = useApiEndpoint("/leaderboard");
  console.log(data)
  
  return data;
}