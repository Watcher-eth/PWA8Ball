// @ts-nocheck

import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  EightBallAddress,
  EightballV1ABI,
} from "../contracts/Eightball";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { useUpdateUSDCBalance } from "@/supabase/mutations/useUpdateUSDCBalance";

export const useGetMarketStake = (marketId: string) => {
  const { mutate: updateUSDCBalance } = useUpdateUSDCBalance();

  return useQuery<number | { isResolved: boolean; outcome: null }>({
    queryKey: ["getMarketStake", marketId],
    queryFn: async () => {
      if (marketId === undefined) {
        return { isResolved: false, outcome: null };
      }
      try {
        const marketPair = await rpcClient.readContract({
          address: EightBallAddress,
          abi: EightballV1ABI,
          args: [BigInt(marketId)],
          functionName: "marketPairs",
        });
        const id = Number(marketId);
        console.log("fetching stake", marketPair);
        // After getting the outcome from the contract, update the database
        if (marketPair) {
          updateUSDCBalance(
            {
              marketId: id,
              usdcBalance: Number(marketPair[6]),
            },
            {
              onSuccess: () => {
                // Optionally refetch or invalidate other queries that depend on this data
              },
            }
          );
          return Number(marketPair[6]);
        }
        console.log("Success");
        return Number(marketPair[6]);
      } catch (e) {
        console.log("error", e);
        throw new Error("Error fetching market stake");
      }
    },
    enabled: marketId !== undefined, // Ensures the query runs only if marketId is provided
  });
};
