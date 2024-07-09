// @ts-nocheck

import React, { ReactNode, useEffect, useState } from "react";
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
import CashOutWarningScreen from "./warning";
import { CashoutConfirmScrreen } from "./confirm";

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
  const [step, setStep] = React.useState(1);

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
            {props?.option === 0 && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="active:bg-[#FF0050] hover:bg-[#FF0050] bg-[#FF0050] text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl w-[42vw]">
                  <div style={{ fontSize: props?.text?.length < 6 ? 22 : 18 }}>
                    {props?.text}{" "}
                  </div>
                  <div
                    style={{
                      marginLeft: "0.2rem",
                      fontSize: "0.81rem",
                      color: "rgba(250, 250, 250, 0.8)",
                      fontWeight: 500,
                      alignSelf: "flex-end",
                      marginBottom: 2,
                    }}
                  >
                    {props?.multiplier}%
                  </div>
                </Button>
              </motion.div>
            )}
            {props?.option === 1 && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="active:bg-[#0050FF] hover:bg-[#0050FF] bg-[#0050FF] text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl w-[42vw]">
                  <div style={{ fontSize: props?.text?.length < 6 ? 22 : 18 }}>
                    {" "}
                    {props?.text}
                  </div>
                  <div
                    style={{
                      marginLeft: "0.2rem",
                      fontSize: "0.81rem",
                      color: "rgba(250, 250, 250, 0.8)",
                      fontWeight: 500,
                      alignSelf: "flex-end",
                      marginBottom: 2,
                    }}
                  >
                    {props?.multiplier}%
                  </div>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-[2rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl   w-[100vw] relative"
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
