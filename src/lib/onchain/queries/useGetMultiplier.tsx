import { useQuery } from "@tanstack/react-query";
import { rpcClient } from "../Viem";
import { EightBallAddress, EightballV1ABI } from "../contracts/Eightball";

export const useGetMultiplier = (marketId: number, tokenAddress: string) => {
  return useQuery<number | null>({
    queryKey: ["getMultiplier", marketId, tokenAddress],
    queryFn: async () => {
      console.log("marketId", marketId);
      console.log("tokenAddress", tokenAddress);

      try {
        const multiplier = await rpcClient.readContract({
          address: EightBallAddress,
          abi: EightballV1ABI,
          args: [BigInt(marketId), tokenAddress],
          functionName: "getMultiplier",
        });
        // Scale down the multiplier by dividing by 100
        const adjustedMultiplier = Number(multiplier) / 100;
        return adjustedMultiplier;
      } catch (error) {
        throw new Error("Error fetching multiplier");
      }
    },
    enabled: marketId != null && !!tokenAddress, // Only run this query if both marketId and tokenAddress are provided
  });
};
