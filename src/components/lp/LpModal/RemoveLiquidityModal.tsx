// @ts-nocheck
import { useEffect, useState } from "react";
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

export function RemoveLiquidityModal({
  isOpen,
  onClose,
  image,
  title,
  amount,
  multiplier,
  id,
  refetch,
  children,
}) {
  const [goal, setGoal] = useState(1);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1); // Reset to the first step whenever the modal is opened
    }
  }, [isOpen]);

  return (
    <Drawer onOpenChange={setOpen}>
      <DrawerTrigger>
        <motion.div className="mt-4 hover:scale-110 active:scale-93 transition-all">
          {children}
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="border-0 bg-[#transparent] rounded-3xl self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="bg-[#101010] rounded-3xl  mb-2 w-full relative"
        >
          <AnimatePresence>
            {step === 1 && (
              <Overview
                title={title}
                image={image}
                amount={amount}
                multiplier={multiplier}
                setStep={setStep}
                totalPot={amount}
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
                refetch={refetch}
                onClose={() => setOpen(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}
