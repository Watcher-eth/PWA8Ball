// @ts-nocheck
import { motion } from "framer-motion";
import { RemoveLiquidityModal } from "./LpModal/RemoveLiquidityModal";
import { DesktopLpModal } from "./LpModal/DesktopLpModal";

export function LiquidityPosition({
  image,
  title,
  amount,
  id,
  onChange,
  refetch,
}: {
  image: string;
  title: string;
  amount: number;
  id: number;
  onChange: () => void;
  refetch: () => void;
}) {
  return (
    <RemoveLiquidityModal
      refetch={refetch}
      title={title}
      id={id}
      image={image}
      amount={amount}
    >
      <motion.div className="flex flex-col w-[74vw] px-3.5  pt-3 pb-3 rounded-t-[13px] bg-[rgba(20,20,20,0.78)] relative cursor-pointer ">
        <img
          className="h-full  w-[90vw] rounded-[13px] object-cover absolute z-0 filter  scale-[1.2]"
          src={image}
          alt="background"
        />
        <div className="h-full bg-[#080808]/50 w-full rounded-[13px] object-cover absolute z-0 filter  scale-[1.2]" />

        <div className="flex flex-row justify-between items-center mb-[25px] relative z-2 scale-[1.1]">
          <div className="flex flex-col items-start ">
            <span className="text-[18.5px]  text-[rgba(250,250,250,0.9)] font-['Aeonik-Bold']">
              {title}
            </span>
            <span className="text-[14.5px] text-white font-[Aeonik] mt-0">
              +{amount.toFixed(2)}$ Fees earned
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between w-[75vw] items-center relative z-2 absolute -bottom-8 scale-[1.1]">
          <div className="flex flex-row">
            <span className="text-[15px] text-white font-['Aeonik-Bold'] self-start mt-[5px]">
              $
            </span>
            <span className="text-[30px] text-white font-['Aeonik-Bold']">
              {(amount + amount).toFixed(2)}
            </span>
          </div>
          <motion.button
            onClick={() => {
              refetch();
            }}
            className="py-[5px] px-[10px] rounded-[17px] flex justify-center items-center overflow-hidden bg-[rgba(20,20,20,0.3)] border-none cursor-pointer"
          >
            <span className="text-[13px] text-white  font-[600]">
              Withdraw Boost
            </span>
          </motion.button>
        </div>
      </motion.div>
    </RemoveLiquidityModal>
  );
}

export function DesktopLiquidityPosition({
  image,
  title,
  amount,
  id,
  amountLp,
  onChange,
  refetch,
}: {
  image: string;
  title: string;
  amount: number;
  id: number;
  amountLp: number;
  onChange: () => void;
  refetch: () => void;
}) {
  return (
    <DesktopLpModal
      image={image}
      title={title}
      amount={amount}
      id={id}
      refetch={refetch}
      amountLp={amountLp}
    >
      <motion.div className="flex min-h-[20vh] border-2 border-[#151515]/10 justify-between hover:scale-101 active:scale-97 flex-col p-3.5 pt-3 pb-3 rounded-[15px] bg-[rgba(49,49,49,0.78)] mb-[15px] relative cursor-pointer overflow-hidden">
        <img
          className="h-full  w-full rounded-[15px] object-cover absolute z-0 filter  scale-[1.2]"
          src={image}
          alt="background"
        />
        <div className="h-full bg-[#080808]/50 w-full rounded-[15px] object-cover absolute z-0 filter  scale-[1.2]" />
        <div className="flex h-full flex-row justify-between items-center mb-[25px] relative z-2">
          <div className="flex h-full flex-col items-start mt-1">
            <span className="text-[20.5px] text-[rgba(250,250,250,0.95)] font-['Aeonik-Bold']">
              {title}
            </span>
            <span className="text-[15.5px] text-white  mt-0">
              +{(amount / 11).toFixed(2)}$ Fees earned
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center relative z-2">
          <div className="flex flex-row">
            <span className="text-[15px] text-white font-['Aeonik-Bold'] self-start mt-[5px]">
              $
            </span>
            <span className="text-[30px] text-white font-['Aeonik-Bold']">
              {(amount + amount / 11).toFixed(2)}
            </span>
          </div>
          <motion.button
            onClick={() => {}}
            className="py-[5.5px] px-[10px] rounded-[17px] backdrop-blur-xl border-[0.1rem] border-[#303030]/20 overflow-hidden bg-[rgba(20,20,20,0.2)] cursor-pointer"
          >
            <span className="text-[14px] text-white font-['Aeonik-Bold'] font-normal">
              Withdraw Boost
            </span>
          </motion.button>
        </div>
      </motion.div>
    </DesktopLpModal>
  );
}
