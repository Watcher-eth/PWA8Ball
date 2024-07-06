// @ts-nocheck

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";

import { useVotingStore } from "@/lib/stores/VotingStore";

import { useUserStore } from "@/lib/stores/UserStore";

import ProposeAnswer from "./Propose";
import SubmitProof from "./Proof";
import { RedeemOverview } from "./RedeemOverview";
import { CashoutConfirmScreen } from "../Cashout/CashoutConfirmScreen";

export function RedeemModal({
  text,
  option,
  multiplier,
  image,
  question,
  options,
  marketId,
  odds,
  handleOpen,
}: {
  text: string;
  option: number;
  multiplier: number;
  image: string;
  question: string;
  options: string[];
  marketId: string;
  odds: number;
  handleOpen: () => void;
}) {
  const [step, setStep] = useState(1);

  const { user } = useUserStore();

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <motion.div
            onClick={() => {
              if (!user?.walletaddress) {
                handleOpen();
              }
            }}
            whileTap={{ scale: 0.93 }}
            className="mt-4"
          >
            {option === 0 && (
              <RedeemOptionButton
                className="active:bg-[#FF0050] hover:bg-[#FF0050] bg-[#FF0050]"
                text={text}
                multiplier={multiplier}
              />
            )}
            {option === 1 && (
              <RedeemOptionButton
                className="active:bg-[#0050FF] hover:bg-[#0050FF] bg-[#0050FF]"
                text={text}
                multiplier={multiplier}
              />
            )}
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-[2rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl w-[100vw] relative"
          >
            <AnimatePresence>
              {step === 1 && <RedeemOverview />}
              {step === 2 && <CashoutConfirmScreen />}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}


function RedeemOptionButton({ text, multiplier, className }: {
  text: string,
  multiplier: number,
  className: string
}) {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        className={`
        text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl w-[42vw]
        ${className}
      `}
      >
        <div
          className={text?.length < 6 ? "text-[22px]" : "text-[18px]"}
        >
          {text}{" "}
        </div>
        <div
          className={`
            ml-1 mb-0.5 text-[0.81rem] text-[rgba(250,250,250,0.8)]
            font-medium
          `}
        >
          {multiplier}%
        </div>
      </Button>
    </motion.div>
  );
}