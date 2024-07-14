// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IUserWithBet } from "@/supabase/types";
// types.ts


export async function fetchUsersByMarketId(
  marketId: number
): Promise<IUserWithBet[]> {
  const { data, error } = await supabase
    .from("predictions")
    .select(
      `
          amount,
          option,
          users (
            external_auth_provider_user_id,
            name,
            liquiditypoints,
            rewardpoints,
            pfp,
            walletaddress
          )
        `
    )
    .eq("market_id", marketId);

  if (error) throw new Error(error.message);

  // Create a Map to aggregate the amounts for each user
  const userMap = new Map<string, IUserWithBet>();

  data.forEach((item) => {
    const userId = item.users.external_auth_provider_user_id;
    if (userMap.has(userId)) {
      // If the user already exists in the map, aggregate the amounts
      const existingUser = userMap.get(userId);
      if (existingUser) {
        existingUser.amount += item.amount;
      }
    } else {
      // If the user does not exist in the map, add them
      userMap.set(userId, {
        external_auth_provider_user_id:
          item.users.external_auth_provider_user_id,
        name: item.users.name,
        liquiditypoints: item.users.liquiditypoints,
        rewardpoints: item.users.rewardpoints,
        pfp: item.users.pfp,
        amount: item.amount,
        option: item.option.name ? item.option.name : item.option,
        walletaddress: item.users.walletaddress,
      });
    }
  });

  // Convert the Map values to an array and limit the results to 10
  return Array.from(userMap.values()).slice(0, 10);
};
// React Query hook to fetch and store the state of users by market id
export const useGetUsersByMarketId = (marketId: number) => {
  return useQuery({
    queryKey: ["usersByMarket", marketId],
    queryFn: () => fetchUsersByMarketId(marketId),
    enabled: !!marketId, // This query will only run if marketId is truthy
  });
};
