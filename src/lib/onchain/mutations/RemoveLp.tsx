// @ts-nocheck

import { useMutation } from "@tanstack/react-query"

import { EightballV1ABI } from "../contracts/Eightball"
import { type Address, getContract } from "viem"
import { SmartAccountClient } from "permissionless"
import { V2_PAIR_ABI } from "../contracts/V2Pair"
import { EightballStorageV1ABI } from "../contracts/EightballStorage"
import {
  BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  BASE_SEPOLIA_STORAGE_ADDRESS,
} from "@/constants/onchain"
import { rpcClient } from "../rpcClient"
import { EightBallAbi, EightBallStorageAbi, EightBallStorageAddress, PairV1Abi } from "../generated"

async function removeLp(props: {
  userId: string
  marketId: number
  client: SmartAccountClient
  address: Address
}) {
  if (!props.marketId) {
    throw new Error("All fields must be provided")
  }
  console.log("Props", props)
  try {
    const account = props.address
    const currentPairId = BigInt(props.marketId)

    const marketPair = await rpcClient.readContract({
      address: EightBallStorageAddress,
      abi: EightBallStorageAbi,
      args: [currentPairId],
      functionName: "getMarketPair",
    })

    const liquidityTokens = await rpcClient.readContract({
      address: marketPair.liquidityPool,
      abi: PairV1Abi,
      args: [account],
      functionName: "balanceOf",
    })

    const contract = getContract({
      abi: EightBallAbi,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: props.client, wallet: props.client },
    })

    const hash = await contract.write.removeLiquidity([
      liquidityTokens,
      currentPairId,
    ])

    console.log("hash", hash)
  } catch (error) {
    console.error("Error during market boost", error)
    throw error
  }
}

export const useRemoveLp = () => {
  return useMutation({
    mutationFn: removeLp,
    onSuccess: () => {
      console.log("Market boosted successfully")
    },
    onError: (error) => {
      console.error("Error boosting market", error)
    },
  })
}
