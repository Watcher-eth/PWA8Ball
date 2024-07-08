// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IMarket } from "@/supabase/types";

interface IMarketWithTopic extends IMarket {
  topic: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  outcomeA: number;
  outcomeB: number;
  usdcStake: number;
  liquidityUSDC: number;
}

const fetchMarketById = async (
  marketId: string,
  userId: string
): Promise<IMarketWithTopic | null> => {
  // Execute the stored function using a raw SQL query
  const { data, error } = await supabase.rpc("get_market_with_details", {
    market_id: marketId,
    user_external_auth_id: userId,
  });

  if (error) {
    console.error("Fetch Market By ID Error:", error.message);
    throw new Error(error.message);
  }
  // Since the function returns a set of 'markets', handle the response appropriately
  return data?.[0] ?? null; // Assuming the function returns an array, and you need the first item
};

export const useGetMarketById = (marketId: string, userId: string) => {
  return useQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchMarketById(marketId, userId),
    enabled: !!marketId, // This query will only run if marketId is truthy
  });
};
