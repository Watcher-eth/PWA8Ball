// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";

interface IHighestOrderOption {
  highest_option: number;
  highest_amount: number;
}

const fetchHighestOrderOption = async (
  userAddress: string,
  marketId: string
): Promise<IHighestOrderOption | null> => {
  // Execute the stored function using a raw SQL query
  const { data, error } = await supabase.rpc("get_highest_order_option", {
    user_address: userAddress,
    market_id: marketId,
  });

  if (error) {
    console.error("Fetch Highest Order Option Error:", error.message);
    throw new Error(error.message);
  }
  // Since the function returns a single row, handle the response appropriately
  return data?.[0] ?? null;
};

export const useGetHighestOrderOption = (userAddress: string, marketId: string) => {
  return useQuery({
    queryKey: ["highestOrderOption", userAddress, marketId],
    queryFn: () => fetchHighestOrderOption(userAddress, marketId),
    enabled: !!userAddress && !!marketId, // This query will only run if both userAddress and marketId are truthy
  });
};
