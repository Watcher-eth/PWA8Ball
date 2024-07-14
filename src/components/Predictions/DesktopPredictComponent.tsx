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
import {
  AlignLeft,
  ArrowLeftRight,
  Receipt,
  ScanFace,
  ShareIcon,
} from "lucide-react";
import { DesktopChart } from "../Common/Charts/DesktopChart";
import { Input } from "../ui/Input";
import { useUserStore } from "@/lib/stores/UserStore";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { usePredictV2 } from "@/lib/onchain/mutations/PredictV2";
import { useVotingStore } from "@/lib/stores/VotingStore";
import { getProfilePath } from "@/utils/urls";
import { useRouter } from "next/router";
import { DesktopLoadingPrediction } from "../Modals/PredictModal/SuccessScreen";
import { CashoutConfirmScrreen } from "./Cashout/confirm";
import { CashOutWarningScreen } from "./Cashout/warning";
import { CashoutOverview } from "./Cashout/overview";

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

  console.log("marrket", props.options);
  return (
    <Card className="border-2 mt-[-0.5rem] rounded-[1.5rem] border-[#121212] text-white h-[55vh]">
      <motion.div layout transition={{ duration: 0.2 }} className="relative">
        <AnimatePresence>
          {step === 0 || step === 4 ? (
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
          ) : null}

          {step === 0 && (
            <div className="flex flex-col w-full p-4 px-6">
              <Input
                onChange={(e) => setAmount(Number(e.target.value))}
                type="numeric"
                placeholder="$0.00"
                className="w-full bg-[#121212] rounded-md py-6 text-md border-none"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "5px",
                  marginTop: "10px",
                }}
              >
                <motion.div
                  onClick={() => {
                    setStake({ amount: amount, option: 1 });

                    setStep(2);
                  }}
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    flexDirection: "row",
                    padding: "9px",
                    borderRadius: "28px",
                    overflow: "hidden",
                    backgroundColor: "#FF0050",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  className="w-1/2"
                >
                  <div
                    className={
                      props.options[1].name?.length < 6
                        ? "text-[20px] font-semibold"
                        : "text-[18px] font-semibold"
                    }
                  >
                    {props.options[1]?.name}
                  </div>
                  <div
                    className={`
          text-[0.81rem] font-medium text-white/80
          self-end mb-0.5 ml-1
        `}
                  >
                    {props.options[1]?.value / 100}%
                  </div>
                </motion.div>
                <motion.div
                  onClick={() => {
                    setStake({ amount: amount, option: 2 });
                    setStep(2);
                  }}
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "16px",
                    padding: "9px",
                    borderRadius: "28px",
                    overflow: "hidden",
                    backgroundColor: "#0050FF",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  className="w-1/2"
                >
                  <div
                    className={
                      props.options[0].name?.length < 6
                        ? "text-[20px] font-semibold"
                        : "text-[18px] font-semibold"
                    }
                  >
                    {props.options[0]?.name}
                  </div>
                  <div
                    className={`
          text-[0.81rem] font-medium text-white/80
          self-end mb-0.5 ml-1
        `}
                  >
                    {props.options[0]?.value / 100}%
                  </div>
                </motion.div>
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
            />
          )}
          {step === 4 && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
                marginBottom: 10,
                alignSelf: "center",
                justifyContent: "space-around",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <motion.div
                onClick={() => {
                  setStep(5);
                }}
                style={{
                  marginTop: 11,
                  borderRadius: 25,
                  padding: "10px 10px",
                  overflow: "hidden",
                  backgroundColor: "#1D1D1D",
                  width: "12vw",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                }}
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
                style={{
                  marginTop: 11,
                  display: "flex",
                  padding: "10px 8px",
                  flexDirection: "row",
                  borderRadius: 25,
                  overflow: "hidden",
                  backgroundColor: "#D9D9D9",
                  width: "12vw",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
            <CashoutConfirmScrreen
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
    </Card>
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
  const { smartAccountReady, smartAccountClient, smartAccountAddress, eoa } =
    useSmartAccount();
  const { user: userCon } = useUserStore();
  const { mutate: predictV2 } = usePredictV2();
  const router = useRouter();
  const amount = useVotingStore((state) => state.amount);
  const option = useVotingStore((state) => state.option);

  async function executePrediction() {
    //TODO: Check Balance of user
    const userBalance = Number(userCon?.balance) / 1000000;
    const desired = Number(amount.toFixed(4));

    const hasBalance = Number(userBalance) > desired;
    console.log("clck", hasBalance, smartAccountReady, smartAccountClient);
    if (!hasBalance) {
      // router.navigate({ pathname: "/GetFundsModal" });
    }

    setTimeout(() => {
      setLoading(false);

      setSuccess(true);
    }, 3500);
    if (hasBalance && smartAccountReady)
      try {
        console.log("client", smartAccountClient);
        setLoading(true);
        predictV2({
          userId: userCon.external_auth_provider_user_id!,
          marketId: Number(props.id),
          amount: Number(amount.toFixed(4)) * 1000000,
          client: smartAccountClient,
          address: smartAccountAddress,
          preferYes: Number(props.option) === 1 ? false : true,
          option: option,
          isBuy: true,
        });

        // showToast();
        setTimeout(() => {
          setLoading(false);

          setSuccess(true);
        }, 3500);

        setTimeout(() => {
          router.push({
            pathname: getProfilePath(userCon?.external_auth_provider_user_id),
          });
          props.setStep(4);
        }, 6500);
      } catch (error) {
        console.error("Failed to make prediction:", error);
        alert("Failed to make prediction!");
      }
  }

  return (
    <div className="flex flex-col items-center w-full py-4 pt-0 rounded-lg ">
      {loading || success ? (
        // <LoadingPrediction
        //   image={image}
        //   loading={loading}
        //   question={question}
        //   option={Option}
        //   success={success && !loading}
        //   answer={options[Option - 1].name}
        // />
        <DesktopLoadingPrediction
          image={props.image}
          question={props.question}
          answer={
            Number(props.option) === 1
              ? props.options[1].name
              : props.options[0].name
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
            <div className="flex items-center justify-between my-2 w-full">
              <span className="text-lg text-[#424242] font-semibold">
                Your Prediction
              </span>
              <div
                style={{ borderRadius: 10 }}
                className={`flex items-center px-2 py-1 rounded-lg ${
                  option === 0 ? "bg-[#75171D]" : "bg-[#013145]"
                }`}
              >
                <span
                  className={`text-[0.95rem] font-semibold ${
                    option === 0 ? "text-[#E23B3B]" : "text-[#0596FF]"
                  }`}
                >
                  {Number(props.option) === 1
                    ? props.options[1].name
                    : props.options[0].name}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between my-2 w-full">
              <span className="text-lg  text-[#424242] font-semibold">
                Your Stake
              </span>
              <span className="text-lg text-white font-bold">
                ${amount.toPrecision(3)}
              </span>
            </div>
            <div className="flex items-center justify-between my-2 w-full">
              <span className="text-lg  text-[#424242] font-semibold">
                Market fees
              </span>
              <span className="text-lg text-white font-bold">
                ${(amount * 0.025).toPrecision(2)}
              </span>
            </div>
            <div className="flex items-center justify-between my-2 mb-2 w-full">
              <span className="text-lg  text-[#424242] font-semibold">
                Potential Payout
              </span>
              <span className="text-lg text-white font-bold">
                $
                {option === 2
                  ? ((100 / props.odds) * amount).toFixed(2)
                  : ((100 / (100 - props.odds)) * amount).toFixed(2)}
              </span>
            </div>
            <div className="w-full  bg-[#424242] h-px my-3"></div>
            <div className="flex items-center self-start mb-0 gap-1">
              <AlignLeft
                className="text-[#626262]"
                strokeWidth={3.3}
                size={16}
              />
              <span className="text-[1.1rem] text-[#626262] font-bold">
                Question
              </span>
            </div>
            <p className="text-[0.95rem] text-white font-medium mb-4 self-start">
              {props.question}
            </p>
            <p className="text-[0.75rem] text-[#424242] mt-3 font-medium text-center px-3">
              Review the above carefully before confirming. Once made, your
              prediction is irreversible.
            </p>
          </div>
        </motion.div>
      )}
      <div
        style={{ marginTop: loading || success ? "3.8rem" : 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <motion.button
          onClick={() => props.setStep(1)}
          className="mt-3 py-2 px-6 rounded-full bg-[#1D1D1D] text-lg text-[#D9D9D9] font-bold"
          initial={{ width: "12vw" }}
          animate={{
            width: success ? "0vw" : "12vw",
            opacity: success ? 0 : 1,
          }}
        >
          Back
        </motion.button>
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
                className="mt-3 py-2 px-6 z-10 rounded-full bg-[#D9D9D9] self-center text-lg text-[#1D1D1D] font-bold flex items-center justify-center gap-1"
                initial={{ width: "24vw" }}
              >
                <div className="flex items-center gap-2">
                  <ShareIcon className="text-black" strokeWidth={3} size={23} />

                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: success ? 1 : 0 }}
                    className="transition-opacity duration-500"
                  >
                    Share your Prediction
                  </motion.span>
                </div>
              </motion.button>
            </DesktopShareBetModal>
          </div>
        ) : (
          <motion.button
            onClick={() => {
              executePrediction();
            }}
            className="mt-3 py-2 px-6 z-10 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D] font-bold flex items-center justify-center gap-1"
            initial={{ width: "12vw" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              width: success ? "24vw" : "12vw",
              marginLeft: success ? "-3.3rem" : "1rem",
              alignSelf: success ? "center" : "",
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loader"></span>
                <span>Predicting</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {success ? (
                  <ShareIcon className="text-black" strokeWidth={3} size={23} />
                ) : (
                  <ScanFace className="text-black" strokeWidth={3} size={23} />
                )}
                {!success ? (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: success ? 0 : 1 }}
                    className="transition-opacity duration-500"
                  >
                    Predict
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: success ? 1 : 0 }}
                    className="transition-opacity duration-500"
                  >
                    Share your Prediction
                  </motion.span>
                )}
              </div>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
