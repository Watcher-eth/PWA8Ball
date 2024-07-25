// @ts-nocheck

import { DesktopCardModal } from "@/components/Modals/DesktopCardModal";
import { GetGhoModal } from "@/components/Modals/PredictModal/GetGhoModal";
import { OnrampStep } from "@/components/Modals/PredictModal/OnrampStep";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function DesktopOnrampModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopCardModal
      cardContentClassName="bg-[#080808]/75 w-full backdrop-blur-lg"
      content={<DesktopOnramp />}
    >
      {children}
    </DesktopCardModal>
  );
}

function DesktopOnramp() {
  const [step, setStep] = useState(1);

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="bg-[#080808] -ml-6 rounded-3xl w-full "
    >
      <AnimatePresence>
        {step === 1 && <GetGhoModal setStep={setStep} method={1} />}
        {step === 2 && <OnrampStep setStep={setStep} method={2} />}
        {step === 3 && <OnrampStep setStep={setStep} method={3} />}
        {step === 4 && <OnrampStep setStep={setStep} method={4} />}
      </AnimatePresence>
    </motion.div>
  );
}
