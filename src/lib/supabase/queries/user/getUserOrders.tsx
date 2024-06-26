// @ts-nocheck
export interface IOrder {
  id: number;
  sender: string;
  amount: number;
  price: number;
  option: number;
}

export interface IOrderWithMarket extends IOrder {
  market: {
    id: number;
    title: string;
    question: string;
    image?: string;
  };
}

// useGetOrdersForUser.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

const fetchOrdersForUser = async (userAddress: string) => {
  const { data, error } = await supabase.rpc("get_orders_with_market", {
    user_address: userAddress,
  });

  if (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useGetOrdersForUser = (userAddress: string) => {
  return useQuery({
    queryKey: ["userOrders", userAddress],
    queryFn: () => fetchOrdersForUser(userAddress),
    enabled: !!userAddress, // This query will only run if userAddress is truthy
  });
};
