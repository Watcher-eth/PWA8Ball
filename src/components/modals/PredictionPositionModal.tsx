// @ts-nocheck
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { MobileMyBetModal } from "../common/Charts/MyBetModal.tsx";
import { CashoutOverview } from "../predictions/Cashout/CashoutOverview";
import { CashoutWarningScreen } from "../predictions/Cashout/CashoutWarningScreen";
import { CashoutConfirmScreen } from "../predictions/Cashout/CashoutConfirmScreen";

export function PredictionPositionModal({
  children,
  title,
  image,
  price,
  ownedAmount,
  options,
  percentage,
  betId,
  topic,
  icon,
  question,
  name,
  userId,
  option,
  optionNumber,
  isExternal,
  onClose,
  openCashout,
  handleReceipt,
}: {
  children: React.ReactNode;
  title: string;
  image: string;
  price: number;
  ownedAmount: number;
  options: string[];
  percentage: number;
  betId: string;
  topic: string;
  icon: string;
  question: string;
  name?: string;
  userId?: string;
  option?: number;
  optionNumber?: number;
  isExternal?: boolean;
  onClose: () => void;
  openCashout: () => void;
  handleReceipt: () => void;
}) {
  const [snap, setSnap] = useState<number | string | null>(
    `${window.innerHeight * 0.85}px`
  );
  const [step, setStep] = useState(1);

  return (
    <div>
      <Drawer
        onClose={() => {
          setStep(1);
          setSnap(`${window.innerHeight * 0.85}px`);
        }}
        snapPoints={[
          `${window.innerHeight * 0.83}px`,
          `${window.innerHeight * 1}px`,
        ]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <DrawerOverlay className="fixed inset-0 bg-black/40" />

        <DrawerTrigger>
          <div className="mt-4 hover:scale-101 active:scale-95 transition-all">
            {children}
          </div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            style={{
              width: step === 1 ? "100vw" : "95vw",
              alignSelf: "center",
              marginBottom: step !== 1 ? 15 : 0,
            }}
            className="bg-[#121212] rounded-3xl   relative"
          >
            <AnimatePresence>
              {step === 1 && (
                <MobileMyBetModal
                  title={title}
                  image={image}
                  price={price}
                  ownedAmount={ownedAmount}
                  options={options}
                  percentage={percentage}
                  betId={betId}
                  topic={topic}
                  icon={icon}
                  question={question}
                  name={name}
                  userId={userId}
                  option={option}
                  optionNumber={optionNumber}
                  isExternal={isExternal}
                  onClose={onClose}
                  openCashout={openCashout}
                  handleReceipt={handleReceipt}
                  setStep={setStep}
                />
              )}

              {step === 2 && (
                <CashoutOverview
                  option={option}
                  options={options}
                  image={image}
                  question={question}
                  title={title}
                  changeStep={setStep}
                  id={betId}
                  odds={"20"}
                  totalPot={ownedAmount}
                  amount={ownedAmount}
                />
              )}
              {step === 3 && (
                <CashoutWarningScreen
                  option={option}
                  options={options}
                  image={image}
                  question={question}
                  title={title}
                  changeStep={setStep}
                  id={betId}
                  multiplier={"2"}
                  points={ownedAmount}
                  amount={ownedAmount}
                />
              )}
              {step === 4 && (
                <CashoutConfirmScreen
                  option={option}
                  options={options}
                  image={image}
                  question={question}
                  title={title}
                  changeStep={setStep}
                  id={betId}
                  odds={"20"}
                  totalPot={ownedAmount}
                  amount={ownedAmount}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
