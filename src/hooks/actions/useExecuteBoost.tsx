import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

import { useUserStore } from "@/lib/stores/UserStore";
import { useBoostMarket2 } from "@/lib/onchain/mutations/BoostV2";
import { useClientAddress } from "@/hooks/wallet/useClientAddress";
import { useEightBallApproval } from "@/hooks/actions/useEightBallApproval";
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance";
import { trackBoostMarket } from "@/lib/events/StandardEvents";

export function useExecuteBoost() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { user: userCon } = useUserStore();
  const { mutate: boostV2 } = useBoostMarket2();
  const { client, address } = useClientAddress();
  const { approveToken } = useEightBallApproval();
  const userBalance = useUserUsdcBalance();

  async function executeBoost({ id, amount }: { id: number; amount: number }) {
    setLoading(true);

    try {
      const userBalanceNum = Number(userBalance) / 1000000;
      const hasBalance = userBalanceNum > amount;
      console.log("Compare", userBalanceNum, amount);
      if (!hasBalance) {
        throw new Error("Insufficient balance to boost the market.");
      }

      if (!address) {
        throw new Error("Address is required");
      }

      approveToken();

      boostV2({
        userId: userCon?.external_auth_provider_user_id!,
        marketId: id,
        amount: amount * 1000000,
        client,
        address,
      });

      toast.success("Boosted successfully!", {
        icon: <CheckCircle />,
        style: { backgroundColor: "#5ACE5A", color: "white" },
      });

      trackBoostMarket(String(id), amount * 1000000, "pwa");
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        router.push({ pathname: `/lp` });
      }, 8500);
    } catch (error) {
      console.error("Failed to boost market:", error);
      toast.error("Failed to boost market!");
      setLoading(false);
    }
  }

  return { executeBoost, loading, success };
}
