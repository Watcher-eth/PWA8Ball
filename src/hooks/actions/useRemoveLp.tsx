import { useState } from "react"
import { type Address, getContract } from "viem"
import {
  EightBallConfig,
  PairV1Abi,
  useReadEightBallStorageGetMarketPair,
  useReadPairV1BalanceOf,
} from "@/lib/onchain/generated"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { useClientAddress } from "@/hooks/wallet/useClientAddress"


export function useRemoveLp({ marketId } :{marketId: number | bigint}) {
  const chainId = DEFAULT_CHAIN_ID
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const currentPairId = BigInt(marketId)
  const { client, address } = useClientAddress()

  const { data: marketPair } = useReadEightBallStorageGetMarketPair({
    chainId,
    args: [currentPairId],
  })

  const { data: liquidityTokens } = useReadPairV1BalanceOf({
    chainId,
    address: marketPair?.liquidityPool,
    args: [address],
  })

  async function removeLp() {
    if (!marketPair) {
      throw new Error("Market pair not found")
    }
    if (!liquidityTokens) {
      throw new Error("Liquidity tokens not found")
    }

    setLoading(true)
    try {

      // const account = address
      const currentPairId = BigInt(marketId)


      // const liquidityTokens = await rpcClient.readContract({
      //   address: marketPair.liquidityPool,
      //   abi: PairV1Abi,
      //   args: [account],
      //   functionName: "balanceOf",
      // })

      const contract = getContract({
        abi: EightBallConfig.abi,
        address: EightBallConfig.address[DEFAULT_CHAIN_ID],
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
