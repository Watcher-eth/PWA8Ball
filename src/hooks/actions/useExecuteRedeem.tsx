import { useState } from "react"
import { useRouter } from "next/router"

import { toast } from "sonner"
import { Check, CheckCircle } from "lucide-react"

import { useWriteEightBallRedeem } from "@/lib/onchain/generated"

import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance"

import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { showToast } from "@/utils/Toasts/showToast"

export function useExecuteRedeem() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { approveToken } = useEightBallApproval()
  const userBalance = useUserUsdcBalance()
  const { writeContractAsync: writeRedeem } = useWriteEightBallRedeem()

  async function executeRedeem({
    amount,
    option,
    marketId,
  }: {
    amount: string
    option: number
    marketId: string
  }) {
    if (!marketId) {
      console.error( Error("All fields must be provided"))
    }
    setLoading(true)

    try {

      const userBalanceNum = Number(userBalance) / 1000000
      const desired = Number(amount)

      if (Number(userBalanceNum) <= desired) {
        router.push("/GetFundsModal")
        setLoading(false)
        return
      }

      approveToken()

      const preferYes = option === 1


      const hash = await writeRedeem({
        args: [BigInt(marketId)],
      })
      // Redeem position

      console.log("Redeemed", hash)

      setLoading(false)
      setSuccess(true)

      showToast({
        message: "Redeemed successfully!",
        icon: <Check strokeWidth={4.5} className="text-[#34C759] h-[0.9rem]" />,
      })
    } catch (error) {
      console.error("Failed to redeem:", error)
      toast.error("Failed to redeem!")
      setLoading(false)
    }
  }

  return {
    executeRedeem,
    loading,
    success,
  }
}
