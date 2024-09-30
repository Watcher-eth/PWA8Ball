import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { Check } from "lucide-react"

import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance"

import { txErrorHandlerWrapper } from "@/utils/txErrorHandler"
import { useWriteEightBallAddLiquidity } from "@/lib/onchain/generated"

import { LP_PATH } from "@/utils/urls"
import { showToast } from "@/utils/Toasts/showToast"

export function useExecuteBoost() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { approveToken, allowance } = useEightBallApproval()
  const userBalance = useUserUsdcBalance()
  const { writeContractAsync: writeAddLiquidity } = useWriteEightBallAddLiquidity()

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

    const hash = await writeAddLiquidity({
      args: [
        biAmount, // amount
        marketId, // marketId
      ]
    })

    showToast({
      message: "Boosted successfully!",
      icon: <Check strokeWidth={4.5} className="text-white h-[0.9rem]" />,
    })
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
