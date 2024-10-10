import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ConfirmButton } from "./ConfirmButton";
import { BoostInfoRow } from "./DesktopBoostModal";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { ReceiveGHO } from "../PredictModal/OnrampStep";
import { GetGhoModal } from "../PredictModal/GetGhoModal";
import dynamic from "next/dynamic";

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

export function MobileBoostModal({
  children,
  image,
  id,
}: {
  children: React.ReactNode;
  image: string;
  id: string;
}) {
  const [amount, setAmount] = useState<number>();
  const [step, setStep] = useState(0);

  const [visible, setVisible] = useState(false);
  const { user } = useUserStore();
  return (
    <div>
      {visible && (
        <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount={amount ? String(amount / 10) : "35"}
          defaultCurrencyCode="USDC"
          visible={visible}
          walletAddress={user?.walletAddress}
        />
      )}
      <Drawer>
        <DrawerTrigger className="w-full">{children}</DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          {step === 0 && (
            <div className="flex flex-col p-4 pb-8 ">
              <img
                className="h-14 w-14 object-cover rounded-full"
                src={image}
              />
              <div className="text-white text-[1.5rem] font-semibold mt-4 ">
                Boost and earn rewards
              </div>
              <div className="text-[lightgray] text-[0.95rem] font-medium mb-3  ">
                Boost this market to earn extra cred and trading fees. The more
                popular a prediction gets the more fees you receive.
              </div>
              <div className="h-px w-full bg-[#212121] mt-2 mb-5" />
              <BoostInfoRow label="Minimum Boost" content="$10.00" />
              <BoostInfoRow
                label="Fee Rewards Rate"
                content={
                  <div className="text-white font-medium text-base px-2 py-1 rounded-md bg-[#FF0050]">
                    0.5%
                  </div>
                }
              />
              <BoostInfoRow label="Cred Bonus" content="150 Cred" />
              <Input
                onChange={(e) => setAmount(Number(e.target.value))}
                className=" my-5 border border-[#212121] rounded-md p-6 bg-[#151515] font-medium px-3 text-base"
                placeholder="Amount"
                type="number"
              />
              <ConfirmButton
                id={id}
                onComplete={() => {}}
                amount={amount}
                setStep={setStep}
              />
            </div>
          )}
          {step === 4 && (
            <div className="p-5">
              <ReceiveGHO setStep={setStep} />
            </div>
          )}
          {step === 2 && (
            <div className="p-5">
              <GetGhoModal setVisible={setVisible} setStep={setStep} />
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
