import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

import { useUserStore } from "@/lib/stores/UserStore";
import { useBoostMarket2 } from "@/lib/onchain/mutations/BoostV2";
import { useClientAddress } from "@/hooks/wallet/useClientAddress";

export function useExecuteBoost() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { user: userCon } = useUserStore();
  const { mutate: boostV2 } = useBoostMarket2();
  const { client, address } = useClientAddress();

  async function executeBoost({ id }: { id: number }) {
    setLoading(true);

    try {
      const userBalance = Number(userCon?.balance) / 1000000;
      const hasBalance = userBalance > 15;

      if (!hasBalance) {
        throw new Error("Insufficient balance to boost the market.");
      }

      if (!address) {
        throw new Error("Address is required");
      }

      boostV2({
        userId: userCon?.external_auth_provider_user_id!,
        marketId: id,
        amount: 1000000,
        client,
        address,
      });

      toast.success("Boosted successfully!", {
        icon: <CheckCircle />,
        style: { backgroundColor: "#5ACE5A", color: "white" },
      });

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
