// useGetAllTopics.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { ITopic } from "@/supabase/types";

async function fetchAllTopics(): Promise<ITopic[]> {
  const { data, error } = await supabase.from("topics").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export function useGetAllTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: fetchAllTopics,
  });
};
