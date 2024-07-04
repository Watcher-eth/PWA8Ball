// @ts-nocheck

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  AtSign,
  BadgeDollarSign,
  Contact,
  CreditCard,
  MinusIcon,
  PlusIcon,
  Repeat,
  ShoppingBag,
  WalletCards,
  X,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BuyModal from "../BuyVotes/BuyModal";
import { SignUp } from "./SignUp";

export function LoginModal({ isOpen, onClose }) {
  const [goal, setGoal] = useState(1);
  const [step, setStep] = useState(1);

  function onClick(adjustment: number) {
    setGoal(Math.max(1, Math.min(15, goal + adjustment)));
  }
  const stepVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to the first step whenever the modal is opened
    }
  }, [isOpen]);

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="border-0 rounded-3xl self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="bg-[#171717] rounded-3xl ml-[4vw] mb-5 w-[92vw] relative"
        >
          <div className="flex mt-6 w-[86vw] items-center justify-between">
            {step === 1 && (
              <div className="text-white text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
                Log in to continue
              </div>
            )}
            {step === 2 && (
              <Avatar className="ml-6 h-10 w-10">
                <AvatarImage src="https://github.com/lens-protocol/brand-kit/blob/074e865b5da4b2b80133915b15e82f9ba1f02881/01%20Logo/PNG/@2x/Icon-Green_@2x.png?raw=true" />
              </Avatar>
            )}
            {step === 3 && (
              <ShoppingBag
                size={37}
                className="ml-6 stroke-gray-400"
                strokeWidth={2}
              />
            )}
            {step === 4 && (
              <Repeat
                size={35}
                className="ml-6 stroke-gray-400"
                strokeWidth={3}
              />
            )}
            {step === 6 && (
              <AtSign
                size={35}
                className="ml-6 stroke-gray-400"
                strokeWidth={3}
              />
            )}
            <DrawerClose>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="p-2 left-6 rounded-full self-start bg-[#282828]"
              >
                <X size={17} className="stroke-[lightgray]" strokeWidth={5} />
              </motion.div>
            </DrawerClose>
          </div>
          <AnimatePresence>
            {step === 1 && <SignUp setStep={setStep} />}
            {step === 4 && <BuyModal setStep={setStep} method={1} />}
            {step === 5 && <BuyModal setStep={setStep} method={2} />}
            {step === 6 && <SignUp setStep={setStep} />}
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}
