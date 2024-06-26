// @ts-nocheck

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check, Loader } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useBoostMarket2 } from "@/lib/onchain/mutations/BoostV2";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { useRouter } from "next/router";

const ConfirmButton = ({ onComplete, buttonText = "Confirm", id }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();
  const { smartAccountReady, smartAccountClient, smartAccountAddress, eoa } =
    useSmartAccount();
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
      console.log("User id", userCon);
      try {
        boostV2({
          userId: userCon?.external_auth_provider_user_id!,
          marketId: id,
          amount: 1000000,
          client: smartAccountClient,
          address: smartAccountAddress,
        });

        setTimeout(() => {
          router.push({
            pathname: `/lp`,
          });
        }, 4500);
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
      className="relative w-full h-12 bg-[#212121] overflow-hidden flex items-center justify-center"
      style={{
        borderRadius: "24px",
        padding: "1px",
        cursor: "pointer",
        border: "none",
      }}
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

export default ConfirmButton;
