import { useState } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/lib/stores/UserStore";
import { useCashout } from "@/lib/onchain/mutations/Cashout";
import { useClientAddress } from "@/hooks/wallet/useClientAddress";

import { toast } from "sonner";

import { CheckCircle } from "lucide-react";
import { getProfilePath } from "@/utils/urls";



export function useCashOutPrediction() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user: userCon } = useUserStore();
  const { mutate: cashOut } = useCashout();
  const { client, address } = useClientAddress();

  async function cashOutPrediction({
    points,
    option,
    marketId,
    options,
  }: {
    points: number;
    option: number;
    marketId: number;
    options: string[];
  }) {
    setLoading(true);

    try {
      if (!address) {
        throw new Error("Address is required");
      }

      cashOut({
        client,
        address,
        userId: userCon?.external_auth_provider_user_id!,
        marketId: Number(marketId),
        amount: Number(points.toFixed(4)) * 1000000,
        preferYes: Number(option) === 1 ? false : true,
        option: options[Number(option) - 1],
        isBuy: true,
      });

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        toast.success("Cashed out successfully!", {
          icon: <CheckCircle height={"15px"} />,
          style: {
            backgroundColor: "rgba(21, 21, 21, 0.75)",
            backdropFilter: "blur(20px)",
            color: "white",
            border: "0px",
          },
        });
      }, 3500);
      setTimeout(() => {
        router.push({
          // @ts-ignore
          pathname: getProfilePath(userCon?.external_auth_provider_user_id),
        });
      }, 6500);
    } catch (error) {
      console.error("Failed to cash out:", error);
      toast.error("Failed to cash out!");
      setLoading(false);
    }
  }

  return { cashOutPrediction, loading, success };
}
