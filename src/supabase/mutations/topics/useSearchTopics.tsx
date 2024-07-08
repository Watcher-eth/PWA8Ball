// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { ITopic } from "@/supabase/types";

async function searchTopics(searchString: string): Promise<ITopic[]> {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .ilike("title", `%${searchString}%`) // Using ilike for case-insensitive search
    .or(`description.ilike.%${searchString}%`); // Search in description as well

  if (error) throw new Error(error.message);

  return data;
};

export function useSearchTopics(searchString: string) {
  return useQuery({
    queryKey: ["searchTopics", searchString],
    queryFn: () => searchTopics(searchString),
    enabled: !!searchString, // This query will only run if searchString is truthy
  });
};
