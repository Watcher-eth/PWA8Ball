// @ts-nocheck
import { motion } from "framer-motion";
import { RemoveLiquidityModal } from "./RemoveLiquidityModal";
import { DesktopLPModal } from "@/components/Modals/Desktop/DesktopLPModal";

export function LiquidityPosition({
  image,
  title,
  amount,
  id,
  onChange,
}: {
  image: string;
  title: string;
  amount: number;
  id: number;
  onChange: () => void;
}) {
  return (
    <RemoveLiquidityModal title={title} id={id} image={image} amount={amount}>
      <motion.div className="flex flex-col p-3.5 pt-3 pb-3 rounded-[15px] bg-[rgba(49,49,49,0.78)] mb-[15px] relative cursor-pointer overflow-hidden">
        <img
          className="h-full w-full rounded-[15px] object-cover absolute z-0 filter blur-[35px] scale-[1.2]"
          src={image}
          alt="background"
        />

        <div className="flex flex-row justify-between items-center mb-[25px] relative z-2">
          <div className="flex flex-col">
            <span className="text-[18.5px] text-[rgba(250,250,250,0.9)] font-['Aeonik-Bold']">
              {title}
            </span>
            <span className="text-[14.5px] text-white font-['Aeonik-Regular'] mt-0">
              +{(amount / 11).toFixed(2)}$ Fees earned
            </span>
          </div>
          <img
            className="h-[43px] w-[43px] rounded-[10px] overflow-hidden object-cover"
            src={image}
            alt="icon"
          />
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
            className="py-[5.5px] px-[10px] rounded-[17px] overflow-hidden bg-[rgba(20,20,20,0.2)] border-none cursor-pointer"
          >
            <span className="text-[14px] text-white font-['Aeonik-Bold'] font-normal">
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
  onChange,
}: {
  image: string;
  title: string;
  amount: number;
  id: number;
  onChange: () => void;
}) {
  return (
    <DesktopLPModal image={image} title={title} amount={amount} id={id}>
      <motion.div className="flex min-h-[20vh] justify-between hover:scale-101 active:scale-97 flex-col p-3.5 pt-3 pb-3 rounded-[15px] bg-[rgba(49,49,49,0.78)] mb-[15px] relative cursor-pointer overflow-hidden">
        <img
          className="h-full  w-full rounded-[15px] object-cover absolute z-0 filter blur-[35px] scale-[1.2]"
          src={image}
          alt="background"
        />

        <div className="flex h-full flex-row justify-between items-center mb-[25px] relative z-2">
          <div className="flex h-full flex-col items-start">
            <span className="text-[18.5px] text-[rgba(250,250,250,0.9)] font-['Aeonik-Bold']">
              {title}
            </span>
            <span className="text-[14.5px] text-white  mt-0">
              +{(amount / 11).toFixed(2)}$ Fees earned
            </span>
          </div>
          <img
            className="h-14 w-14 rounded-[10px] overflow-hidden object-cover"
            src={image}
            alt="icon"
          />
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
            className="py-[5.5px] px-[10px] rounded-[17px] overflow-hidden bg-[rgba(20,20,20,0.2)] border-none cursor-pointer"
          >
            <span className="text-[14px] text-white font-['Aeonik-Bold'] font-normal">
              Withdraw Boost
            </span>
          </motion.button>
        </div>
      </motion.div>
    </DesktopLPModal>
  );
}
