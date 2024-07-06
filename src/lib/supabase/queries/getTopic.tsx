// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import { ITopic } from "@/lib/supabase/types";

async function fetchTopic(topicId: string): Promise<ITopic> {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("id", topicId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export function useGetTopic(topicId: string) {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => fetchTopic(topicId),
  });
};
