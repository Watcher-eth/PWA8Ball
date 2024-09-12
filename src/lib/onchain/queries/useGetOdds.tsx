// @ts-nocheck

import { useQuery } from "@tanstack/react-query"
import { rpcClient } from "@/lib/onchain/rpcClient"
import { EightballV1ABI } from "../contracts/Eightball"
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain"
import { EightBallAbi } from "../generated"

export const useGetOdds = (marketId: number) => {
  return useQuery({
    queryKey: ["getOdds", marketId],
    queryFn: async () => {
      console.log("marketId", marketId)

      try {
        const odds = await rpcClient.readContract({
          address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
          abi: EightBallAbi,
          args: [BigInt(marketId)],
          functionName: "getOdds",
        })
        console.log("Odds: Yes =", odds[0], "No =", odds[1])

        // Assuming the smart contract returns odds scaled by 100, adjust them:
        return {
          yesOdds: Number(odds[0]) / 100,
          noOdds: Number(odds[1]) / 100,
        }
      } catch (error) {
        console.error("Error fetching odds:", error)
        throw new Error("Error fetching odds")
      }
    },
    enabled: marketId != null, // Only run this query if marketId is provided
  })
}
