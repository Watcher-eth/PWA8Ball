// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { IMarket } from "../types";

const fetchMarket = async (marketId: string): Promise<IMarket> => {
  const { data, error } = await supabase
    .from<IMarket>("markets")
    .select("*")
    .eq("id", marketId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useGetMarket = (marketId: string) => {
  return useQuery({
    queryKey: ["market", marketId],
    queryFn: () => fetchMarket(marketId),
  });
};
