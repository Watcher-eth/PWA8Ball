import { queryOptions } from "@tanstack/react-query";
import { getEightBallContract } from "../contracts/Eightball";

export const getMarketPairOptions = (marketId: number) =>
  queryOptions({
    queryKey: ["getMarketPair", marketId],
    queryFn: async () => {
      const contract = await getEightBallContract(); // Ensure this awaits the contract instance
      // Assuming getMarketPair is a read operation, adjust if it's a write operation
      const data = await contract.read.getMarketPair([marketId]);
      return data;
    },
    enabled: marketId !== undefined, // Ensures the query runs only if marketId is provided
  });
