// @ts-nocheck

import { useState } from "react";
import { DesktopCardModal } from "../DesktopCardModal";
import { Overview } from "@/components/predictions/Liquidity/RemoveLiquidityModal/Overview";
import { RemoveLPConfirmationScreen } from "@/components/predictions/Liquidity/RemoveLiquidityModal/Confirm";

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
  const [step, setStep] = useState<number>(1);
  return (
    <DesktopCardModal
      cardClassName="rounded-[1.5rem]"
      dialogContentClassName="w-full rounded-[1.5rem] xl:w-[30vw] p-2 "
      cardContentClassName=" min-h-[50vh] rounded-[1.5rem] p-2 bg-[#080808]"
      content={
        step === 1 ? (
          <Overview
            title={title}
            image={image}
            amount={amount}
            setStep={setStep}
            isDesktop={true}
            onClose={() => {}}
            totalPot={amount / 10 ** 6}
          />
        ) : (
          <RemoveLPConfirmationScreen
            title={title}
            image={image}
            points={amount}
            setStep={setStep}
            id={id}
            onClose={() => {}}
            isDesktop={true}
          />
        )
      }
    >
      {children}
    </DesktopCardModal>
  );
}