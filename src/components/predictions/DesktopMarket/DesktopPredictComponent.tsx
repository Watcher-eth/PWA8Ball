// @ts-nocheck

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AlignLeft, ArrowLeftRight, Receipt, ReceiptText } from "lucide-react"

import { useExecutePrediction } from "@/hooks/actions/useExecutePrediction"
import { useVotingStore } from "@/lib/stores/VotingStore"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import { OutcomeButton } from "@/components/buttons/OutcomeButton"
import { SharePredictButton } from "@/components/buttons/SharePredictButton"

import { DesktopChart } from "@/components/common/Charts/DesktopChart"
import { DesktopLoadingPrediction } from "@/components/modals/PredictModal/LoadingPrediction"
import { DesktopShareBetModal } from "@/components/share/bet/DesktopShareBetModal"

import { CashoutConfirmScreen } from "@/components/predictions/cashout/CashoutConfirmScreen"
import { CashoutWarningScreen } from "@/components/predictions/cashout/CashoutWarningScreen"
import { CashoutOverview } from "@/components/predictions/cashout/CashoutOverview"
import { Card } from "@/components/ui/tailwind/Card"
import { TxStatusButton } from "@/components/common/Animated/AnimatedTxStatus"
import { cleanNumberInput } from "@/utils/string/cleanNumberInput"
import { useReferralStore } from "@/lib/stores/ReferralStore"

