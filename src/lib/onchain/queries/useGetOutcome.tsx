// @ts-nocheck
import { getEightBallContract } from "../contracts/Eightball";
import { useUpdateMarketOutcome } from "@/supabase/mutations/useUpdateMarketOutcome";

export const getOutcomeOptions = (marketId: number) => {
  const updateMarketOutcome = useUpdateMarketOutcome();

  return {
    queryKey: ["getOutcome", marketId],
    queryFn: async () => {
      if (marketId === undefined) {
        return { isResolved: false, outcome: null };
      }

      const contract = await getEightBallContract();
      const { isResolved, outcome } = await contract.read.getMarketPair(
        marketId
      );

      // After getting the outcome from the contract, update the database
      if (isResolved) {
        updateMarketOutcome.mutate(
          {
            marketId,
            isResolved,
            outcome,
          },
          {
            onSuccess: () => {
              // Optionally refetch or invalidate other queries that depend on this data
            },
          }
        );
      }

      return { isResolved, outcome };
    },
    enabled: marketId !== undefined, // Ensures the query runs only if marketId is provided
  };
};

// To use this hook
/*
const { data, error, isLoading } = useQuery(getOutcomeOptions(marketId));
*/
