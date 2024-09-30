import { useState } from "react"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { Check } from "lucide-react"

import { useClientAddress } from "@/hooks/wallet/useClientAddress"
import { useReferralStore } from "@/lib/stores/ReferralStore"

import { useWriteEightBallInitializeMarket } from "@/lib/onchain/generated"
import { RootOperatorAddress } from "@/constants/onchain"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { showToast } from "@/utils/Toasts/showToast"
import { useAccount } from "wagmi"

export function useInitializeMarket() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { address } = useAccount()
  const { writeContractAsync: writeInitializeMarket } =
    useWriteEightBallInitializeMarket()

  async function initializeMarket({
    topicId,
    outcomeA,
    outcomeB,
    title,
    question,
    initialProb,
  }: {
    topicId: number
    outcomeA: string
    outcomeB: string
    title: string
    question: string
    initialProb: number
  }) {
    if (!address) {
      toast.error("Please connect your wallet")
      return
    }
    setLoading(true)
    setError(null)
    const operatorAddress = RootOperatorAddress[DEFAULT_CHAIN_ID]
    const hash = await writeInitializeMarket({
      args: [
        operatorAddress,
        address!,
        BigInt(initialProb),
        {
          topicId,
          outcomeA,
          outcomeB,
          title,
          question,
        },
      ],
    })
    setSuccess(true)
    try {
      showToast({
        message: "Market Initialized",
        icon: <Check strokeWidth={4.5} className="text-[#34C759] h-[0.9rem]" />,
      })
    } catch (err) {
      console.error("Initialize market:", err)
      toast.error("Failed to initialize market")
    }
    setLoading(false)
  }

  return {
    initializeMarket,
    loading,
    success,
    error,
  }
}
