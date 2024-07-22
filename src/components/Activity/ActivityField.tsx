// @ts-nocheck

import { parseOption, parseOptionJSON } from "@/utils/predictions/parseOption";
import { motion } from "framer-motion";
import {
  MobileMyBetModal,
  DesktopMyBetModal,
} from "../common/Charts/MyBetModal";

export const ActivityField = ({
  index,
  pfp,
  name,
  amount,
  title,
  image,
  question,
  option,
  isDesktop,
  onOpenBottomSheet,
}: {
  index: number;
  pfp: string;
  name: string;
  amount: number;
  title: string;
  image: string;
  question: string;
  isDesktop?: boolean;
  option: { name: string; value: number };
  onOpenBottomSheet: () => void;
}) => {
  const MotionDivContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`flex flex-row items-center justify-between
      my-[13.5px]
      ${isDesktop ? "bg-[#121212] p-[11px] rounded-[13px]" : "mx-[10px]"} `}
      onClick={onOpenBottomSheet}
    >
      <div className="flex flex-row items-center relative">
        <img
          src={image}
          alt="Prediction"
          className={`h-[50px] w-[50px] object-cover ${
            isDesktop ? "rounded-[7px]" : "rounded-[30px]"
          }`}
        />
        <img
          src={pfp}
          alt="Profile"
          className="h-[25px] w-[25px] object-cover rounded-[15px] absolute bottom-[-6px] left-[32px] border-[2.4px] border-[#1B1B1E]"
        />
        <div className="flex flex-col gap-0 ml-[12.5px] mr-[-36px] max-w-full">
          <h3 className="text-[17px] text-white font-bold">{name}</h3>
          <p className="text-[14.5px] text-lightgray font-normal overflow-hidden whitespace-nowrap max-w-[78vw] text-ellipsis">
            {title}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-[3px]">
        <p className="text-[18px] text-white font-bold">
          ${(amount / 10).toFixed(2)}
        </p>
        <p className="text-[14px] text-[#C7C7C7] font-bold">
          {parseOption(option)?.length < 8
            ? parseOption(option)
            : parseOption(option)?.substring(0, 3)}
        </p>
      </div>
    </motion.div>
  );

  const MyBetModalComponent = isDesktop ? DesktopMyBetModal : MobileMyBetModal;
  return (
    <div>
        <MyBetModalComponent
          key={`predicted-${id}-${option}`}
          title={title}
          image={image}
          price={amount}
          ownedAmount={amount / 100000}
          percentage={percentage}
          betId={id}
          topic={id}
          icon={icon}
          question={question}
          option={option}
          optionNumber={optionNumber}
          isExternal={isExternal}
        >
          <MotionDivContent />
        </MyBetModalComponent>
    </div>
  );
};
