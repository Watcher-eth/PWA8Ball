import { useState } from "react";

import { useUserStore } from "@/lib/stores/UserStore";
import { usePredictV2 } from "@/lib/onchain/mutations/PredictV2";

import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

import { useClientAddress } from "@/hooks/wallet/useClientAddress";

export function useExecutePrediction() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user: userCon } = useUserStore();
  const { mutate: predictV2 } = usePredictV2();
  const { client, address } = useClientAddress();

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

    try {
      //   if (smartAccountReady) { you dont need smart account ready in order to use EoA
      if (!address) {
        throw new Error("Address is required");
      }

      predictV2({
        client,
        address,
        userId: userCon?.external_auth_provider_user_id!,
        marketId,
        amount: Number(amount.toFixed(4)) * 1000000,
        preferYes: Number(option) === 1 ? false : true,
        option: options[Number(option) - 1],
        isBuy: true,
      });

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        toast.success("Prediction successful!", {
          icon: <CheckCircle height={"15px"} />,
          style: {
            backgroundColor: "rgba(21, 21, 21, 0.75)",
            backdropFilter: "blur(20px)",
            color: "white",
            border: "0px",
          },
        });
      }, 3500);
      //   }
    } catch (error) {
      console.error("Failed to make prediction:", error);
      toast.error("Failed to make prediction!");
      setLoading(false);
    }
  }

  return { executePrediction, loading, success };
}
