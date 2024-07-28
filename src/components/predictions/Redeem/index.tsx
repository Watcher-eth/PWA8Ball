// @ts-nocheck

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { AnimatePresence, motion } from "framer-motion";

import { useVotingStore } from "@/lib/stores/VotingStore";

import { useUserStore } from "@/lib/stores/UserStore";


import { RedeemOverview } from "./RedeemOverview";
import { CashoutConfirmScrreen } from "../Cashout/CashoutConfirmScreen";
import { OutcomeButton } from "@/components/buttons/OutcomeButton";

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
          <div
            onClick={() => {
              if (!user?.walletaddress) {
                handleOpen()
              }
            }}
            className="mt-4 active:scale-93"
          >
            <OutcomeButton
              text={text}
              multiplier={multiplier}
              option={option}
            />
          </div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-[2rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl   w-screen relative"
          >
            <AnimatePresence>
              {step === 1 && <RedeemOverview />}
              {step === 2 && <CashoutConfirmScrreen />}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
