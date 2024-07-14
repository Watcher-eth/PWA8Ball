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

import ProposeAnswer from "./Propose";
import SubmitProof from "./Proof";
import { RedeemOverview } from "./RedeemOverview";
import { CashoutConfirmScrreen } from "../Cashout/confirm";
import { OutcomeButton } from "@/components/buttons/OutcomeButton";

export function RedeemModal(props: {
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
              if (!user?.walletaddress) props.handleOpen();
            }}
            className="mt-[1rem] active:scale-93"
          >
            <OutcomeButton
              text={props?.text}
              multiplier={props?.multiplier}
              option={props?.option}
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
