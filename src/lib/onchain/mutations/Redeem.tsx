// @ts-nocheck

import { useMutation } from "@tanstack/react-query"
import { WalletClient, getContract, Address } from "viem"
import { EightBallConfig } from "@/lib/onchain/generated"

import { DEFAULT_CHAIN_ID } from "@/constants/chains"

async function redeemPrediction(props: {
  marketId: number
  outcomeTokenAddress: Address
  userId: string
  client: WalletClient
  address: Address
}) {

  if (!props.userId || !props.marketId) {
    throw new Error("All fields must be provided")
  }
  try {
    const contract = getContract({
      abi: EightBallConfig.abi,
      address: EightBallConfig.address[DEFAULT_CHAIN_ID],
      client: { public: props.client, wallet: props.client },
    })

    // Redeem position
    const hash = await contract.write.redeem([BigInt(props.marketId)], {})
    console.log("Redeemed", hash)


  } catch (error) {
    console.error("Error during cashout", error)
    throw error
  }
}

export const useRedeem = () => {
  return useMutation({
    mutationFn: redeemPrediction,
    onSuccess: () => {
      console.log("Redeemed successfully")
    },
    onError: (error) => {
      console.error("Error redeeming", error)
    },
  })
}
