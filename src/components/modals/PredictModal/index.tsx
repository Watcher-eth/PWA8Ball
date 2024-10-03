// @ts-nocheck

import { useEffect, useState } from "react"

import { AnimatePresence, motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { Vote } from "lucide-react"
import MotionNumber from "motion-number"
import { formatWithCommas } from "@/utils/string/formatWithCommas"
import { useVotingStore } from "@/lib/stores/VotingStore"
import { useUserStore } from "@/lib/stores/UserStore"
import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { NumericKeypad } from "@/components/NumericKeypad"
import { ConfirmPrediction } from "./ConfirmPrediction"
import { GetGhoModal } from "./GetGhoModal"
import { OnrampStep } from "./OnrampStep"


export function PredictModal({
  text,
  option,
  multiplier,
  image,
  question,
  options,
  marketId,
  odds,
  handleOpen,
  children,
}: {
  text: string
  option: number
  multiplier: number
  image: string
  question: string
  options: string[]
  marketId: string
  odds: number
  handleOpen: () => void
  children: React.ReactNode
}) {
  const [step, setStep] = useState(1)
  const [sliderValue, setSliderValue] = useState("") // Use a string to hold the value
  const setVotingState = useVotingStore((state) => state.setState)
  const amount = useVotingStore((state) => state.amount)
  const { user } = useUserStore()
  const userBalanceUnformatted = useUsdcBalance({
    address: user?.walletAddress,
  })
  const userBalance = userBalanceUnformatted
  const baseFontSize = "5.3rem"
  const lengthAdjustmentThreshold = 3
  const fontSizeAdjustmentFactor = 0.95

  const [fontSize, setFontSize] = useState(baseFontSize)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const newLength =
      sliderValue.length > lengthAdjustmentThreshold
        ? Math.pow(
            fontSizeAdjustmentFactor,
            sliderValue.length - lengthAdjustmentThreshold
          ) * parseFloat(baseFontSize)
        : parseFloat(baseFontSize)
    setFontSize(`${newLength}rem`) // animate the change
  }, [sliderValue])

  const triggerShakeIfExceedsBalance = (value) => {
    if (parseFloat(value.replace(/,/g, "")) >= Number(userBalance) / 10 ** 6) {
      setShake(true)
      setTimeout(() => setShake(false), 500) // Reset the shake state after animation
    }
  }

  const handleButtonPress = (value) => {
    if (value === ".") {
      // Add a decimal point only if there isn't one already
      if (!sliderValue.includes(".")) {
        setSliderValue((prev) => prev + value)
      }
    } else {
      // Ensure the decimal has been added and limit the decimal part to two digits
      if (!sliderValue.includes(".")) {
        // If there's no decimal, just add the number
        if (sliderValue.length < 12)
          setSliderValue((prev) => formatWithCommas(prev + value))
      } else {
        // If there is a decimal, split the value
        const parts = sliderValue.split(".")
        const integerPart = parts[0]
        const decimalPart = parts[1] || ""

        // Check if the decimal part is less than 2
        if (decimalPart.length < 2) {
          // Update the slider value with the new number added to the decimal part
          setSliderValue(integerPart + "." + decimalPart + value)
        }
      }
    }

    // Trigger shake animation if the amount exceeds user balance
    triggerShakeIfExceedsBalance(sliderValue + value)
  }

  function handleDelete() {
    const newValue = formatWithCommas(sliderValue.slice(0, -1))
    setSliderValue(newValue)

    // Trigger shake animation if the amount exceeds user balance
    triggerShakeIfExceedsBalance(newValue)
  }

  function handleContinue() {
    confirmSelection(2)
    setStep(2)
  }

  function confirmSelection(option) {
    if (parseFloat(sliderValue.replace(/,/g, "")) >= userBalance) {
      // showToast();
      return
    }
    setVotingState({
      amount: parseFloat(sliderValue.replace(/,/g, "")),
    })
  }

  return (
    <div className="w-full flex-grow ">
      <Drawer>
        <DrawerTrigger className="w-full">{children}</DrawerTrigger>
        <DrawerContent className="border-0 rounded-[2rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#090909] rounded-2xl w-screen relative"
          >
            <AnimatePresence>
              {step === 1 && (
                <div className="flex flex-col p-8 w-full pt-4 bg-[#090909] pb-8 z-15">
                  <div className="flex flex-row items-center bg-[#090909] w-full justify-center relative">
                    <img
                      className="size-8 rounded-full object-cover"
                      src={image}
                      alt="Question"
                    />
                    <Marquee className="ml-2">
                      <span className="text-lg font-bold text-[lightgray] whitespace-nowrap">
                        {question}
                        {"   "}
                      </span>
                    </Marquee>
                  </div>
                  <div className="flex flex-col items-center py-20 pb-20">
                    <motion.div
                      animate={{
                        x: shake ? [0, -10, 10, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-row items-center justify-center"
                    >
                      <span className="text-3xl font-mono text-[lightgray] mr-1">
                        $
                      </span>
                      <motion.span
                        className="font-bold text-white"
                        animate={{ fontSize }}
                        transition={{ duration: 0.3 }}
                      >
                        {sliderValue || "0.00"}
                      </motion.span>
                    </motion.div>

                    {parseFloat(sliderValue.replace(/,/g, "")) <=
                      (Number(userBalance) / 10 ** 6).toFixed(2) ||
                    sliderValue === "" ? (
                      <div className="flex flex-row items-center -mt-2">
                        <div
                          className="p-1 bg-red-500 rounded-full"
                          style={{
                            backgroundColor:
                              option === 0 ? "#FF0050" : "#0050FF",
                          }}
                        >
                          <Vote color="white" strokeWidth={3} size={16} />
                        </div>
                        <span className="text-lg font-bold text-gray-200 ml-2">
                          {options[option]}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center -mt-2">
                        <span className="text-sm font-bold text-red-600 ml-2">
                          Bro you can't even afford a hair cut 😵‍💫
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 py-1 rounded-xl w-full border border-dashed border-orange-500 mb-4 mt-5">
                    <span className="text-lg font-bold text-orange-500 text-center block">
                      Possible Payout: $
                      <MotionNumber
                        value={
                          (
                            parseFloat(sliderValue.replace(/,/g, "")) *
                            (option === 0
                              ? 100 / multiplier
                              : 100 / (99 - multiplier))
                          ).toFixed(2) !== "NaN" ?? "0.00"
                        }
                      />
                    </span>
                  </div>
                  <NumericKeypad
                    sliderValue={sliderValue}
                    setSliderValue={setSliderValue}
                    userBalance={Number(userBalance)}
                    handleButtonPress={handleButtonPress}
                    handleDelete={handleDelete}
                    handleContinue={handleContinue}
                  />
                </div>
              )}
              {step === 2 &&
                (userBalance > amount ? (
                  <ConfirmPrediction
                    option={option}
                    options={options}
                    image={image}
                    question={question}
                    title={text}
                    setStep={setStep}
                    id={marketId}
                    odds={odds}
                  />
                ) : (
                  <GetGhoModal setStep={setStep} />
                ))}
              {step === 3 && (
                <ConfirmPrediction
                  option={option}
                  options={options}
                  image={image}
                  question={question}
                  title={text}
                  setStep={setStep}
                  id={marketId}
                  odds={odds}
                />
              )}
              {step === 4 && <OnrampStep setStep={setStep} method={1} />}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
