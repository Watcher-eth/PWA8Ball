// @ts-nocheck

import React from "react";
import { X, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface RemoveLPOverviewProps {
  setIsOpen: () => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  title: string;
  amount: string;
  multiplier: string;
  totalPot: number;
  isDesktop?: boolean;
}

export const CashoutOverview: React.FC<RemoveLPOverviewProps> = (props) => {
  const width = window.innerWidth;

  return (
    <div
      className={`flex flex-col items-center ${
        props?.isDesktop
          ? "bg-transparent p-2.5 mt-2.5"
          : "bg-[#101010] p-[30px_20px] mt-[50px]"
      } rounded-[30px] self-center`}
    >
      <div className="flex flex-row items-center justify-between w-full mb-[18px] font-semibold">
        <div className="flex flex-row items-center">
          <div className="p-2 bg-[#1C1C1C] rounded-[20px]">
            <Clock strokeWidth={4} color={"lightgray"} size={17} />
          </div>
          <span className="ml-2 text-[22px] text-white">{props.title}</span>
        </div>
        <motion.div
          onClick={() => props.onClose()}
          className="p-[8.5px_6px] rounded-[17px] overflow-hidden bg-[#1C1C1C] self-start cursor-pointer"
        >
          <X color={"#585858"} strokeWidth={5.5} height={18} />
        </motion.div>
      </div>
      <div
        className={`flex flex-col p-5 rounded-[20px] items-center justify-center w-full ${
          props?.isDesktop ? "bg-[#171717]" : "bg-[#1C1C1C]"
        } mt-2.5`}
      >
        <span className="text-[50px] text-white font-extrabold">
          ${props?.totalPot?.toFixed(2)}
        </span>
        <span className="text-[15px] text-lightgray font-medium mt-[-11px]">
          Unresolved
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full my-2 mt-7">
        <span className="text-[17px] text-[#909090] font-semibold">
          Possible Multiplier
        </span>
        <span className="text-[19px] font-semibold text-white">3x</span>
      </div>
      <div className="flex flex-row items-center justify-between w-full my-2">
        <span className="text-[17px] text-[#909090] font-semibold">
          Current Payout
        </span>
        <span className="text-[19px] font-semibold text-white">
          ${props?.totalPot.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-row items-center justify-between w-full my-2">
        <span className="text-[17px] text-[#909090] font-semibold">
          Cred earned
        </span>
        <span className="text-[19px] font-semibold text-white">
          {(props?.totalPot * 2).toFixed(0)} $Cred
        </span>
      </div>
      <div className="flex flex-row items-center gap-1 w-full mb-1 mt-2.5">
        <motion.div
          onClick={() =>
            props?.isDesktop ? props.changeStep(4) : props?.changeStep(1)
          }
          className={`mt-3 flex flex-row p-${
            props?.isDesktop ? "2.5" : "3.5"
          } rounded-full overflow-hidden bg-[#1D1D1D] w-${
            props?.isDesktop ? "1/2" : "1/2"
          } items-center justify-center cursor-pointer`}
        >
          <span className="text-[20px] text-[#D9D9D9] font-extrabold ml-1.5">
            Cancel
          </span>
        </motion.div>
        <motion.div
          onClick={() =>
            props?.isDesktop ? props.changeStep(3) : props?.changeStep(4)
          }
          className={`mt-3 flex flex-row ml-4 p-${
            props?.isDesktop ? "2.5" : "2.75"
          } rounded-full overflow-hidden bg-[#D9D9D9] w-${
            props?.isDesktop ? "1/2" : "1/2"
          } items-center justify-center cursor-pointer`}
        >
          <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-0.5">
            Cashout
          </span>
        </motion.div>
      </div>
    </div>
  );
};
