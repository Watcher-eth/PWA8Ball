import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";

export interface IUser {
  internal_id: string;
  external_auth_provider_user_id: string;
  name: string;
  pfp: string;
}

async function fetchMembersForTopic(topicId: string): Promise<IUser[]> {
  const { data, error } = await supabase
    .from("user_topics")
    .select(
      `
        users (
          internal_id,
          external_auth_provider_user_id,
          name,
          pfp
        )
      `
    )
    .eq("topic_id", topicId)
    .limit(5); // Limit the number of users to 5

  if (error) throw new Error(error.message);

  // Flatten the structure to directly get user details
  return data.map((entry) => entry.users).flat();
};

export function useGetMembersForTopic(topicId: string) {
  return useQuery({
    queryKey: ["members", topicId],
    queryFn: () => fetchMembersForTopic(topicId),
    enabled: !!topicId, // This query will only run if topicId is truthy
  });
};
