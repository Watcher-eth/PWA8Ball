// @ts-nocheck

import { useState } from "react";
import { DesktopCardModal } from "../DesktopCardModal";
import { Overview } from "@/components/Predictions/Liquidity/RemoveLiquidityModal/Overview";
import { RemoveLPConfirmationScreen } from "@/components/Predictions/Liquidity/RemoveLiquidityModal/Confirm";

export function DesktopLPModal({
  children,
  id,
  title,
  image,
  amount,
}: {
  children: React.ReactNode;
  id: string;
  image: string;
  title: string;
  amount: string;
}) {
  const [step, setStep] = useState<number>(2);
  return (
    <DesktopCardModal
      dialogContentClassName="w-[25vw]"
      cardContentClassName="w-[25vw] min-h-[50vh]"
      content={
        step === 1 ? (
          <Overview
            title={title}
            image={image}
            amount={amount}
            setStep={setStep}
            isDesktop={true}
            totalPot={amount / 10 ** 6}
          />
        ) : (
          <RemoveLPConfirmationScreen
            title={title}
            image={image}
            points={amount}
            setStep={setStep}
            id={id}
            isDesktop={true}
          />
        )
      }
    >
      {children}
    </DesktopCardModal>
  );
}
