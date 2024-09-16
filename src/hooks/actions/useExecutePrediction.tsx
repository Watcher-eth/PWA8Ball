import { useState } from "react"
import { SmartAccountClient } from "permissionless"
import { Address, getContract, WalletClient } from "viem"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { Check } from "lucide-react"

import { rpcClient } from "@/lib/onchain/rpcClient"
import {
  ROOT_OPERATOR_ADDRESS,
  BASE_SEPOLIA_EIGHTBALL_ADDRESS,
} from "@/constants/onchain"
import { useUserStore } from "@/lib/stores/UserStore"
import { useClientAddress } from "@/hooks/wallet/useClientAddress"
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"
import { useReferralStore } from "@/lib/stores/ReferralStore"
import { getProfilePath } from "@/utils/urls"

import { ZERO_ADDRESS } from "@/constants/misc"
import { baseSepolia } from "viem/chains"
import { EightBallAbi } from "@/lib/onchain/generated"

export function useExecutePrediction() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const referralId = useReferralStore((state) => state.referralId)
  const router = useRouter()
  const { user: userCon } = useUserStore()
  const { client, address, walletType } = useClientAddress()
  const { approveToken, allowance } = useEightBallApproval()

  async function executePrediction({
    amount,
    option,
    marketId,
    options,
    referrer = ZERO_ADDRESS,
  }: {
    amount: number
    option: number
    marketId: number
    options: any[]
    referrer?: Address
  }) {
    setLoading(true)
    setError(null)
    console.log({ amount, option, marketId, options })

    try {
      if (!address) {
        throw new Error("Address is required")
      }
      if (!amount || !marketId) {
        throw new Error("All fields must be provided")
      }

      const biAmount = BigInt(Number(amount.toFixed(4)) * 1000000)
      console.log({ allowance, biAmount })
      if (
        (walletType === "smartwallet" && !allowance) ||
        !allowance ||
        !(allowance >= biAmount)
      ) {
        console.log("Approving token")
        await approveToken()
        console.log("Approved token")
      }
      console.log({
        client,
        marketId,
        amount: biAmount,
        preferYes: Number(option) === 1 ? false : true,
      })

      const preferYes = Number(option) === 1 ? false : true
      const preferYesNum = preferYes ? 1 : 0
      const contract = getContract({
        abi: EightBallAbi,
        address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
        client: { public: rpcClient, wallet: client },
      })

      console.log("Predict params", {
        preferYes: preferYesNum,
        marketId: BigInt(marketId),
        operator: ROOT_OPERATOR_ADDRESS,
        slippage: 990,
        referrer: referrer,
      })

      const predictionParams = {
        desiredAmount: biAmount,
        preferYes: preferYesNum,
        marketId: BigInt(marketId),
        operator: ROOT_OPERATOR_ADDRESS,
        slippage: 990,
        referrer: referrer,
      }
      // const predictionParamsArr = [
      //   biAmount,
      //   preferYesNum,
      //   BigInt(marketId),
      //   ROOT_OPERATOR_ADDRESS,
      //   990,
      //   referrer,
      // ]

      // console.log("predictionParams", predictionParams)
      // console.log("predictionParamsArr", predictionParamsArr)
      console.log("referrer", referrer)
      // console.log("Args", predictionParams)
      const hash = await contract.write.predict([predictionParams], {})
      console.log("hash", hash)

      router?.prefetch(getProfilePath(userCon?.walletAddress!))
      setSuccess(true)
      toast(
        <div className="w-full rounded-full bg-[#101010] text-base px-3 pr-4 text-white flex flex-row items-center p-2">
          <div className="p-0.5 py-1.5 rounded-full bg-[#4CAF50] mr-2 flex justify-center items-center">
            <Check strokeWidth={4.5} className="text-white h-[0.9rem]" />
          </div>
          Prediction successful
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
    } catch (err) {
      console.error("Failed to make prediction:", err)
      toast.error("Failed to make prediction!")
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    }
    setLoading(false)
  }

  return {
    executePrediction,
    loading,
    success,
    error,
  }
}
