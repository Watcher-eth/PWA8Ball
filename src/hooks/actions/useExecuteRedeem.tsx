// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/lib/stores/UserStore";
import { useRedeem } from "@/lib/onchain/mutations/Redeem";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useClientAddress } from "@/hooks/wallet/useClientAddress";

export function useExecuteRedeem() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { user: userCon } = useUserStore();
  const { mutate: redeem } = useRedeem();
  const { client, address } = useClientAddress();

  async function executeRedeem({
    amount,
    option,
    marketId,
  }: {
    amount: string;
    option: number;
    marketId: string;
  }) {
    setLoading(true);

    try {
      if (!address) {
        throw new Error("Address is required");
      }

      const userBalance = Number(userCon.balance) / 1000000;
      const desired = Number(amount);

      if (Number(userBalance) <= desired) {
        router.push("/GetFundsModal");
        setLoading(false);
        return;
      }

      const preferYes = option === 1;

      await redeem({
        marketId,
        preferYes,
        client,
        address,
      });

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        toast.success("Redeem successful!", {
          icon: <CheckCircle height="15px" />,
          style: {
            backgroundColor: "rgba(21, 21, 21, 0.75)",
            backdropFilter: "blur(20px)",
            color: "white",
            border: "0px",
          },
        });
      }, 3500);
    } catch (error) {
      console.error("Failed to redeem:", error);
      toast.error("Failed to redeem!");
      setLoading(false);
    }
  }

  return { executeRedeem, loading, success };
}