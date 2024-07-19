// @ts-nocheck

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DesktopShareBetModal } from "../Share/DesktopShareBetModal";
import { AlignLeft, ArrowLeftRight, CheckCircle, Receipt } from "lucide-react";
import { DesktopChart } from "@/components/common/Charts/DesktopChart";
import { Input } from "@/components/ui/Input";
import { useVotingStore } from "@/lib/stores/VotingStore";

import { DesktopLoadingPrediction } from "@/components/Modals/PredictModal/LoadingPrediction";
import { CashoutConfirmScreen } from "./Cashout/confirm";
import { CashOutWarningScreen } from "./Cashout/warning";
import { CashoutOverview } from "./Cashout/overview";
import { OutcomeButton } from "@/components/buttons/OutcomeButton";
import { SharePredictButton } from "@/components/buttons/SharePredictButton";

import { useExecutePrediction } from "@/hooks/actions/useExecutePrediction";

export function DesktopPredictComponent(props: {
  question: string;
  title: string;
  image: string;
  id: string;
  options: string[];
  topic: string;
}) {
  const {
    question,
    title,
    image,
    id,
    options,
    topic,
  } = props
  const [step, setStep] = useState<number>(0);
  const [amount, setAmount] = useState(0);
  const setStake = useVotingStore((state) => state.setState);

  return (
    <div
      className={`
        border-2  rounded-[1.5rem] border-white/10 text-white h-auto overflow-hidden
      `}
    >
      <motion.div
        layout
        transition={{ duration: 0.2 }}
        className="relative bg-transparent"
      >
        <AnimatePresence>
          {(step === 0 || step === 4) && (
            <div>
              <CardHeader>
                <CardTitle className="text-white">Question</CardTitle>
                <CardDescription className="text-[lightgray]">
                  {question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DesktopChart {...props} />
              </CardContent>
            </div>
          )}

          {step === 0 && (
            <div className="flex flex-col w-full py-4 md:px-4 px-6 gap-4">
              <Input
                onChange={(e) => setAmount(Number(e.target.value))}
                type="numeric"
                placeholder="$0.00"
                className={`
                    w-full  rounded-md py-6 text-md border-none
                    bg-slate-400/10 hover:bg-slate-400/20
                    focus:!ring-white/30 focus:!ring-offset-0 focus:!ring-1
                  `}
              />
              <div className="flex items-center justify-between z-[2] gap-3 mt-2.5">
                <OutcomeButton
                  isDesktop={true}
                  text={options[1].name}
                  multiplier={options[1].value / 100}
                  option={0}
                  onClick={() => {
                    setStake({ amount, option: 1 });
                    setStep(2);
                  }}
                />
                <OutcomeButton
                  isDesktop={true}
                  text={options[0].name}
                  multiplier={options[0].value / 100}
                  option={1}
                  onClick={() => {
                    setStake({ amount, option: 2 });
                    setStep(2);
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
                flex flex-row items-center justify-around
                self-center w-full
                mt-2 mb-9 px-2.5
              `}
            >
              <motion.div
                onClick={() => {
                  setStep(5);
                }}
                className={`
                  mt-3 rounded-lg p-2.5 overflow-hidden
                  bg-[#1D1D1D] w-[12vw]
                  flex flex-row items-center justify-center
                  gap-1
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
                  setStep(7);
                }}
                className={`
                  mt-3 rounded-lg p-2.5 overflow-hidden
                  bg-[#D9D9D9] w-[12vw]
                  flex flex-row items-center justify-center
                  gap-1
                `}
              >
                <Receipt height={20} color={"#1D1D1D"} strokeWidth={3} />
                <span
                  style={{
                    fontSize: 20,
                    color: "#1D1D1D",
                    fontWeight: 800,
                    marginLeft: "3px",
                  }}
                >
                  Details
                </span>
              </motion.div>
            </div>
          )}

          {step === 5 && (
            <CashoutOverview
              {...props}
              changeStep={setStep}
              odds={"20"}
              totalPot={1200}
              amount={1200}
              isDesktop={true}
            />
          )}
          {step === 6 && (
            <CashOutWarningScreen
              {...props}
              changeStep={setStep}
              odds={"20"}
              totalPot={1200}
              amount={1200}
              points={1200}
              isDesktop={true}
            />
          )}
          {step === 7 && (
            <CashoutConfirmScreen
              {...props}
              changeStep={setStep}
              odds={"20"}
              totalPot={1200}
              amount={1200}
              isDesktop={true}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
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
} : {
  setStep: (step: number) => void;
  image: string;
  // option: string;
  options: string[];
  question: string;
  title: string;
  id: string;
  odds: number;
}) {
  const amount = useVotingStore((state) => state.amount);
  const option = useVotingStore((state) => state.option);
  // console.log({option, option2})

  const { executePrediction, loading, success } = useExecutePrediction();

  return (
    <div className="flex flex-col items-center w-full py-4 pt-0 rounded-lg ">
      {loading || success ? (
        <DesktopLoadingPrediction
          image={image}
          question={question}
          answer={
            Number(option) === 1 ? options[1].name : options[0].name
          }
          loading={loading}
          success={success}
        />
      ) : (
        <div className="flex flex-col items-center w-full px-6  rounded-lg">
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
                  className={`
                    flex items-center px-2 py-1 rounded-lg
                    text-[0.95rem] font-semibold
                    ${
                      option === 1
                        ? "bg-[#75171D] text-[#E23B3B]"
                        : "bg-[#013145] text-[#0596FF]"
                    }
                  `}
                >
                  <span>
                    {options[option === 1 ? 1 : 0].name}
                  </span>
                </div>
              }
            />
            <PredictInfoRow
              label="Your Stake"
              contentStr={amount.toPrecision(3)}
            />
            <PredictInfoRow
              label="Market Fees"
              contentStr={(amount * 0.025).toPrecision(2)}
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
            <p className="text-[0.75rem] text-[#424242] mt-1 font-medium text-center px-3">
              Review the above carefully before confirming. Once made, your
              prediction is irreversible.
            </p>
          </div>
        </div>
      )}
      <div
        className={`
          flex items-center gap-2 mb-2
          ${(loading || success) && "mt-[3.8rem]"}
        `}
      >
        {success ? (
          <div className="z-10">
            <DesktopShareBetModal
              setStep={setStep}
              image={image}
              // option,
              options={options}
              question={question}
              title={title}
              id={id}
              odds={odds}
            >
              <motion.button
                className={`
                  mt-3 py-2 px-6 z-10 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D]
                  font-bold flex items-center justify-center gap-1 self-center
                  hover:scale-101 active:scale-98 transition-all
                `}
                initial={{ width: "24vw" }}
              >
                <div className="flex items-center gap-2">
                  <SharePredictButton success={success} />
                </div>
              </motion.button>
            </DesktopShareBetModal>
          </div>
        ) : (
          <div className="flex justify-around">
            <motion.button
              onClick={() => setStep(0)}
              className={`
                mt-3 py-2 px-6 rounded-full bg-[#1D1D1D] text-lg text-[#D9D9D9] font-bold
                min-w-20 flex-shrink
              `}
            >
              Back
            </motion.button>
            <motion.button
              onClick={() => {
                executePrediction({
                  amount,
                  option,
                  marketId: id,
                  options,
                });
              }}
              className={`
                ml-4 mt-3 py-2 px-6 z-10 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D]
                font-bold flex items-center justify-center gap-1 self-center
                hover:scale-101 active:scale-98 transition-all min-w-20
                flex-grow
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
          </div>

        )}
      </div>
    </div>
  );
}

function PredictInfoRow({
  label,
  contentStr,
  content,
}: {
  label: string;
  contentStr?: string;
  content?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between my-2 w-full">
      <span className="text-lg  text-white/40 font-medium">{label}</span>
      {content ?? (
        <span className="text-lg text-white font-bold">${contentStr}</span>
      )}
    </div>
  );
}
