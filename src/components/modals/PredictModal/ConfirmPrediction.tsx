// @ts-nocheck

import { motion } from "framer-motion";
import { AlignLeft } from "lucide-react";
import { useVotingStore } from "@/lib/stores/VotingStore";
import { SharePredictButton } from "@/components/buttons/SharePredictButton";

import { useExecutePrediction } from "@/hooks/actions/useExecutePrediction";

import { TxStatusButton } from "@/components/common/Animated/AnimatedTxStatus";
import { useReferralStore } from "@/lib/stores/ReferralStore";
import { useUserStore } from "@/lib/stores/UserStore";
import dynamic from "next/dynamic";
import { useState } from "react";

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

export function ConfirmPrediction(props: {
  setStep: (step: number) => void;
  image: string;
  option: string;
  options: string[];
  question: string;
  title: string;
  id: string;
  odds: number;
}) {
  const { executePrediction, loading, success, error } = useExecutePrediction();
  const { user } = useUserStore();
  const amount = useVotingStore((state) => state.amount);
  const option = useVotingStore((state) => state.option);
  const refId = useReferralStore((state) => state.referralId);
  const [visible, setVisible] = useState(false);

  const shareLink = async () => {
    try {
      await navigator.share({
        title: `${userCon.name} just predicted ${options[Option - 1]}`,
        text: `I just predicted ${
          options[Option - 1]
        } for ${question}. What do you think?`,
        url: `https://tryglimpse.xyz?ref=${user?.walletAddress}`,
      });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };
  return (
    <div className="flex flex-col items-center w-full bg-[#090909] py-4 pt-0 mt-5 rounded-lg min-h-[485px]">
      <MoonPayBuyWidget
        variant="overlay"
        baseCurrencyCode="usd"
        baseCurrencyAmount="35"
        defaultCurrencyCode="USDC"
        visible={visible}
        walletAddress={user?.walletAddress}
      />
      <motion.div className="flex flex-col items-center w-full bg-[#090909] px-6  rounded-lg">
        <div className="flex flex-col w-full my-2 mt-0">
          <img
            src={props.image}
            alt={props.title}
            className="h-16 w-16 object-cover rounded-full"
          />
        </div>
        <h2 className="text-2xl text-white font-bold mb-2 self-start">
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
              className={`flex items-center px-3 py-1 rounded-lg ${
                props.option === 0 ? "rgb(255, 63, 63, 0.1)" : "bg-[#013145]"
              }`}
            >
              <span
                className={`text-md font-semibold ${
                  props.option === 0 ? "text-[#E23B3B]" : "text-[#0596FF]"
                }`}
              >
                {Number(props.option) === 1
                  ? props.options[1]
                  : props.options[0]}
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
            <span className="text-lg  text-[#424242] font-semibold">Fees</span>
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
              {props.option === 2
                ? ((100 / props.odds) * amount).toFixed(2)
                : ((100 / (100 - props.odds)) * amount).toFixed(2)}
            </span>
          </div>
          <div className="w-full  bg-[#424242] h-px my-3"></div>
          <div className="flex items-center self-start mb-0 gap-1">
            <AlignLeft className="text-[#626262]" strokeWidth={3.3} size={16} />
            <span className="text-lg text-[#626262] font-bold">Question</span>
          </div>
          <p className="text-md text-white font-medium mb-4 self-start">
            {props.question}
          </p>
          <p className="text-sm text-[#424242] mt-40 font-medium text-center px-3">
            Review the above carefully before confirming. Once made, your
            prediction is irreversible.
          </p>
        </div>
      </motion.div>

      <div
        style={{ marginTop: 0 }}
        className="flex  pt-3 w-full px-5 items-center gap-2 mb-4"
      >
        <motion.button
          onClick={() => {
            props.setStep(1);
          }}
          className={`
            py-2 px-6 w-1/2 rounded-full bg-[#1D1D1D] text-lg text-[#D9D9D9] font-bold
           
          `}
        >
          Back
        </motion.button>

        {success || loading || error ? (
          <TxStatusButton
            height="h-12"
            isPending={loading}
            isSuccess={success}
            isError={error}
            pendingText="Processing"
            successText="Success"
            errorText="Prediction Failed"
          />
        ) : (
          <motion.button
            onClick={() => {
              success
                ? shareLink()
                : executePrediction({
                    amount,
                    option: props.option,
                    marketId: props?.id,
                    options: props?.options,
                    referrer: refId,
                  });
            }}
            className="py-2 px-6 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D] font-bold flex items-center justify-center gap-1"
            initial={{ width: "40vw" }}
            animate={{
              width: success ? "80vw" : "40vw",
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
                <SharePredictButton success={success} />
              </div>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
