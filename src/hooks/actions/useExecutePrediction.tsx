import { useState } from "react";

import { useUserStore } from "@/lib/stores/UserStore";
import { usePredictV2 } from "@/lib/onchain/mutations/PredictV2";

import { toast } from "sonner";
import { Check, CheckCircle } from "lucide-react";

import { useClientAddress } from "@/hooks/wallet/useClientAddress";
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval";
import { useReferralStore } from "@/lib/stores/ReferralStore";
import { useRouter } from "next/router";
import { getProfilePath } from "@/utils/urls";

export function useExecutePrediction() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const referralId = useReferralStore((state) => state.referralId);
  const router = useRouter();
  const { user: userCon } = useUserStore();
  const { mutate: predictV2, isError, isPending, isSuccess } = usePredictV2();
  const { client, address, walletType } = useClientAddress();
  const { approveToken, allowance } = useEightBallApproval();

  async function executePrediction({
    amount,
    option,
    marketId,
    options,
  }: {
    amount: number;
    option: number;
    marketId: number;
    options: any[];
  }) {
    setLoading(true);
    console.log({
      amount,
      option,
      marketId,
      options,
    });
    try {
      if (!address) {
        throw new Error("Address is required");
      }
      const biAmount = BigInt(Number(amount.toFixed(4)) * 1000000);
      if (
        (walletType === "smartwallet" && !allowance) ||
        allowance < biAmount
      ) {
        approveToken();
      }
      //TODO: Referall pass in once redeploy
      const res = predictV2({
        client,
        marketId,
        amount: biAmount,
        preferYes: Number(option) === 1 ? false : true,
      });
      console.log({ res });
      router?.prefetch(getProfilePath(userCon?.walletAddress!));
      setLoading(false);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
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
        );
      }, 8000);
      setTimeout(
        () => router.push(getProfilePath(userCon?.walletAddress!)),
        9000
      );
      //   }
    } catch (isError) {
      console.error("Failed to make prediction:", isError);
      toast.error("Failed to make prediction!");
      setLoading(false);
    }
  }

  return {
    executePrediction,
    loading: isPending,
    success: isSuccess,
    error: isError,
  };
}
