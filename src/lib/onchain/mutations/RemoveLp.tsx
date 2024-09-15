import { useState } from "react"
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
  useReadEightBallStorageGetMarketPair,
  useReadPairV1BalanceOf,
} from "@/lib/onchain/generated"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"



export function useRemoveLp({ marketId } :{marketId: number | bigint}) {
  const chainId = DEFAULT_CHAIN_ID
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const currentPairId = BigInt(marketId)
  const {data: marketPair } = useReadEightBallStorageGetMarketPair({
    chainId,
    args: [currentPairId],
  })

  // const { data: liquidityTokens } = useReadPairV1BalanceOf({
  //   chainId,
  //   address: marketPair?.liquidityPool,
  //   args: [account],
  // })


  async function removeLp({
    userId,
    client,
    address,
  }: {
    userId: string
    client: SmartAccountClient
    address: Address
  }) {
    if (!marketPair) {
      throw new Error("Market pair not found")
    }

    setLoading(true)
    try {

      const account = address
      const currentPairId = BigInt(marketId)


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
