import { useApiEndpoint } from "../useApiEndpoint";

export function useGetTopicLeaderboard(topicId: string) {
  const { data } = useApiEndpoint(`/leaderboard/topic/${topicId}`);
  return data;
}
