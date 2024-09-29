// @ts-nocheck
import { useState } from "react"
import { useRouter } from "next/router"
import { useUserStore } from "@/lib/stores/UserStore"
import { useCashout } from "@/lib/onchain/mutations/Cashout"
import { useClientAddress } from "@/hooks/wallet/useClientAddress"
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"

import { toast } from "sonner"

import { Check, CheckCircle } from "lucide-react"
import { getProfilePath } from "@/utils/urls"

export function useCashOutPrediction() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { approveToken } = useEightBallApproval()

  const { user: userCon } = useUserStore()
  const { mutate: cashOut, isPending, isSuccess, isError } = useCashout()
  const { client, address } = useClientAddress()

  async function cashOutPrediction({
    points,
    option,
    marketId,
    options,
  }: {
    points: number
    option: number
    marketId: number
    options: string[]
  }) {
    setLoading(true)
    try {


      approveToken()

      cashOut({
        client,
        address,
        userId: userCon?.external_auth_provider_user_id!,
        marketId: Number(marketId),
        amount: Number(points.toFixed(4)) * 1000000,
        preferYes: Number(option) === 1 ? false : true,
        option: options[Number(option) - 1],
        isBuy: true,
        ownedTokens: points,
      })

      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
        toast(
          <div className="w-full rounded-full bg-[#212121]/30 backdrop-blur-lg border-[0.1rem] border-[#212121]/20 text-base font-medium px-3 pr-4 text-white flex flex-row items-center p-2">
            <div className="p-0.5 py-1.5 rounded-full bg-[#4CAF50] mr-2 flex justify-center items-center">
              <Check strokeWidth={4.5} className="text-white h-[0.9rem]" />
            </div>
            Cashed out successfully!
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
      setTimeout(() => {
        router.push({
          // @ts-ignore
          pathname: getProfilePath(userCon?.walletAddress),
        })
      }, 6500)
    } catch (isError) {
      console.error("Failed to cash out:", isError)
      toast.error("Failed to cash out!")
      setLoading(false)
    }
  }

  return {
    cashOutPrediction,
    loading: isPending,
    success: isSuccess,
    error: isError,
  }
}
