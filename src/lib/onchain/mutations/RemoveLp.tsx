// @ts-nocheck

import { useMutation } from "@tanstack/react-query"

import { type Address, getContract } from "viem"
import { SmartAccountClient } from "permissionless"

import {
  BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  BASE_SEPOLIA_STORAGE_ADDRESS,
} from "@/constants/onchain"
import { rpcClient } from "@/lib/onchain/rpcClient"
import {
  EightBallAbi,
  EightBallStorageAbi,
  EightBallStorageAddress,
  PairV1Abi,
} from "@/lib/onchain/generated"



export const useRemoveLp = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  async function removeLp({
    userId,
    marketId,
    client,
    address,
  }: {
    userId: string
    marketId: number
    client: SmartAccountClient
    address: Address
  }) {
    if (!marketId) {
      throw new Error("All fields must be provided")
    }
    setLoading(true)
    try {

      const account = address
      const currentPairId = BigInt(marketId)

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
        client: { public: client, wallet: client },
      })

      const hash = await contract.write.removeLiquidity([
        liquidityTokens,
        currentPairId,
      ])

      console.log("hash", hash)
      setSuccess(true)
    } catch (error) {
      console.error("Error during market boost", error)
      throw error
    }
    setLoading(false)
  }
  return { removeLp, loading, success, error: false }
}
