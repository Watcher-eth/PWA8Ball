// @ts-nocheck
import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx"
import { AnimatePresence, motion } from "framer-motion"
import { MobileMyBetModal } from "../common/Charts/MyBetModal.tsx"
import { CashoutOverview } from "../predictions/cashout/CashoutOverview"
import { CashoutWarningScreen } from "../predictions/cashout/CashoutWarningScreen"
import { CashoutConfirmScreen } from "../predictions/cashout/CashoutConfirmScreen"
import { RedeemModal } from "../predictions/Redeem/RedeemModal"

export function PredictionPositionModal({
  children,
  title,
  image,
  price,
  ownedAmount,
  options,
  betId,
  topic,
  icon,
  question,
  name,
  userId,
  option,
  optionNumber,
  isExternal,
  initialProb,
  refetch,
  onClose,
  openCashout,
  handleReceipt,
  index,
}: {
  children: React.ReactNode
  title: string
  image: string
  price: number
  ownedAmount: number
  options: string[]
  betId: string
  topic: string
  icon: string
  question: string
  name?: string
  userId?: string
  option?: number
  optionNumber?: number
  isExternal?: boolean
  initialProb?: number
  index?: number
  onClose: () => void
  openCashout: () => void
  refetch: () => void

  handleReceipt: () => void
}) {
  const [snap, setSnap] = useState<number | string | null>(
    `${window.innerHeight * 0.85}px`
  )
  const [step, setStep] = useState(1)

  return (
    <div>
      <Drawer
        onClose={() => {
          setStep(1)
          setSnap(`${window.innerHeight * 0.85}px`)
        }}
        snapPoints={[
          `${window.innerHeight * 0.85}px`,
          `${window.innerHeight * 1}px`,
        ]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <DrawerOverlay className="fixed inset-0 bg-black/40" />

        <DrawerTrigger>
          <div className={`${index === 0 && "-mt-0"} hover:scale-101 active:scale-[99.5%] transition-all`}>
            {children}
          </div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 bg-[#101010] pb-10 rounded-t-[1.4rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            style={{
              width: step === 1 ? "100vw" : "95vw",
              alignSelf: "center",
              marginBottom: step !== 1 ? 15 : 0,
            }}
            className="bg-[#101010]  relative"
          >
            <AnimatePresence>
              {step === 1 && (
                <MobileMyBetModal
                  title={title}
                  image={image}
                  price={price}
                  ownedAmount={ownedAmount}
                  options={options}
                  betId={betId}
                  topic={topic}
                  initialProb={initialProb}
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
                  refetch={refetch}
                  option={option}
                  options={options}
                  image={image}
                  question={question}
                  title={title}
                  changeStep={setStep}
                  id={betId}
                  odds={20}
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
              {step === 5 && (
                <RedeemModal
                  option={options}
                  image={image}
                  onClose={onClose}
                  totalPot={ownedAmount}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
