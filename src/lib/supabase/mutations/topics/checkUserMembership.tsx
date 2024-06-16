// useCheckUserTopicMembership.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

const checkUserTopicMembership = async (
  userId: string,
  topicId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("user_topics")
    .select("user_id, topic_id")
    .eq("user_id", userId)
    .eq("topic_id", topicId)
    .maybeSingle(); // This method returns null if no rows are found, or a single row without throwing an error.

  if (error) throw new Error(error.message);

  return !!data; // Returns true if there's an entry, false otherwise.
};

export const useCheckUserTopicMembership = (
  userId: string,
  topicId: string
) => {
  return useQuery({
    queryKey: ["userTopicMembership", userId, topicId],
    queryFn: () => checkUserTopicMembership(userId, topicId),
    enabled: !!userId && !!topicId, // This query will only run if both userId and topicId are provided and truthy.
  });
};
