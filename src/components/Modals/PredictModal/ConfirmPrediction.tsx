// @ts-nocheck

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AlignLeft, ScanFace, ShareIcon, Vote } from "lucide-react";
import { useVotingStore } from "@/lib/stores/VotingStore";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { useUserStore } from "@/lib/stores/UserStore";
import { usePredictV2 } from "@/lib/onchain/mutations/PredictV2";
import { LoadingPrediction } from "./SuccessScreen";
import { useRouter } from "next/router";
import { getProfilePath } from "@/utils/urls";
import { SharePredictButton } from "@/components/buttons/SharePredictButton";
import { toast } from "sonner";

import { useExecutePrediction } from "@/hooks/actions/useExecutePrediction";

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
  const router = useRouter();
  const { executePrediction, loading, success } = useExecutePrediction();



  const amount = useVotingStore((state) => state.amount);

  const shareLink = async () => {
    try {
      // await navigator.share({
      //   title: `${userCon.name} just predicted ${options[Option - 1]}`,
      //   text: `I just predicted ${
      //     options[Option - 1]
      //   } for ${question}. What do you think?`,
      //   url: "https://tryblitz.xyz",
      // });
    } catch (error) {
      console.error("Error during sharing", error);
    }
  };
  console.log("props", props.option, Number(props.option) === 1);
  return (
    <div className="flex flex-col items-center w-full bg-[#131313] py-4 pt-0 mt-5 rounded-lg min-h-[585px]">
      {loading || success ? (
        // <LoadingPrediction
        //   image={image}
        //   loading={loading}
        //   question={question}
        //   option={Option}
        //   success={success && !loading}
        //   answer={options[Option - 1].name}
        // />
        <LoadingPrediction
          image={props.image}
          question={props.question}
          answer={props.options[props.option]}
          option={props.option}
          loading={loading}
          success={success}
        />
      ) : (
        <motion.div className="flex flex-col items-center w-full bg-[#131313] px-6  rounded-lg">
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
                className={`flex items-center px-2 py-1 rounded-lg ${
                  props.option === 0 ? "bg-[#75171D]" : "bg-[#013145]"
                }`}
              >
                <span
                  className={`text-md font-semibold ${
                    props.option === 0 ? "text-[#E23B3B]" : "text-[#0596FF]"
                  }`}
                >
                  {Number(props.option) === 1
                    ? props.options[props.option]
                    : props.options[props.option]}
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
                {props.option === 2
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
              <span className="text-lg text-[#626262] font-bold">Question</span>
            </div>
            <p className="text-md text-white font-medium mb-4 self-start">
              {props.question}
            </p>
            <p className="text-sm text-[#424242] mt-3 font-medium text-center px-3">
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
        {!success && (
          <motion.button
            onClick={() => props.setStep(1)}
            className={`
            mt-3 py-2 px-6 rounded-full bg-[#1D1D1D] text-lg text-[#D9D9D9] font-bold
            ${success ? "w-[0vw]" : "w-[40vw]"}
          `}
            initial={{ width: "40vw" }}
            animate={{
              opacity: success ? 0 : 1,
            }}
          >
            Back
          </motion.button>
        )}
        <motion.button
          onClick={() => {
            success
              ? shareLink()
              : executePrediction({
                  amount,
                  option,
                  marketId,
                  options,
                });
          }}
          className="mt-3 py-2 px-6 rounded-full bg-[#D9D9D9] text-lg text-[#1D1D1D] font-bold flex items-center justify-center gap-1"
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
      </div>
    </div>
  );
}
