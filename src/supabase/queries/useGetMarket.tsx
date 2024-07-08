// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IMarket } from "@/supabase/types";

const fetchMarket = async (marketId: string): Promise<IMarket> => {
  const { data, error } = await supabase
    .from<IMarket>("markets")
    .select("*")
    .eq("id", marketId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export function useGetMarket(marketId: string) {
  return useQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchMarket(marketId),
  });
};