export function DesktopPredictComponent(props: {
  question: string
  title: string
  image: string
  id: string
  options: string[]
  topic: string
  initialProb: number
  refetch: () => void
  userOwns?: { highest_amount: number; highest_option: number }
}) {
  const {
    question,
    title,
    image,
    id,
    options,
    topic,
    userOwns,
    initialProb,
    refetch,
  } = props
  const [step, setStep] = useState<number>(userOwns.length > 0 ? 4 : 0)
  const [amountStr, setAmountStr] = useState()
  const amount = Number(amountStr?.length > 0 ? amountStr : 0)
  const setStake = useVotingStore((state) => state.setState)

  return (
    <div
      className={`  ${
        step === 0 || step === 4 || step === 2
          ? ""
          : "p-4 rounded-lg  pt-1 border-[0.1rem] border-[#141414] overflow-hidden"
      } `}
    >
      <motion.div
        layout
        transition={{ duration: "0.6", type: "spring" }}
        className="relative bg-transparent  "
      >
        <AnimatePresence>
          {(userOwns[0] && step === 0) || (userOwns[0] && step === 4) ? (
            <div className="flex justify-between text-[1.5rem] text-white font-medium flex-row items-center gap-3">
              <div>{step === 0 ? `${title}?` : "Your Predictions"}</div>{" "}
              <div
                onClick={() => {
                  if (step === 0) {
                    setStep(4)
                  } else if (step === 4) {
                    setStep(0)
                  } else {
                    setStep(4)
                  }
                }}
                className="h-[2rem] hover:scale-101 active:scale-98 w-[2rem] border-[0.1rem] border-[#181818] bg-[#131313] rounded-full flex flex-row items-center justify-center"
              >
                <ArrowLeftRight size={15} strokeWidth={3.5} />
              </div>
            </div>
          ) : null}
          {step === 0 && (
            <div className="flex flex-col w-full pt-2 gap-4">
              <Input
                value={amountStr}
                onChange={(e) => setAmountStr(cleanNumberInput(e.target.value))}
                type="numeric"
                placeholder="$0.00"
                className={`
                    w-full font-semibold placeholder:text-[lightgray] text-white  rounded-md py-6 text-md
                    bg-[#090909] border-[0.1rem] border-[#212121] hover:bg-[#101010]
                    focus:!ring-white/40 focus:!ring-offset-0  focus:!ring-1
                  `}
              />
              <div className="flex items-center justify-around z-2 gap-3 mt-0 max-w-full">
                <OutcomeButton
                  isDesktop={true}
                  text={options[1].name}
                  multiplier={options[1].value / 100}
                  option={0}
                  onClick={() => {
                    setStake({ amount, option: 1 })
                    setStep(2)
                  }}
                />
                <OutcomeButton
                  isDesktop={true}
                  text={options[0].name}
                  multiplier={options[0].value / 100}
                  option={1}
                  onClick={() => {
                    setStake({ amount, option: 2 })
                    setStep(2)
                  }}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <DesktopConfirmPrediction
              {...props}
              odds={options[0].value / 100}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <div
              className={`
        flex flex-row items-center
       rounded-[10px] cursor-pointer
        transition-all mt-4 mb-0.5
      `}
            >
              <img
                className="h-[54px] w-[54px]  rounded-[6px] object-cover"
                src={image}
                alt={title}
              />
              <div className="flex flex-col ml-[9px] w-full -space-y-0.5">
                <div className="flex items-center justify-between w-full">
                  <span className="line-clamp-1 flex gap-2 font-medium text-[16px] text-[lightgray]/80 max-w-[73vw] mb-[1px] overflow-hidden">
                    You predicted{" "}
                    <p
                      style={{
                        backgroundColor:
                          userOwns[0].option === 1
                            ? "rgb(255, 63, 63, 0.1)"
                            : "rgb(77, 175, 255, 0.1)",
                      }}
                      className={`flex p-2 py-0.5 text-[0.8rem] font-[700] rounded-full ${
                        userOwns[0].option === 1
                          ? "text-[#FF3F3F]"
                          : "text-[#4DAFFF]"
                      } flex-row gap-1 items-center`}
                    >
                      {options[userOwns[0].option].name}
                    </p>
                  </span>
                  <span className="line-clamp-1 font-[400] text-[14px] text-[#999999] max-w-[73vw] mb-[1px] overflow-hidden">
                    3hrs ago
                  </span>
                </div>
                <span className="text-lg font-semibold text-white">
                  $
                  {(
                    ((userOwns[0].tokensOwned / 10 ** 6) *
                      options[userOwns[0].option].value) /
                    10000
                  ).toFixed(2)}{" "}
                  Value
                </span>
              </div>
            </div>
          )}
          {step === 4 && (
            <div
              className={`
                flex flex-row items-center justify-around
                self-center w-full
                mt-1.5 -mb-1
                space-x-4
              `}
            >
              <motion.div
                onClick={() => {
                  setStep(5)
                }}
                className={`
                  mt-3 rounded-md p-2 overflow-hidden
              w-1/2 hover:scale-[101%]  active:scale-99
                  flex flex-row items-center justify-center
                  gap-1  bg-[#121212] text-lg  text-[#D9D9D9]
                `}
              >
                <ArrowLeftRight height={20} color={"#D9D9D9"} strokeWidth={3} />

                <span
                  style={{ fontSize: 20, color: "#D9D9D9", fontWeight: 800 }}
                >
                  Cashout
                </span>
              </motion.div>
              <motion.div
                onClick={() => {
                  setStep(7)
                }}
                className={`
                  mt-3 rounded-md p-2 overflow-hidden hover:scale-[100.8%]  active:scale-99
                  bg-[#D9D9D9] text-lg text-[#1D1D1D]  w-1/2
                  flex flex-row items-center justify-center
                  gap-1
                `}
              >
                <ReceiptText height={20} color={"#1D1D1D"} strokeWidth={3} />
                <span
                  style={{
                    fontSize: 20,
                    color: "#1D1D1D",
                    fontWeight: 800,
                    marginLeft: "3px",
                  }}
                >
                  Your Prediction
                </span>
              </motion.div>
            </div>
          )}

          {step === 5 && (
            <CashoutOverview
              {...props}
              changeStep={setStep}
              odds={
                userOwns[0]?.option === 0
                  ? options[0].value / 100
                  : options[1].value / 100
              }
              totalPot={userOwns[0]?.tokensOwned}
              refetch={refetch}
              amount={userOwns[0]?.tokensOwned}
              isDesktop={true}
            />
          )}
          {step === 6 && (
            <CashoutWarningScreen
              {...props}
              changeStep={setStep}
              odds={
                userOwns[0]?.option === 0
                  ? options[0].value / 100
                  : options[1].value / 100
              }
              totalPot={userOwns[0]?.tokensOwned}
              amount={userOwns[0]?.tokensOwned}
              points={userOwns[0]?.tokensOwned}
              isDesktop={true}
            />
          )}
          {step === 7 && (
            <CashoutConfirmScreen
              {...props}
              changeStep={setStep}
              odds={
                userOwns[0]?.option === 0
                  ? options[0].value / 100
                  : options[1].value / 100
              }
              totalPot={userOwns[0]?.tokensOwned}
              points={userOwns[0]?.tokensOwned}
              isDesktop={true}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function DesktopConfirmPrediction({
  setStep,
  image,
  // option,
  options,
  question,
  title,
  id,
  odds,
}: {
  setStep: (step: number) => void
  image: string
  // option: string;
  options: string[]
  question: string
  title: string
  id: string
  odds: number
}) {
  const amount = useVotingStore((state) => state.amount)
  const option = useVotingStore((state) => state.option)
  const refId = useReferralStore((state) => state.referralId)

  const { executePrediction, loading, success, error } = useExecutePrediction()
  return (
    <div
      className={`flex flex-col items-center w-full ${
        success || loading ? "py-0 px-0" : "  py-4"
      } overflow-hidden pt-0 rounded-lg `}
    >
      {loading || success ? (
        <DesktopLoadingPrediction
          image={image}
          question={question}
          answer={Number(option) === 1 ? options[1].name : options[0].name}
          loading={loading}
          success={success}
          setStep={setStep}
        />
      ) : (
        <div className="flex flex-col items-center w-full px-4  rounded-lg">
          <div className="flex flex-col w-full my-2 mt-7">
            <img
              src={image}
              alt={title}
              className="h-14 w-14 object-cover rounded-full"
            />
          </div>
          <h2 className="text-[1.2rem] text-white font-bold mb-2 self-start">
            {success
              ? "Prediction Successful"
              : `Confirm your prediction for: ${title}`}
          </h2>

          <div className="flex flex-col items-center w-full">
            <PredictInfoRow
              label="Your Prediction"
              content={
                <div
                  style={{
                    backgroundColor:
                      option === 1 ? "rgb(255, 63, 63, 0.1) " : " ",
                  }}
                  className={`
                    flex items-center px-3 py-0.5 rounded-lg
                    text-[0.95rem] font-semibold
                    ${
                      option === 1
                        ? " text-[#E23B3B]"
                        : "bg-[#013145] text-[#0596FF]"
                    }
                  `}
                >
                  <span>{options[option === 1 ? 1 : 0].name}</span>
                </div>
              }
            />
            <PredictInfoRow
              label="Your Stake"
              contentStr={amount.toPrecision(3)}
            />
            <PredictInfoRow
              label="Fees"
              contentStr={
                refId?.length > 3 ? (amount * 0.025).toPrecision(2) : 0.0
              }
            />
            <PredictInfoRow
              label="Potential Payout"
              contentStr={(option === 2
                ? (100 / odds) * amount
                : (100 / (100 - odds)) * amount
              ).toFixed(2)}
            />

            <div className="w-full  bg-white/20 h-px my-3"></div>
            <div className="flex items-center self-start mb-0 gap-1">
              <AlignLeft
                className="text-[#626262]"
                strokeWidth={3.3}
                size={16}
              />
              <span className="text-[1.1rem] text-white/40 font-bold">
                Question
              </span>
            </div>
            <p className="text-[0.95rem] text-white/80 font-medium py-1 mb-3 self-start">
              {question}
            </p>
            <p className="text-[0.75rem] text-[#424242] mt-5 font-medium text-center px-3">
              Review the above carefully before confirming. Once made, your
              prediction is irreversible.
            </p>
          </div>
        </div>
      )}
      <div
        className={`
          flex items-center gap-2 px-7  w-full
          ${(loading || success) && "mt-[3.8rem] mb-4"}
        `}
      >
        <div className="flex w-full pt-3 space-x-3">
          <motion.button
            onClick={() => setStep(0)}
            className={`
         py-2 px-6  h-12 w-full rounded-full bg-[#131313] text-lg text-[#D9D9D9] font-bold
          flex-1
        `}
          >
            Back
          </motion.button>
          {loading || success || error ? (
            <DesktopShareBetModal
              setStep={setStep}
              image={image}
              options={options}
              question={question}
              title={title}
              id={id}
              odds={odds}
            >
              <TxStatusButton
                minWidth={"min-w-[12rem] w-full"}
                height="h-12"
                isPending={loading}
                isSuccess={success}
                isError={error}
                pendingText="Processing"
                successText="Success"
                errorText="Prediction Failed"
              />
            </DesktopShareBetModal>
          ) : (
            <motion.button
              onClick={() => {
                executePrediction({
                  amount,
                  option,
                  marketId: id,
                  options,
                  referrer: refId,
                })
              }}
              className={`
          ml-4  py-2 px-6 z-10 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D]
          font-bold flex items-center justify-center gap-1 self-center
          hover:scale-101 active:scale-98 transition-all flex-1
        `}
            >
              <div className="flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="loader"></span>
                    <span>Predicting</span>
                  </>
                ) : (
                  <SharePredictButton success={success} />
                )}
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

function PredictInfoRow({
  label,
  contentStr,
  content,
}: {
  label: string
  contentStr?: string
  content?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between my-2 w-full">
      <span className="text-lg  text-white/40 font-medium">{label}</span>
      {content ?? (
        <span className="text-lg text-white font-bold">${contentStr}</span>
      )}
    </div>
  )
}
