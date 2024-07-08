// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const fetchUsersForMarket = async (marketId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from("unique_user_ids_per_market") // This is the view you created
    .select("user_id")
    .eq("market_id", marketId);

  if (error) throw new Error(error.message);
  return data.map((entry) => entry.user_id);
};

export function useGetUsersForMarket(marketId: string) {
  return useQuery({
    queryKey: ["users", marketId],
    queryFn: () => fetchUsersForMarket(marketId),
    enabled: !!marketId, // This query will only run if marketId is truthy
  });
};
