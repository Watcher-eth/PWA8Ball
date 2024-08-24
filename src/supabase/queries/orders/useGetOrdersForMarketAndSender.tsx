// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

export interface IOrder {
  id: number;
  sender: string;
  amount: number;
  price: number;
}



const fetchOrdersForMarketAndSender = async (
  marketId: number, // Here marketId maps to 'id' in your table
  senderAddress: string
): Promise<IOrder[]> => {
  const { data, error } = await supabase
    .from("Orders")
    .select("id, sender, amount, price")
    .eq("id", 0) // Example hardcoded ID that exists
    .eq("sender", "0xe11B2060d222A4D62c1142FEc4ADf2cB42766115"); // Example hardcoded address

  if (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export function useGetOrdersForMarketAndSender(
  marketId: number,
  senderAddress: string
) {
  return useQuery<IOrder[], Error>({
    queryKey: ["orders", marketId, senderAddress],
    queryFn: () => fetchOrdersForMarketAndSender(marketId, senderAddress),
    enabled: !!marketId && !!senderAddress, // Ensures query runs only if both params are provided
  });
};
