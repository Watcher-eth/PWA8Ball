// @ts-nocheck

import React from "react";
import { X, Clock, AlignLeft, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useCashOutPrediction } from "@/hooks/actions/useCashOutPrediction";

interface RemoveLPOverviewProps {
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
}

export const CashoutOverview: React.FC<RemoveLPOverviewProps> = (props) => {
  const width = window.innerWidth;
  const { cashOutPrediction, loading, success } = useCashOutPrediction();

  console.log("option", props.option, props.options?.name);
  // return (
  //   <div
  //     className={`flex flex-col  items-center ${
  //       props?.isDesktop
  //         ? "bg-transparent p-2.5 mt-2.5"
  //         : "bg-[#101010] p-[30px_20px] mt-[50px]"
  //     } rounded-[30px] self-center`}
  //   >
  //     <div className="flex flex-row items-center justify-between w-full mb-[18px] font-semibold">
  //       <div className="flex flex-row items-center">
  //         <div className="p-2 bg-[#1C1C1C] rounded-[20px]">
  //           <Clock strokeWidth={4} color={"lightgray"} size={17} />
  //         </div>
  //         <span className="ml-2 text-[22px] text-white">{props.title}</span>
  //       </div>
  //       {props?.isDesktop ? (
  //         <div className="p-[8.5px]" />
  //       ) : (
  //         <motion.div
  //           onClick={() => onClose()}
  //           className="p-[8.5px] rounded-[17px] overflow-hidden bg-[#1C1C1C] cursor-pointer"
  //         >
  //           <X color={"#585858"} strokeWidth={5} height={18} />
  //         </motion.div>
  //       )}
  //     </div>
  //     <div
  //       className={`flex flex-col p-5 rounded-[20px] items-center justify-center w-full ${
  //         props?.isDesktop ? "bg-[#121212]" : "bg-[#121212]"
  //       } mt-2.5`}
  //     >
  //       <span className="text-[50px] text-white font-extrabold">
  //         ${(props?.totalPot / 10 ** 6).toFixed(2)}
  //       </span>
  //       <span className="text-[15px] text-[lightgray] font-medium mt-[-11px]">
  //         Unresolved
  //       </span>
  //     </div>
  //     <div className="flex flex-row items-center justify-between w-full my-2 mt-7">
  //       <span className="text-[17px] text-[#909090] font-semibold">
  //         Possible Multiplier
  //       </span>
  //       <span className="text-[19px] font-semibold text-white">3x</span>
  //     </div>
  //     <div className="flex flex-row items-center justify-between w-full my-2">
  //       <span className="text-[17px] text-[#909090] font-semibold">
  //         Current Payout
  //       </span>
  //       <span className="text-[19px] font-semibold text-white">
  //         ${(props?.totalPot / 10 ** 6).toFixed(2)}
  //       </span>
  //     </div>
  //     <div className="flex flex-row items-center justify-between w-full my-2">
  //       <span className="text-[17px] text-[#909090] font-semibold">
  //         Cred earned
  //       </span>
  //       <span className="text-[19px] font-semibold text-white">
  //         {((props?.totalPot / 10 ** 6) * 2).toFixed(0)} $Cred
  //       </span>
  //     </div>
  //     <div className="flex flex-row items-center gap-1 w-full mb-1 mt-2.5">
  //       <motion.div
  //         onClick={() => {
  //           props?.changeStep(1);
  //         }}
  //         className={`mt-3 flex flex-row p-${
  //           props?.isDesktop ? "2.5" : "3.5"
  //         } rounded-full overflow-hidden bg-[#1D1D1D] w-${
  //           props?.isDesktop ? "1/2" : "1/2"
  //         } items-center justify-center cursor-pointer`}
  //       >
  //         <span className="text-[20px] text-[#D9D9D9] font-extrabold ml-1.5">
  //           Cancel
  //         </span>
  //       </motion.div>
  //       <motion.div
  //         onClick={() =>
  //           props?.isDesktop ? props.changeStep(3) : props?.changeStep(4)
  //         }
  //         className={`mt-3 flex flex-row ml-4 p-${
  //           props?.isDesktop ? "2.5" : "2.75"
  //         } rounded-full overflow-hidden bg-[#D9D9D9] w-${
  //           props?.isDesktop ? "1/2" : "1/2"
  //         } items-center justify-center cursor-pointer`}
  //       >
  //         <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-0.5">
  //           Cashout
  //         </span>
  //       </motion.div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center w-full bg-[#0c0c0c] md:bg-[#080808] py-1 mt-5 -mb-9 md:mb-0 rounded-lg min-h-[585px] md:min-h-full">
      <motion.div className="flex flex-col items-center w-full bg-[#0c0c0c]  md:bg-[#080808] px-3 md:px-3  rounded-lg">
        <div className="flex flex-col w-full my-2 mt-0">
          <img
            src={props.image}
            alt={props.title}
            className="h-16 w-16 object-cover rounded-full"
          />
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
          <p className="text-sm text-[#525252] mt-3 font-medium text-center px-3">
            Review the above carefully before confirming. Cashing out is not
            reversible.
          </p>
        </div>
      </motion.div>

      <div
        style={{ marginTop: loading || success ? "3.8rem" : 0 }}
        className="flex w-full items-center gap-2 mb-4 px-3 md:px-0 justify-between"
      >
        <motion.button
          onClick={() => {
            props?.changeStep(1);
          }}
          className={`
      mt-3 py-2 px-6 rounded-full w-[48%] bg-[#151515] text-lg text-[#D9D9D9] font-bold
    `}
          animate={{
            opacity: success ? 0 : 1,
          }}
        >
          Back
        </motion.button>

        <motion.button
          onClick={cashOutPrediction}
          className="mt-3 py-2  px-6 rounded-full w-[48%] bg-[#D9D9D9] text-lg text-[#1D1D1D] font-bold flex items-center justify-center gap-1"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="loader"></span>
              <span>Cashing out</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <ArrowDown color="#1D1D1D" strokeWidth={3.5} size={"1.25rem"} />
              <div>Cashout</div>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};
