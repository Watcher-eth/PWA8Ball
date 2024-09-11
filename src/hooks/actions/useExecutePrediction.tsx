import { useState } from "react"
import { SmartAccountClient } from "permissionless"
import { getContract } from "viem"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { Check } from "lucide-react"

import { EightballV1ABI } from "@/lib/onchain/contracts/Eightball"
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

async function predict({
  amount,
  preferYes,
  marketId,
  client,
}: {
  amount: bigint
  preferYes: boolean
  marketId: number
  client: SmartAccountClient
}) {
  if (!amount || !marketId) {
    throw new Error("All fields must be provided")
  }

  try {
    const preferYesNum = preferYes ? 1 : 0
    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: rpcClient, wallet: client },
    })

    const contractArgs = [
      BigInt(amount),
      preferYesNum,
      BigInt(marketId),
      ROOT_OPERATOR_ADDRESS,
      990,
    ]
    console.log("Args", contractArgs)

    const hash = await contract.write.predict(contractArgs)

    console.log("Prediction hash", hash)
    return hash
  } catch (error) {
    console.error("Error during prediction", error)
    throw error
  }
}

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
  }: {
    amount: number
    option: number
    marketId: number
    options: any[]
  }) {
    setLoading(true)
    setError(null)
    console.log({ amount, option, marketId, options })

    try {
      if (!address) {
        throw new Error("Address is required")
      }

      const biAmount = BigInt(Number(amount.toFixed(4)) * 1000000)
      console.log({ allowance, biAmount })
      if (
        (walletType === "smartwallet" && !allowance) ||
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
      await predict({
        client,
        marketId,
        amount: biAmount,
        preferYes: Number(option) === 1 ? false : true,
      })

      router?.prefetch(getProfilePath(userCon?.walletAddress!))
      setLoading(false)
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

      // setTimeout(
      //   () => router.push(getProfilePath(userCon?.walletAddress!)),
      //   9000
      // );
    } catch (err) {
      console.error("Failed to make prediction:", err)
      toast.error("Failed to make prediction!")
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setLoading(false)
    }
  }

  return {
    executePrediction,
    loading,
    success,
    error,
  }
}