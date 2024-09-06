// @ts-nocheck

import React from "react";
import { X, Clock, AlignLeft, ArrowDown, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCashOutPrediction } from "@/hooks/actions/useCashOutPrediction";
import { TxStatusButton } from "@/components/common/Animated/AnimatedTxStatus";

interface CashoutOverviewProps {
  setIsOpen: () => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  question: string;
  title: string;
  amount: string;
  multiplier: string;
  totalPot: number;
  isDesktop?: boolean;
  id: number;
  refetch: () => void;
}

export const CashoutOverview: React.FC<CashoutOverviewProps> = (props) => {
  const width = window.innerWidth;
  const { cashOutPrediction, loading, success, error } = useCashOutPrediction();

  return (
    <div className="flex flex-col items-center w-full bg-[#0c0c0c] md:bg-[#080808] py-1 mt-5 -mb-9 md:mb-0 rounded-lg min-h-[585px] md:min-h-full">
      <motion.div className="flex flex-col items-center w-full bg-[#0c0c0c]  md:bg-[#080808] px-3 md:px-3  rounded-lg">
        <div className="flex relative flex-col w-full my-2 mt-0">
          <img
            src={props.image}
            alt={props.title}
            className="h-16 w-16 object-cover rounded-full"
          />
          <div className="absolute left-11 bottom-0 h-7 w-7 flex items-center justify-center rounded-full bg-[#101010] border border-[#252525]">
            <ArrowLeftRight size={17} color="white" strokeWidth={4} />
          </div>
        </div>
        <h2 className="text-2xl text-white font-bold mb-2 self-start">
          {success
            ? "Cashed out succesfully!"
            : `Cash out your prediction for: ${props.title}`}
        </h2>

        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between my-2 w-full">
            <span className="text-lg text-[#626262] font-semibold">
              Your Prediction
            </span>
            <div
              style={{ borderRadius: 10 }}
              className={`flex items-center px-2.5  rounded-md ${
                props.option === 0 ? "bg-[#75171D]" : "bg-[#013145]"
              }`}
            >
              <span
                className={`text-md font-semibold ${
                  props.option === 0 ? "text-[#E23B3B]" : "text-[#0596FF]"
                }`}
              >
                {props.options?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between my-2 w-full">
            <span className="text-lg  text-[#626262] font-semibold">
              Current value
            </span>
            <span className="text-lg text-white font-bold">
              ${(props?.totalPot / 10 ** 6).toPrecision(3)}
            </span>
          </div>
          <div className="flex items-center justify-between my-2 w-full">
            <span className="text-lg  text-[#626262] font-semibold">Fees</span>
            <span className="text-lg text-white font-bold">
              ${((props?.totalPot / 10 ** 6) * 0.025).toPrecision(2)}
            </span>
          </div>
          <div className="flex items-center justify-between my-2 mb-2 w-full">
            <span className="text-lg  text-[#626262] font-semibold">
              Potential Payout
            </span>
            <span className="text-lg text-white font-bold">
              $
              {props.option === 2
                ? ((100 / props.odds) * (props?.totalPot / 10 ** 6)).toFixed(2)
                : (
                    (100 / (100 - props.odds)) *
                    (props?.totalPot / 10 ** 6)
                  ).toFixed(2)}
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
          <p className="text-sm text-[#525252] mt-8 font-medium text-center px-3">
            Review the above carefully before confirming. Cashing out is not
            reversible.
          </p>
        </div>
      </motion.div>

      <div className="flex w-full items-center gap-2 mb-1 px-3 md:px-0 pt-3.5 justify-between">
        <motion.button
          onClick={() => {
            props?.changeStep(1);
          }}
          className={`
     h-12 px-5 rounded-full w-[48%] bg-[#121212] text-[1.35rem]  text-[#D9D9D9] font-bold
    `}
        >
          Back
        </motion.button>
        {loading || success || error ? (
          <TxStatusButton
            minWidth={"min-w-[48%]"}
            height="h-12"
            isPending={loading}
            isSuccess={success}
            isError={error}
            pendingText="Cashing out"
            successText="Success"
            errorText="Cashout Failed"
          />
        ) : (
          <motion.button
            onClick={() => {
              cashOutPrediction({
                points: props?.amount,
                option: props?.option,
                marketId: props?.id,
                options: props?.options,
              });
              setTimeout(() => {
                props?.refetch();
              }, 11000);
            }}
            className="h-12  px-6 rounded-full w-[48%] bg-[#D9D9D9] text-lg text-[#1D1D1D] font-bold flex items-center justify-center gap-1"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loader"></span>
                <span>Cashing out</span>
              </div>
            ) : (
              <div className="flex items-center text-[1.35rem] gap-1.5">
                <ArrowDown color="#1D1D1D" strokeWidth={3.5} size={"1.35rem"} />
                <div>Cashout</div>
              </div>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};
