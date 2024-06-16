// useGetTopic.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { ITopic } from "../types";

const fetchTopic = async (topicId: string): Promise<ITopic> => {
  const { data, error } = await supabase
    .from<ITopic>("topics")
    .select("*")
    .eq("id", topicId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useGetTopic = (topicId: string) => {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => fetchTopic(topicId),
  });
};
