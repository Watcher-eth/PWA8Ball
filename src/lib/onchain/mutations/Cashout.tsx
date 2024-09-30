// @ts-nocheck

import { useMutation } from "@tanstack/react-query"
import { type Address, getContract } from "viem"
import { SmartAccountClient } from "permissionless"

import { OutcomeTokenAbi } from "@/lib/onchain/generated"


import { rpcClient } from "@/lib/onchain/rpcClient"
import { EightBallConfig, EightBallStorageConfig } from "@/lib/onchain/generated"
import { RootOperatorAddress } from "@/constants/onchain"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"

async function cashoutPrediction(props: {
  preferYes: boolean
  option: string
  marketId: number
  userId: string
  client: SmartAccountClient
  address: Address
  ownedTokens: number
}) {
  console.log("Props", props.ownedTokens, props.preferYes)
  if (!props.marketId) {
    throw new Error("All fields must be provided")
  }
  try {
    const account = props.address
    const currentPairId = BigInt(props?.marketId)

    const marketPair = await rpcClient.readContract({
      address: EightBallStorageConfig.address[DEFAULT_CHAIN_ID],
      abi: EightBallStorageConfig.abi,
      args: [currentPairId],
      functionName: "getMarketPair",
    })

    const tokenAddy = !props.preferYes
      ? marketPair.yesToken
      : marketPair.noToken

    const outcomeToken = await getContract({
      abi: OutcomeTokenAbi,
      address: tokenAddy,
      client: { public: rpcClient, wallet: props?.client },
    })
    console.log("Approving token cashout outcome tokens")

    const hash1 = await outcomeToken.write.approve([
      EightBallConfig.address[DEFAULT_CHAIN_ID],
      BigInt(1000000 * props.ownedTokens),
    ])

    const contract = getContract({
      abi: EightBallConfig.abi,
      address: EightBallConfig.address[DEFAULT_CHAIN_ID],
      client: { public: rpcClient, wallet: props.client },
    })

    const preferYesNum = !props.preferYes ? 1 : 0
    console.log("ownedTokens", props?.ownedTokens)
    const hash = await contract.write.cashOut(
      [
        BigInt(props.ownedTokens),
        preferYesNum,
        BigInt(props.marketId),
        RootOperatorAddress[DEFAULT_CHAIN_ID],
      ],
      {}
    )

    //TODO: Update to cashed out
    console.log("hash", hash)

    console.log("Cashed out")
  } catch (error) {
    console.error("Error during cashout", error)
    throw error
  }
}

export const useCashout = () => {
  return useMutation({
    mutationFn: cashoutPrediction,
    onSuccess: () => {
      console.log("Cashed out successfully")
    },
    onError: (error) => {
      console.error("Error cashing out", error)
    },
  })
}
