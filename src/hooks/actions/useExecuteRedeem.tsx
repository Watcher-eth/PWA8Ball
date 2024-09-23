// @ts-nocheck
import { useState } from "react"
import { useRouter } from "next/router"
import { useRedeem } from "@/lib/onchain/mutations/Redeem"
import { toast } from "sonner"
import { Check, CheckCircle } from "lucide-react"
import { useClientAddress } from "@/hooks/wallet/useClientAddress"
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance"

export function useExecuteRedeem() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { mutate: redeem, isPending, isSuccess, isError } = useRedeem()
  const { client, address } = useClientAddress()
  const { approveToken } = useEightBallApproval()
  const userBalance = useUserUsdcBalance()

  async function executeRedeem({
    amount,
    option,
    marketId,
  }: {
    amount: string
    option: number
    marketId: string
  }) {
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

      await redeem({
        marketId,
        preferYes,
        client,
        address,
      })

      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
        toast(
          <div className="w-full rounded-full bg-[#101010] text-base px-3 pr-4 text-white flex flex-row items-center p-2">
            <div className="p-0.5 py-1.5 rounded-full bg-[rgba(52, 199, 89, 0.15)] mr-2 flex justify-center items-center">
              <Check strokeWidth={4.5} className="text-[#34C759] h-[0.9rem]" />
            </div>
            Redeemed successfully!
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
      }, 3500)
    } catch (error) {
      console.error("Failed to redeem:", error)
      toast.error("Failed to redeem!")
      setLoading(false)
    }
  }

  return {
    executeRedeem,
    loading: isPending,
    success: isSuccess,
    error: isError,
  }
}
