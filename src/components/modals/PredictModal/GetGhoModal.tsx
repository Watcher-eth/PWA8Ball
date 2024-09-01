// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowDown, CreditCard, Repeat } from "lucide-react";

export function GetGhoModal({ setStep }: { setStep: (step: number) => void }) {
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
      <div className="text-white text-[1.5rem] font-semibold mt-3 mx-[1.3rem]">
        Prop up your account
      </div>
      <div className="text-[lightgray] text-base/5 text-[1.08rem] m-[-0.1rem]  font-[500] mx-[1.3rem]">
        You don't have enough funds. Please fund your account to continue.
      </div>
      <div className="h-px w-full my-6 mb-4 bg-[#383838] mx-6 rounded-full" />
      <LabeledSectionWithIcon
        title="Buy"
        description="Fund your wallet using your credit card or Apple/Google Pay"
        IconComponent={CreditCard}
        className="bg-orange-400"
        onClick={() => setStep(3)}
      />
      <LabeledSectionWithIcon
        title="Swap"
        description="Swap ETH, Stablecoins or Matic for USDC using Uniswap"
        IconComponent={Repeat}
        className="bg-pink-400"
        onClick={() => setStep(2)}
      />
      <LabeledSectionWithIcon
        title="Receive"
        description="Receive USDC from one of your wallets to your Glimpse address"
        IconComponent={ArrowDown}
        className="bg-green-400"
        onClick={() => setStep(4)}
      />
      <div className="flex items-center mt-5 max-w-full space-x-4  mb-6 m-4 mx-6 justify-between mx-2">
        <Button
          onClick={() => setStep(1)}
          className={`
            active:bg-[#D9D9D9] hover:bg-[#D9D9D9] text-[#1D1D1D] bg-[#D9D9D9] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-1/2
            hover:scale-110 active:scale-95 transition-all
          `}
        >
          Back
        </Button>
        <Button
          onClick={() => setStep(2 + 1)}
          className={`
            active:bg-[#1D1D1D] hover:bg-[#1D1D1D] text-[#D9D9D9] bg-[#1D1D1D] text-[1.15rem] font-bold h-[2.85rem] rounded-full w-1/2
            hover:scale-110 active:scale-95 transition-all
          `}
        >
          Continue
        </Button>
      </div>
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
        flex mt-5 mb-2 max-w-full bg-[#1D1D1D] mx-6 rounded-md
        active:scale-96 hover:scale-101 transition-all
      `}
    >
      <div
        className={`rounded-full mt-3  p-2 max-h-[2.65rem] ml-3 my-2 ${className}`}
      >
        <IconComponent size={25} strokeWidth={3} className="stroke-white  " />
      </div>
      <div className=" flex flex-col space-y-[-0.15rem] font-bold mb-3 mt-2 mr-1 ml-3">
        <div className="text-white text-[1.1rem] font-bold">{title}</div>
        <div className="text-[#989898]  text-base/4 max-w-[98%] text-[0.9rem]">
          {description}
        </div>
      </div>
    </div>
  );
}
