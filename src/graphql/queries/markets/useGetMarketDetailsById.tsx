//@ts-nocheck

import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IMarket } from "@/supabase/types";

export async function fetchMarketByIds(marketIds: string): Promise<IMarket[]> {
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
    .eq("id", marketId)
    .single();

  if (error) {
    console.error("Fetch Markets By IDs Error:", error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}

export const useGetMarketDetailsById = (marketId: string) => {
  return useReactQuery({
    queryKey: ["marketDetails", marketId],
    queryFn: () => fetchMarketsByIds(marketId),
    enabled: marketId, // This query will only run if marketIds array is not empty
  });
};
