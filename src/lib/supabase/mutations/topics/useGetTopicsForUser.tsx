// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import { ITopic } from "@/lib/supabase/types";

async function fetchTopicsForUser(userId: string): Promise<ITopic[]> {
  const { data, error } = await supabase
    .from("user_topics")
    .select(
      `
      topics (
        *
      )
    `
    ) // Assumes that your join table user_topics has a Foreign Key reference to topics
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  // We're only interested in the topics part of the response since user_topics might fetch more info
  return data.map((entry) => entry.topics);
};

export function useGetTopicsForUser(userId: string) {
  return useQuery({
    queryKey: ["topics", userId],
    queryFn: () => fetchTopicsForUser(userId),
    enabled: !!userId, // This query will only run if userId is truthy
  });
};