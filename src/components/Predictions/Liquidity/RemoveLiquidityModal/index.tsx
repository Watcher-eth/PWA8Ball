// @ts-nocheck
import React, { useEffect } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { Overview } from "./Overview";
import { RemoveLPConfirmationScreen } from "./Confirm";

interface RemoveLPProps {
  children: ReactNode;
  onClose;
  image: string;
  title: string;
  amount;
  multiplier;
  id;
}

function RemoveLiquidityModal({
  isOpen,
  onClose,
  image,
  title,
  amount,
  multiplier,
  id,
  children,
}) {
  const [goal, setGoal] = React.useState(1);
  const [step, setStep] = React.useState(1);

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to the first step whenever the modal is opened
    }
  }, [isOpen]);

  return (
    <Drawer>
      <DrawerTrigger>
        <motion.div
          whileTap={{ scale: 0.93 }}
          whileHover={{ scale: 1.1 }}
          className="mt-[1rem]"
        >
          {children}
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="border-0 rounded-3xl self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="bg-[#171717] rounded-3xl ml-[4vw] mb-5 w-[92vw] relative"
        >
          <AnimatePresence>
            {step === 1 && (
              <Overview
                title={title}
                image={image}
                amount={amount}
                multiplier={multiplier}
                setStep={setStep}
              />
            )}
            {step === 2 && (
              <RemoveLPConfirmationScreen
                title={title}
                image={image}
                points={amount}
                multiplier={multiplier}
                setStep={setStep}
                id={id}
                onClose={onClose}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}

export default RemoveLiquidityModal;
