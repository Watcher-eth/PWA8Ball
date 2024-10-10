// @ts-nocheck

import { DesktopCardModal } from "@/components/modals/DesktopCardModal";
import { GetGhoModal } from "@/components/modals/PredictModal/GetGhoModal";
import { OnrampStep } from "@/components/modals/PredictModal/OnrampStep";
import { useUserStore } from "@/lib/stores/UserStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

export function DesktopOnrampModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopCardModal
      dialogClassName="max-w-[35vw] xl:max-w-[28vw]  2xl:max-w-[23vw]"
      dialogContentClassName="max-w-[35vw] xl:max-w-[28vw]  2xl:max-w-[23vw]"
      cardClassName="max-w-[35vw] xl:max-w-[28vw]  2xl:max-w-[23vw]"
      cardContentClassName="bg-[#080808]/75 w-full backdrop-blur-lg max-w-[35vw] xl:max-w-[30vw] 2xl:max-w-[23vw]"
      content={<DesktopOnramp />}
    >
      {children}
    </DesktopCardModal>
  );
}

export function OnrampModal({
  children,
  open,
  onOpenChange,
  amount,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: () => void;
  amount?: number;
}) {
  return (
    <DesktopCardModal
      open={open}
      onOpenChange={onOpenChange}
      dialogClassName="max-w-[35vw] xl:max-w-[28vw]  2xl:max-w-[23vw]"
      dialogContentClassName="max-w-[35vw] xl:max-w-[28vw]  2xl:max-w-[23vw]"
      cardClassName="max-w-[35vw] xl:max-w-[28vw]  2xl:max-w-[23vw]"
      cardContentClassName="bg-[#080808]/75 w-full backdrop-blur-lg max-w-[35vw] xl:max-w-[30vw] 2xl:max-w-[23vw]"
      content={<DesktopOnramp amount={amount} />}
    >
      {children}
    </DesktopCardModal>
  );
}

function DesktopOnramp(props: { amount?: number }) {
  const [step, setStep] = useState(1);
  const { user } = useUserStore();
  const [visible, setVisible] = useState(false);
  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="bg-[#080808] rounded-3xl w-full max-w-[35vw] xl:max-w-[28vw]   2xl:max-w-[23vw] "
    >
      <MoonPayBuyWidget
        variant="overlay"
        baseCurrencyCode="usd"
        baseCurrencyAmount={String(props.amount) ?? "35"}
        defaultCurrencyCode="USDC"
        visible={visible}
        walletAddress={user?.walletAddress}
      />
      <AnimatePresence>
        {step === 1 && (
          <GetGhoModal
            setVisible={() => {
              setVisible(!visible);
            }}
            setStep={setStep}
            method={1}
          />
        )}
        {step === 2 && <OnrampStep setStep={setStep} method={2} />}
        {step === 3 && <OnrampStep setStep={setStep} method={3} />}
        {step === 4 && <OnrampStep setStep={setStep} method={4} />}
      </AnimatePresence>
    </motion.div>
  );
}
