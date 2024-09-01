// @ts-nocheck
import { AlertTriangle, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCashOutPrediction } from "@/hooks/actions/useCashOutPrediction";

export function CashoutWarningScreen({
  changeStep,
  onClose,
  title,
  multiplier,
  points,
  id,
  option,
  isDesktop,
}: {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  multiplier: number;
  points: number;
  id: number;
  option: number;
  isDesktop?: boolean;
}) {
  const { cashOutPrediction, loading, success } = useCashOutPrediction();

  const width = window.innerWidth;

  return (
    <div
      className={`flex flex-col items-center ${
        isDesktop
          ? "w-full bg-transparent mt-0 p-1 rounded-none"
          : "w-[93%] bg-[#101010] mt-[50px] p-5 rounded-[30px]"
      }`}
    >
      <motion.div
        className={`flex flex-col w-full ${
          isDesktop ? "bg-transparent" : "bg-[#131313]"
        } rounded-[20px]`}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <AlertTriangle color={"#FF0050"} strokeWidth={3.5} size={33} />
          {isDesktop ? (
            <div className="p-[8.5px]" />
          ) : (
            <motion.div
              onClick={() => onClose()}
              className="p-[8.5px] rounded-[17px] overflow-hidden bg-[#1C1C1C] cursor-pointer"
            >
              <X color={"#585858"} strokeWidth={5} height={18} />
            </motion.div>
          )}
        </div>
        <span className="text-[21px] text-white mt-[14px] font-semibold leading-[24px]">
          Are you sure you want to cash out prior to resolution?
        </span>
        <span className="text-[15px] text-[#D3D3D3] mt-[8px] font-normal">
          If you cash out now you will sell at the current probability and won't
          get any multiplier
        </span>
        <div className="flex flex-row items-center mt-[35px] mb-[6px]">
          <Clock color={"white"} strokeWidth={3.5} height={19} />
          <span className="text-[18px] text-white ml-[4px] font-semibold">
            Hold and earn more
          </span>
        </div>
        <div className="flex flex-col p-[16px] rounded-[15px] mt-[8px] bg-[#121212]">
          <div className="flex flex-row items-center mb-[7px] justify-between">
            <span className="text-[16.5px] text-[#D3D3D3] font-medium">
              Now
            </span>
            <span className="text-[16.5px] text-[#D3D3D3] font-normal">
              ${(points / 10 ** 6)?.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[20px] text-white font-semibold">
              Possible Payout
            </span>
            <span className="text-[20px] text-white font-semibold">
              ${((points * 3) / 10 ** 6).toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
      <div
        className={`flex flex-row w-full items-center gap-[5px] mb-0 ${
          isDesktop ? "mt-[45px]" : "mt-[35px]"
        }`}
      >
        <motion.div
          onClick={() => {
            isDesktop ? changeStep(4) : changeStep(1);
          }}
          className={`
            mt-[12px] py-2.5 rounded-[24px] overflow-hidden bg-[#151515]
            ${isDesktop ? "w-1/2" : `w-[${width / 2.5}px]`}
            flex items-center justify-center cursor-pointer
          `}
        >
          <span className="text-[20px] text-[#D9D9D9] font-extrabold">
            Hold
          </span>
        </motion.div>
        <motion.div
          onClick={() => {
            cashOutPrediction({
              points,
              option,
              marketId,
              options,
            });
          }}
          className={`
            mt-[12px] flex flex-row ml-[16px]
            py-2.5 rounded-[24px] overflow-hidden bg-[#D9D9D9]
            ${isDesktop ? "w-1/2" : `w-[${width / 2.5}px]`}
            items-center justify-center cursor-pointer
          `}
        >
          <div className="flex flex-row items-center justify-center">
            {loading && <div className="loader"></div>}
            <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-[3px]">
              {loading ? "Cashing out" : "Confirm"}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
