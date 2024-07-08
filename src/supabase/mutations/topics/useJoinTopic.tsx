// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

async function joinTopic({ userId, topicId }: {
  userId: string;
  topicId: string;
}) {
  const { data, error } = await supabase.rpc("join_topic", {
    user_id: userId,
    topic_id: topicId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export function useJoinTopic() {
  return useMutation({
    mutationFn: joinTopic,
    onError: (error) => {
      console.error("Error joining topic:", error);
    },
    onSuccess: () => {
      console.log("Successfully joined topic");
    },
  });
};
