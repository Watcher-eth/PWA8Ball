import React from "react";
import { motion } from "framer-motion";
import { X, WalletCards, ArrowDown } from "lucide-react";

interface RemoveLPOverviewProps {
  setStep: (num: number) => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  title: string;
  amount: string;
  multiplier: string;
  totalPot: number;
  isDesktop?: boolean;
}

export const Overview: React.FC<RemoveLPOverviewProps> = (props) => {
  return (
    <div
      className={`flex flex-col items-center ${
        props?.isDesktop
          ? "bg-[#080808] p-3 mt-2 rounded-[10px]"
          : "bg-[#131313] p-5 mt-[50px] rounded-[30px]"
      } w-full`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center">
          <img
            className="h-[35px] w-[35px] rounded-[18px] object-cover mr-1.5"
            src={props?.image}
            alt="Profile"
          />
          <span className="ml-2 font-semibold text-[20px] text-white">
            {props?.title}
          </span>
        </div>
        <motion.button
          onClick={props.onClose}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 px-1.5 rounded-full bg-[#1C1C1C] border-none"
        >
          <X color={"#585858"} strokeWidth={5} height={18} />
        </motion.button>
      </div>
      <div className="flex flex-col items-center justify-center w-full p-5 rounded-[20px] bg-[#1C1C1C] mt-5 mb-5">
        <span className="font-bold text-[52px] text-white">
          ${(props?.totalPot * 1.09).toFixed(2)}
        </span>
        <span className="font-normal text-[15px] text-lightgray">
          Cred Multiplier 3x
        </span>
      </div>
      {[
        {
          label: "Fees earned",
          value: `$${(props?.totalPot * 0.09).toFixed(2)}`,
        },
        { label: "Base Cred", value: `${props?.totalPot} $Cred` },
        {
          label: "Bonus Rewards",
          value: `${(props?.totalPot * 2).toFixed(0)} $Cred`,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between w-full my-1"
        >
          <span className="font-normal text-[17.5px] text-lightgray">
            {item.label}
          </span>
          <span className="font-normal text-[20px] text-white">
            {item.value}
          </span>
        </div>
      ))}
      <div className="flex flex-row items-center gap-1.5 mt-2 mb-1 w-full">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex flex-row items-center justify-center w-1/2 p-3.5 bg-[#1D1D1D] rounded-full mt-3"
        >
          <WalletCards color="#D9D9D9" strokeWidth={3} height={20} />
          <span className="ml-1.5 text-[20px] font-extrabold text-[#D9D9D9]">
            Hold
          </span>
        </motion.button>
        <motion.button
          onClick={() => props.setStep(2)}
          whileTap={{ scale: 0.95 }}
          className="flex flex-row items-center justify-center w-1/2 p-2.5 bg-[#D9D9D9] rounded-full mt-3 ml-4"
        >
          <ArrowDown color="black" strokeWidth={3} height={23} />
          <span className="ml-0.5 text-[20px] font-extrabold text-[#1D1D1D]">
            Withdraw
          </span>
        </motion.button>
      </div>
    </div>
  );
};
