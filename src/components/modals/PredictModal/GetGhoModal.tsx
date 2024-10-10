// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowDown, CalendarPlus, CreditCard, Repeat } from "lucide-react";
import { showToast } from "@/utils/Toasts/showToast";

export function GetGhoModal({
  setStep,
  setVisible,
}: {
  setStep: (step: number) => void;
  setVisible: () => void;
}) {
  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  return (
    <motion.div
      key="step2"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-white text-[1.5rem] font-semibold mt-3 ">
        Fund your account
      </div>
      <div className="text-[lightgray] text-base text-[1.08rem] mb-2  ml-[-0.1rem]  font-medium ">
        You don't have enough funds. Please fund your account to continue.
      </div>
      {/* <div className="h-px w-full my-6 mb-4 bg-[#383838] mx-6 rounded-full" /> */}
      <LabeledSectionWithIcon
        title="Buy with Moonpay"
        description="Fund your wallet using your credit card or Apple/Google Pay"
        IconComponent={CreditCard}
        className="bg-purple-700"
        onClick={() => setVisible()}
      />
      <LabeledSectionWithIcon
        title="Bridge to Base"
        description="Swap ETH, Stablecoins or Matic for USDC using Uniswap"
        IconComponent={Repeat}
        className="bg-orange-400"
        onClick={() =>
          showToast({
            icon: (
              <CalendarPlus
                strokeWidth={3.1}
                className="text-white -mr-2 h-[1.1rem]"
              />
            ),
            message: "Bridging is coming soon!",
          })
        }
      />
      <LabeledSectionWithIcon
        title="Receive USDC"
        description="Receive USDC from one of your wallets to your Glimpse address"
        IconComponent={ArrowDown}
        className="bg-green-400"
        onClick={() => setStep(4)}
      />
    </motion.div>
  );
}

function LabeledSectionWithIcon({
  title,
  description,
  IconComponent,
  className,
  onClick,
}: {
  title: string;
  description: string;
  IconComponent: React.FC;
  className: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        flex mt-5 mb-2 max-w-full bg-[#151515] -ml-0.5  p-1 rounded-[1rem] border-[0.1rem] border-[#202020]
        active:scale-96 hover:scale-101 transition-all
      `}
    >
      <div
        className={`rounded-full mt-3  p-2 max-h-[2.65rem] ml-3 my-2 ${className}`}
      >
        {title === "Buy with Moonpay" ? (
          <img
            className="h-7 w-7 rounded-full"
            src="https://files.readme.io/e6aad6c-small-moonpay_symbol_wht.png"
          />
        ) : (
          <IconComponent size={25} strokeWidth={3} className="stroke-white " />
        )}
      </div>
      <div className=" flex flex-col space-y-[-0.15rem] font-bold mb-3 mt-2 mr-1 ml-3">
        <div className="text-white text-[1.1rem] font-bold">{title}</div>
        <div className="text-[lightgray]/90  text-base/4 max-w-[98%] text-sm">
          {description}
        </div>
      </div>
    </div>
  );
}
