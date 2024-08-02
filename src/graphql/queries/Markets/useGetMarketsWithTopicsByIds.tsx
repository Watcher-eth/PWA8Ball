//@ts-nocheck

import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IMarket } from "@/supabase/types";

interface IMarketWithTopic extends IMarket {
  topic: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}

export async function fetchMarketsByIds(
  marketIds: string[]
): Promise<IMarketWithTopic[]> {
  const { data, error } = await supabase
    .from("markets")
    .select(
      `
      id,
      title,
      question,
      image,
      options,
      topics (
        id,
        title,
        description,
        image
      )
      `
    )
    .in("id", marketIds);

  if (error) {
    console.error("Fetch Markets By IDs Error:", error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}

export const useGetMarketsWithTopicsByIds = (marketIds: string[]) => {
  return useReactQuery({
    queryKey: ["markets", marketIds],
    queryFn: () => fetchMarketsByIds(marketIds),
    enabled: marketIds.length > 0, // This query will only run if marketIds array is not empty
  });
};
