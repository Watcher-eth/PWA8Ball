// @ts-nocheck

import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { Check, Loader } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useBoostMarket2 } from "@/lib/onchain/mutations/BoostV2";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { toast } from "sonner";

export const ConfirmButton = ({ onComplete, buttonText = "Confirm", id }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const {
    smartAccountReady,
    smartAccountClient,
    smartAccountAddress,
    eoa,
    eoaClient,
  } = useSmartAccount();
  const router = useRouter();
  const { mutate: boostV2, isSuccess } = useBoostMarket2();
  const { user: userCon } = useUserStore();

  const handleBoost = async () => {
    // Check Balance of user
    const userBalance = Number(userCon?.balance) / 1000000;
    const hasBalance = userBalance > BigInt(15);

    if (!hasBalance) {
      alert("Insufficient balance to boost the market.");
      return;
    }
    if (hasBalance && smartAccountAddress) {
      try {
        if (userCon?.walletType === "smartwallet")
          boostV2({
            userId: userCon?.external_auth_provider_user_id!,
            marketId: id,
            amount: 1000000,
            client: smartAccountClient,
            address: smartAccountAddress,
          });

        if (userCon?.walletType === "eoa")
          boostV2({
            userId: userCon?.external_auth_provider_user_id!,
            marketId: id,
            amount: 1000000,
            client: eoaClient,
            address: eoa,
          });

        toast.success("Boosted successfully!", {
          icon: <CheckCircle />,
          style: { backgroundColor: "#5ACE5A", color: "white" },
        });
        setTimeout(() => {
          router.push({
            pathname: `/lp`,
          });
        }, 8500);
      } catch (error) {
        console.error("Failed to boost market:", error);
        alert("Failed to boost market!");
      }
    }
  };

  const handleClick = () => {
    setIsLoading(true);
    controls.start({
      width: "100%",
      transition: { duration: 0.5 },
    });

    handleBoost()
      .then(() => {
        setIsComplete(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <motion.button
      className="relative w-full rounded-full h-[3.2rem] bg-[#151515] border border-[#212121] shadow-md overflow-hidden flex items-center justify-center p-px cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#FF0050]"
        animate={controls}
        style={{
          width: isComplete ? "100%" : "0%",
          borderRadius: "24px",
        }}
      />
      <span className="relative z-10 text-lg font-bold text-white">
        {isLoading ? (
          <Loader color="lightgray" strokeWidth={3} className="animate-spin" />
        ) : isComplete ? (
          <Check className="text-white" />
        ) : (
          buttonText
        )}
      </span>
    </motion.button>
  );
};
