
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

const fetchOrderCountForUser = async (userAddress: string) => {
  const { data, error } = await supabase.rpc("count_orders_by_user", {
    user_address: userAddress,
  });

  if (error) {
    console.error("Error fetching order count:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useGetOrderCountForUser = (userAddress: string) => {
  return useQuery({
    queryKey: ["userOrderCount", userAddress],
    queryFn: () => fetchOrderCountForUser(userAddress),
    enabled: !!userAddress, // This query will only run if userAddress is truthy
  });
};
