// @ts-nocheck

import {useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
import { CashoutOverview } from "./overview";
import { CashOutWarningScreen } from "./warning";
import { CashoutConfirmScrreen } from "./confirm";
import { OutcomeButton } from "@/components/buttons/OutcomeButton";

export function CashoutModal(props: {
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
              if (!user?.walletaddress) props.handleOpen();
            }}
            whileTap={{ scale: 0.93 }}
            className="mt-[1rem]"
          >
            <OutcomeButton
              text={props?.text}
              multiplier={props?.multiplier}
              option={props?.option}
            />
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-[2rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl   w-screen relative"
          >
            <AnimatePresence>
              {step === 1 && <CashoutOverview />}
              {step === 2 && <CashOutWarningScreen />}
              {step === 3 && (
                <CashoutConfirmScrreen
                  option={props?.option}
                  options={props?.options}
                  image={props?.image}
                  question={props?.question}
                  title={props?.text}
                  setStep={setStep}
                  id={props?.marketId}
                  odds={props.odds}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
