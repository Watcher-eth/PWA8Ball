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
import { useRouter } from "next/router";
import { DesktopChart } from "@/components/common/Charts/DesktopChart";
import { Input } from "@/components/ui/Input";
import { useUserStore } from "@/lib/stores/UserStore";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { usePredictV2 } from "@/lib/onchain/mutations/PredictV2";
import { useVotingStore } from "@/lib/stores/VotingStore";

import { DesktopLoadingPrediction } from "@/components/Modals/PredictModal/SuccessScreen";
import { CashoutConfirmScreen } from "./Cashout/confirm";
import { CashOutWarningScreen } from "./Cashout/warning";
import { CashoutOverview } from "./Cashout/overview";
import { OutcomeButton } from "@/components/buttons/OutcomeButton";
import { SharePredictButton } from "@/components/buttons/SharePredictButton";
import { getUSDCBalance } from "@/lib/onchain/contracts/Usdc";
import { toast } from "sonner";

export function DesktopPredictComponent(props: {
  question: string;
  title: string;
  image: string;
  id: string;
  options: string[];
  topic: string;
}) {
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
                  {props?.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DesktopChart
                  topic={props?.topic}
                  image={props?.image}
                  question={props?.question}
                  title={props.title}
                  options={props?.options}
                  id={props?.id}
                />
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
                  text={props?.options[1].name}
                  multiplier={props?.options[1].value / 100}
                  option={0}
                  onClick={() => {
                    setStake({ amount, option: 1 });
                    setStep(2);
                  }}
                />
                <OutcomeButton
                  isDesktop={true}
                  text={props?.options[0].name}
                  multiplier={props?.options[0].value / 100}
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
              title={props?.title}
              question={props?.question}
              id={props?.id}
              image={props?.image}
              options={props?.options}
              topic={props?.topic}
              odds={props.options[0].value / 100}
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
              options={props.options}
              image={props.image}
              question={props.question}
              title={props.title}
              changeStep={setStep}
              id={props.id}
              odds={"20"}
              totalPot={1200}
              amount={1200}
              isDesktop={true}
            />
          )}
          {step === 6 && (
            <CashOutWarningScreen
              options={props.options}
              image={props.image}
              question={props.question}
              title={props.title}
              changeStep={setStep}
              id={props.id}
              odds={"20"}
              totalPot={1200}
              amount={1200}
              points={1200}
              isDesktop={true}
            />
          )}
          {step === 7 && (
            <CashoutConfirmScreen
              options={props.options}
              image={props.image}
              question={props.question}
              title={props.title}
              changeStep={setStep}
              id={props.id}
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

function DesktopConfirmPrediction(props: {
  setStep: (step: number) => void;
  image: string;
  option: string;
  options: string[];
  question: string;
  title: string;
  id: string;
  odds: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const {
    smartAccountReady,
    smartAccountClient,
    smartAccountAddress,
    eoa,
    eoaClient,
  } = useSmartAccount();
  const { user: userCon } = useUserStore();
  const { mutate: predictV2 } = usePredictV2();
  const router = useRouter();
  const amount = useVotingStore((state) => state.amount);
  const option = useVotingStore((state) => state.option);
  console.log("smart acount client", smartAccountAddress, eoaClient);

  async function executePrediction() {
    const balance = await getUSDCBalance(userCon?.walletaddress);
    const desired = Number(amount.toFixed(4));
    setLoading(true);

    // const hasBalance = Number(balance) > desired;
    // if (!hasBalance) {
    //   console.log("not enough baalnce", balance);
    // }

    if (smartAccountReady)
      try {
        if (userCon?.walletType === "smartwallet")
          predictV2({
            userId: userCon.external_auth_provider_user_id!,
            marketId: Number(props.id),
            amount: Number(amount.toFixed(4)) * 1000000,
            client: smartAccountClient,
            address: smartAccountAddress,
            preferYes: Number(option) === 1 ? false : true,
            option: props.options[Number(option) - 1],
            isBuy: true,
          });

        if (userCon?.walletType === "eoa") {
          predictV2({
            userId: userCon.external_auth_provider_user_id!,
            marketId: Number(props.id),
            amount: Number(amount.toFixed(4)) * 1000000,
            client: eoaClient,
            address: userCon?.walletaddress,
            preferYes: Number(option) === 1 ? false : true,
            option: props.options[Number(option) - 1],
            isBuy: true,
          });
        }
        console.log("after");
        setTimeout(() => {
          setLoading(false);

          setSuccess(true);
          toast.success("Prediction successful!", {
            icon: <CheckCircle height={"15px"} />,
            style: {
              backgroundColor: "rgba(21, 21, 21, 0.75)",
              backdropFilter: "blur(20px)",
              color: "white",
              border: "0px",
            },
          });
        }, 3500);
        // setTimeout(() => {
        //   router.push({
        //     pathname: getProfilePath(userCon?.external_auth_provider_user_id),
        //   });
        //   props.setStep(4);
        // }, 6500);
      } catch (error) {
        console.error("Failed to make prediction:", error);
        alert("Failed to make prediction!");
      }
  }

  return (
    <div className="flex flex-col items-center w-full py-4 pt-0 rounded-lg ">
      {loading || success ? (
        <DesktopLoadingPrediction
          image={props.image}
          question={props.question}
          answer={
            Number(option) === 1 ? props.options[1].name : props.options[0].name
          }
          option={props.option}
          loading={loading}
          success={success}
        />
      ) : (
        <motion.div className="flex flex-col items-center w-full px-6  rounded-lg">
          <div className="flex flex-col w-full my-2 mt-7">
            <img
              src={props.image}
              alt={props.title}
              className="h-14 w-14 object-cover rounded-full"
            />
          </div>
          <h2 className="text-[1.2rem] text-white font-bold mb-2 self-start">
            {success
              ? "Prediction Successful"
              : `Confirm your prediction for: ${props.title}`}
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
                  <span className={``}>
                    {props.options[option === 1 ? 1 : 0].name}
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
                ? (100 / props.odds) * amount
                : (100 / (100 - props.odds)) * amount
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
              {props.question}
            </p>
            <p className="text-[0.75rem] text-[#424242] mt-1 font-medium text-center px-3">
              Review the above carefully before confirming. Once made, your
              prediction is irreversible.
            </p>
          </div>
        </motion.div>
      )}
      <div
        className={`
          flex items-center gap-2 mb-2
          ${(loading || success) && "mt-[3.8rem]"}
        `}
      >
        {!success && (
          <motion.button
            onClick={() => props.setStep(0)}
            className={`
            mt-3 py-2 px-6 rounded-full bg-[#1D1D1D] text-lg text-[#D9D9D9] font-bold
            ${success ? "w-[0vw]" : "w-[12vw]"}
          `}
            initial={{ width: "12vw" }}
            animate={{
              width: success ? "0vw" : "12vw",
              opacity: success ? 0 : 1,
            }}
          >
            Back
          </motion.button>
        )}
        {success ? (
          <div className=" z-10">
            <DesktopShareBetModal
              title={props?.title}
              question={props?.question}
              id={props?.id}
              image={props?.image}
              options={props?.options}
              topic={props?.topic}
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
          <motion.button
            onClick={() => {
              executePrediction();
            }}
            className={`
              ml-4 mt-3 py-2 px-6 z-10 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D]
              font-bold flex items-center justify-center gap-1 self-center
              hover:scale-101 active:scale-98 transition-all
            `}
            initial={{ width: "12vw" }}
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
