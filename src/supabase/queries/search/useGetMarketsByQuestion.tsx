// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const fetchMarketsByQuestion = async (searchString: string): Promise<any[]> => {
  const { data, error } = await supabase
    .from("markets") // Target the 'markets' table
    .select("*") // You can specify columns if needed
    .ilike("question", `%${searchString}%`); // Case-insensitive partial match

  if (error) throw new Error(error.message);
  return data;
};

export const useGetMarketsByQuestion = (searchString: string) => {
  return useQuery({
    queryKey: ["marketsByQuestion", searchString],
    queryFn: () => fetchMarketsByQuestion(searchString),
    enabled: !!searchString.trim(), // This query will only run if searchString is not empty or just whitespace
  });
};
