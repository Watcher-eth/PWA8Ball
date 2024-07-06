// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";


async function leaveTopic({ userId, topicId }: {
  userId: string;
  topicId: string;
}) {
  const { data, error } = await supabase.rpc("leave_topic", {
    user_id: userId,
    topic_id: topicId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const useLeaveTopic = () => {
  return useMutation({
    mutationFn: leaveTopic,
    onError: (error) => {
      console.error("Error leaving topic:", error);
    },
    onSuccess: () => {
      console.log("Successfully left topic");
    },
  });
};
