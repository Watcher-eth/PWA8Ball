// useSearchTopics.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

export interface ITopic {
  id: string;
  title: string;
  description: string;
  image?: string; // Marked as optional in case some topics might not have an image
}

const searchTopics = async (searchString: string): Promise<ITopic[]> => {
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .ilike("title", `%${searchString}%`) // Using ilike for case-insensitive search
    .or(`description.ilike.%${searchString}%`); // Search in description as well

  if (error) throw new Error(error.message);

  return data;
};

export const useSearchTopics = (searchString: string) => {
  return useQuery({
    queryKey: ["searchTopics", searchString],
    queryFn: () => searchTopics(searchString),
    enabled: !!searchString, // This query will only run if searchString is truthy
  });
};
