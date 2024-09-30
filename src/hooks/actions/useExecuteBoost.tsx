import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { getContract } from "viem"

import { useClientAddress } from "@/hooks/wallet/useClientAddress"
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance"
import { rpcClient } from "@/lib/onchain/rpcClient"
import { txErrorHandlerWrapper } from "@/utils/txErrorHandler"
import { EightBallConfig } from "@/lib/onchain/generated"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { LP_PATH } from "@/utils/urls"

export function useExecuteBoost() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { client, address } = useClientAddress()
  const { approveToken, allowance } = useEightBallApproval()
  const userBalance = useUserUsdcBalance()

  async function executeBoost({ id, amount }: { id: number; amount: number }) {
    setLoading(true)
    const marketId = BigInt(id)
    const biAmount = BigInt(Number(amount) * 1000000)
    const hasBalance = userBalance && userBalance > biAmount
    console.log("Compare", userBalance, biAmount)
    if (!hasBalance) {
      throw new Error("Insufficient balance to boost the market.")
    }


    if (!allowance || allowance < biAmount) {
      console.log("Approving token boost")
      await approveToken()
    }

    if (!amount || !marketId) {
      throw new Error("All fields must be provided")
    }

    const contract = getContract({
      abi: EightBallConfig.abi,
      address: EightBallConfig.address[DEFAULT_CHAIN_ID],
      client: { public: rpcClient, wallet: client },
    })

    const hash = await contract.write.addLiquidity(
      [
        biAmount, // amount
        marketId, // marketId
      ],
      {}
    )

    toast(
      <div className="w-full rounded-full bg-[#101010] text-base px-3 pr-4 text-white flex flex-row items-center p-2">
        <div className="p-0.5 py-1.5 rounded-full bg-[#4CAF50] mr-2 flex justify-center items-center">
          <Check strokeWidth={4.5} className="text-white h-[0.9rem]" />
        </div>
        Boosted successfully!
      </div>,
      {
        unstyled: true,
        classNames: {
          title: "text-red-400 text-2xl",
          description: "text-red-400",
          actionButton: "bg-zinc-400",
          cancelButton: "bg-orange-400",
          closeButton: "bg-lime-400",
        },
      }
    )
    setLoading(false)
    setSuccess(true)
    router.push(LP_PATH)
  }

  return {
    executeBoost: txErrorHandlerWrapper(executeBoost),
    loading,
    success,
  }
}
