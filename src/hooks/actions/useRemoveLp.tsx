import { useState } from "react"
import { type Address, getContract } from "viem"
import {
  useReadEightBallStorageGetMarketPair,
  useReadPairV1BalanceOf,
  useWriteEightBallRemoveLiquidity,
} from "@/lib/onchain/generated"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { useAccount } from "wagmi"


export function useRemoveLp({ marketId } : { marketId: number | bigint }) {
  const chainId = DEFAULT_CHAIN_ID
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const biMarketId = BigInt(marketId)
  const { address } = useAccount()

  const { data: marketPair } = useReadEightBallStorageGetMarketPair({
    chainId,
    args: [biMarketId],
  })

  const { data: liquidityTokens } = useReadPairV1BalanceOf({
    chainId,
    address: marketPair?.liquidityPool,
    args: [address!],
  })

  const {
    writeContractAsync: writeRemoveLiquidity
  } = useWriteEightBallRemoveLiquidity()

  async function removeLp() {
    if (!marketPair) {
      throw new Error("Market pair not found")
    }
    if (!liquidityTokens) {
      throw new Error("Liquidity tokens not found")
    }

    setLoading(true)
    try {
      const hash = await writeRemoveLiquidity({
        args: [liquidityTokens, biMarketId],
      })

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
