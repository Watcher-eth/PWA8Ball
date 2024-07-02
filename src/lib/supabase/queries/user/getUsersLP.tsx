// @ts-nocheck
export interface ILP {
  id: number;
  amount: number;
  marketId: number;
  user: string;
  timestamp: string; // or Date if you plan to parse it as a date
  image: string;
  title: string;
}

// useGetLPForUser.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

const fetchLPForUser = async (userAddress: string): Promise<ILP[]> => {
  const { data, error } = await supabase.rpc("get_lp_by_user", {
    user_address: userAddress,
  });

  if (error) {
    console.error("Error fetching LP data:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useGetLPForUser = (userAddress: string) => {
  return useQuery({
    queryKey: ["userLP", userAddress],
    queryFn: () => fetchLPForUser(userAddress),
    enabled: !!userAddress, // This query will only run if userAddress is truthy
  });
};
