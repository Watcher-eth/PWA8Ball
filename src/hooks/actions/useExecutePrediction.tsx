import { useState } from "react";
import { Address } from "viem";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Check } from "lucide-react";

import { useUserStore } from "@/lib/stores/UserStore";
import { useClientAddress } from "@/hooks/wallet/useClientAddress";
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval";
import { useReferralStore } from "@/lib/stores/ReferralStore";
import { getProfilePath } from "@/utils/urls";

import { ZERO_ADDRESS } from "@/constants/misc";
import { useWriteEightBallPredict } from "@/lib/onchain/generated";
import { RootOperatorAddress } from "@/constants/onchain";
import { DEFAULT_CHAIN_ID } from "@/constants/chains";
import { showToast } from "@/utils/Toasts/showToast";
import { useUsdcBalance } from "../wallet/useUsdcBalance";

export function useExecutePrediction() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const referralId = useReferralStore((state) => state.referralId);
  const router = useRouter();
  const { user: userCon } = useUserStore();
  const userBalance = useUsdcBalance({ address: userCon?.walletAddress });
  // const { client, address, walletType } = useClientAddress()
  const { approveToken, allowance } = useEightBallApproval();

  const { writeContractAsync: writePredict } = useWriteEightBallPredict();

  async function executePrediction({
    amount,
    option,
    marketId,
    options,
    referrer = ZERO_ADDRESS,
  }: {
    amount: number;
    option: number;
    marketId: number;
    options: any[];
    referrer?: Address;
  }) {
    setLoading(true);
    setError(null);
    console.log("predict params", {
      amount,
      option,
      marketId,
      options,
      referrer,
    });

    try {
      if (!amount || !marketId) {
        throw new Error("All fields must be provided");
      }

      const biAmount = BigInt(Number(amount.toFixed(4)) * 1000000);
      console.log({ userBalance, allowance, biAmount });

      if (!allowance || allowance < biAmount) {
        //   (walletType === "smartwallet" && !allowance) ||
        //   !allowance ||
        //   !(allowance >= biAmount)
        console.log("Approving token");
        await approveToken();
        console.log("Approved token");
      }

      const preferYes = Number(option) === 1 ? false : true;
      const preferYesNum = preferYes ? 1 : 0;

      const operatorAddress = RootOperatorAddress[DEFAULT_CHAIN_ID];

      const predictionParams = {
        desiredAmount: biAmount,
        preferYes: preferYesNum,
        marketId: BigInt(marketId),
        operator: operatorAddress,
        slippage: 990,
        referrer: referrer !== null ? referrer : ZERO_ADDRESS,
      };
      console.log("Predict params", predictionParams);

      // console.log("predictionParams", predictionParams)
      // console.log("predictionParamsArr", predictionParamsArr)
      console.log("referrer", referrer);
      // console.log("Args", predictionParams)
      const hash = await writePredict({
        args: [predictionParams],
      });

      console.log("hash", hash);

      router?.prefetch(getProfilePath(userCon?.walletAddress!));
      setSuccess(true);
      showToast({
        message: "Prediction successful!",
        icon: <Check strokeWidth={4.5} className="text-[#34C759] h-[0.9rem]" />,
      });
    } catch (err) {
      console.error("Failed to make prediction:", err);
      toast.error("Failed to make prediction!");
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
    }
    setLoading(false);
  }

  return {
    executePrediction,
    loading,
    success,
    error,
  };
}
