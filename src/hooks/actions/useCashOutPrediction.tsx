
import { useState } from "react"
import { useRouter } from "next/router"

import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval"

import { toast } from "sonner"

import { Check, CheckCircle } from "lucide-react"
import { getProfilePath } from "@/utils/urls"

import { useReadEightBallStorageGetMarketPair, useWriteEightBallCashOut } from "@/lib/onchain/generated"

import { EightBallConfig } from "@/lib/onchain/generated"
import { RootOperatorAddress } from "@/constants/onchain"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { showToast } from "@/utils/Toasts/showToast"
import { useTokenContractApproval } from "@/hooks/actions/useTokenContractApproval"
import { useAccount } from "wagmi"


export function useCashOutPrediction({
  marketId,
  option,
  amount,
}: {
  marketId: number
  option: number
  amount: number
}) {
  const chainId = DEFAULT_CHAIN_ID
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const biMarketId = BigInt(marketId)
  const biAmount = BigInt(Number(amount.toFixed(4)) * 1000000)
  // const { approveToken, allowance } = useEightBallApproval()
  const { address } = useAccount()
  const { data: marketPair } = useReadEightBallStorageGetMarketPair({
    chainId,
    args: [biMarketId],
  })
  const {
    writeContractAsync: writeCashOut,
    isPending,
    isSuccess,
    isError
  } = useWriteEightBallCashOut()
  const preferYes = Number(option) !== 1
  const preferYesNum = !preferYes ? 1 : 0
  const tokenAddress = !preferYes ? marketPair?.yesToken : marketPair?.noToken


  const { approveToken, allowance } = useTokenContractApproval({
    tokenAddress: tokenAddress,
    contractAddress: EightBallConfig.address[DEFAULT_CHAIN_ID],
  })



  async function cashOutPrediction() {
    if (!address) {
      console.log("Wallet needs to be connected")
      return
    }
    setLoading(true)
    try {

      if (!allowance || allowance < biAmount) {
        console.log("Approving token cashout")

        await approveToken()
      }
      const hash = await writeCashOut({
        args: [
          biAmount,
          preferYesNum,
          biMarketId,
          RootOperatorAddress[DEFAULT_CHAIN_ID],
        ],
      })
      showToast({
        icon: <Check strokeWidth={4.5} className="text-[#34C759] h-[0.95rem]" />,
        message: "Cashed out successfully!",
      })

      setTimeout(() => {
        router.push(getProfilePath(address))
      }, 6500)
    } catch (isError) {
      console.error("Failed to cash out:", isError)
      toast.error("Failed to cash out!")

    }
    setLoading(false)
  }

  return {
    cashOutPrediction,
    loading,
    success: isSuccess,
    error: isError,
  }
}
