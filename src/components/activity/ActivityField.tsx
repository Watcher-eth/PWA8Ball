// @ts-nocheck
import { motion } from "framer-motion";
import {
  MobileMyBetModal,
  DesktopMyBetModal,
} from "../common/Charts/MyBetModal";

export function ActivityField({
  index,
  pfp,
  name,
  amount,
  title,
  image,
  question,
  option,
  options,
  isDesktop,
  id,
  initialProb,
  userId,
  onOpenBottomSheet,
}: {
  index: number;
  pfp: string;
  name: string;
  amount: number;
  title: string;
  image: string;
  question: string;
  userId: string;
  isDesktop?: boolean;
  options: string[];
  option: { name: string; value: number; index: number };
  id: string;
  initialProb: number;
  onOpenBottomSheet: () => void;
}) {
  const MotionDivContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`flex flex-row items-center justify-between
     
      ${
        isDesktop
          ? "bg-[transparnet] p-[0px] my-5  rounded-[13px]"
          : "mx-[10px]  my-[13.5px]"
      } `}
      onClick={onOpenBottomSheet}
    >
      <div className="flex flex-row items-center relative">
        <img
          src={image}
          alt="Prediction"
          className={`h-[50px] w-[50px] object-cover ${
            isDesktop ? "rounded-[6px]" : "rounded-[10px]"
          }`}
        />
        <img
          src={pfp}
          alt="Profile"
          className="h-[25px] w-[25px] object-cover rounded-[15px] absolute bottom-[-6px] left-[32px] border-[3px] border-[#1B1B1E]"
        />
        <div className="flex flex-col -space-y-0.5 ml-[12.5px] mr-[-36px] max-w-full">
          <h3 className="text-[18px] text-white font-[600]">{name}</h3>
          <p className="text-[15.5px] text-[lightgray] font-normal overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <p className="text-[17px] text-white font-[600]">${amount}</p>
        <p
          className={`text-[14px] px-2 py-0 rounded-md ${
            option?.index === 1 ? "bg-[#FF0050]" : "bg-[#0067E1]"
          } text-white font-[600]`}
        >
          {option.name?.length < 8 ? option.name : option.name?.substring(0, 3)}
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
        ownedAmount={amount}
        betId={id}
        topic={id}
        question={question}
        options={option}
        option={0}
        optionNumber={0}
        name={name}
        userId={userId}
        isExternal={true}
        initialProb={initialProb}
      >
        <MotionDivContent />
      </MyBetModalComponent>
    </div>
  );
}
