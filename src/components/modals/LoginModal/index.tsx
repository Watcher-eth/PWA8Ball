// @ts-nocheck

import { useEffect, useState } from "react";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  AtSign,
  Repeat,
  ShoppingBag,
  WalletCards,
  X,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { OnrampStep } from "../PredictModal/OnrampStep";
import { SignUp } from "./SignUp";

export function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to the first step whenever the modal is opened
    }
    console.log("open", isOpen);
  }, [isOpen]);
  console.log("isOpen", isOpen);
  return (
    <Drawer open={isOpen}>
      <DrawerContent className="border-0 bg-[transparent] rounded-3xl self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="bg-[#121212] rounded-3xl ml-[4vw] mb-5 w-[92vw] relative"
        >
          <div className="flex mt-6 w-[86vw] items-center justify-between">
            {step === 1 && (
              <div className="text-white text-[1.5rem] font-semibold mt-3 mx-[1.65rem]">
                Sign in to Glimpse
              </div>
            )}
            {step === 2 && (
              <Avatar className="ml-6 size-10">
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
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="p-2 left-6 rounded-full self-start bg-[#282828]"
              >
                <X size={17} className="stroke-[lightgray]" strokeWidth={5} />
              </motion.div>
            </DrawerClose>
          </div>
          <AnimatePresence>
            {step === 1 && <SignUp setStep={setStep} />}
            {step === 4 && <OnrampStep setStep={setStep} method={1} />}
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}
