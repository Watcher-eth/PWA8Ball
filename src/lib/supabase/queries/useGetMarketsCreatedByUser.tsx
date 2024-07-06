// useGetMarketsCreatedByUser.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { IMarket } from "../types";

// This function fetches markets created by a specific user
const fetchMarketsCreatedByUser = async (
  userId: string
): Promise<IMarket[]> => {
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("created_by", userId);

  if (error) throw new Error(error.message);
  return data;
};

// React Query hook to fetch and store the state of the markets created by a specific user
export const useGetMarketsCreatedByUser = (userId: string) => {
  return useQuery({
    queryKey: ["marketsCreatedBy", userId],
    queryFn: () => fetchMarketsCreatedByUser(userId),
    enabled: !!userId, // This query will only run if userId is truthy
  });
};
