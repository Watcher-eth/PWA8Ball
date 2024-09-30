// @ts-nocheck

import { useMutation } from "@tanstack/react-query"
import { WalletClient, getContract, Address } from "viem"
import { SmartAccountClient } from "permissionless"
import { rpcClient } from "@/lib/onchain/rpcClient"
import { EightBallConfig } from "@/lib/onchain/generated"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"

async function boostV2({
  amount,
  marketId,
  client,
}: {
  amount: bigint
  marketId: number
  client: SmartAccountClient
}) {
  if (!amount || !marketId) {
    throw new Error("All fields must be provided")
  }
  try {
    const contract = getContract({
      abi: EightBallConfig.abi,
      address: EightBallConfig.address[DEFAULT_CHAIN_ID],
      client: { public: rpcClient, wallet: client },
    })
    // Boost the market
    const hash = await contract.write.addLiquidity(
      [BigInt(amount), BigInt(marketId)],
      {}
    )
    return hash
    // console.log("hash", hash);
  } catch (error) {
    console.error("Error during market boost", error)
    console.log("Error", error)
    throw error // Rethrow the error after logging it
  }
}

export const useBoostMarket2 = () => {
  return useMutation({
    mutationFn: boostV2,
    onSuccess: () => {
      console.log("Market boosted successfully")
      // Invalidate and refetch relevant queries here, if necessary
    },
    onError: (error) => {
      console.error("Error boosting market", error)
    },
  })
}
