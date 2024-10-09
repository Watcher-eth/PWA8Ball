import { motion } from "framer-motion";
import {
  X,
  WalletCards,
  ArrowDown,
  AlertTriangle,
  InfoIcon,
} from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useRemoveLp } from "@/hooks/actions/useRemoveLp";
import { TxStatusButton } from "@/components/common/Animated/AnimatedTxStatus";

export function Overview({
  setStep,
  onClose,
  changeStep,
  image,
  title,
  amount,
  multiplier,
  totalPot,
  isDesktop,
  id,
}: {
  setStep: (num: number) => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  title: string;
  amount: string;
  multiplier: string;
  totalPot: number;
  isDesktop?: boolean;
  id: number;
}) {
  const { removeLp, loading, success, error } = useRemoveLp({
    marketId: id,
  });

  return (
    <div
      className={`flex flex-col items-center ${
        isDesktop
          ? "bg-[#080808] p-3 mt-2 rounded-[10px]"
          : "bg-[#101010] p-5 mt-[5px] -mb-2 rounded-t-[30px]"
      } w-full`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <img
          className="h-[35px] w-[35px] rounded-[18px] object-cover mr-1.5"
          src={image}
          alt="Profile"
        />
        <span className="ml-2 font-semibold text-[20px] text-white">
          Withdraw your Boost
        </span>

        <DialogClose asChild>
          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 px-1.5 rounded-full bg-[#1C1C1C] border-none"
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.button>
        </DialogClose>
      </div>
      <div className="flex flex-col items-center justify-center w-full -space-y-2 p-5 py-7 rounded-[20px] border-[0.2rem] border-dashed border-[#181818] mt-7 mb-5">
        <span className="font-bold text-[52px] text-white">
          ${totalPot.toFixed(2)}
        </span>
        <span className="font-medium text-[15px] text-[lightgray]">
          Your Boost
        </span>
      </div>
      <div
        style={{ backgroundColor: "rgba(255, 63, 63, 0.15)" }}
        className="flex items-center justify-between rounded-full py-2 px-4  mb-2 w-full"
      >
        <AlertTriangle color={"#FF3F3F"} size={20} strokeWidth={3} />

        <span className="text-lg  text-[#FF3F3F] font-semibold">
          Pre Resolution
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon color={"#FF3F3F"} size={20} strokeWidth={3} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="bg-[#cccccc]/10 flex items-center border-[0.05rem] border-[#cccccc]/20 backdrop-blur-xl text-white px-4  rounded-full p-2">
                <InfoIcon
                  color={"white"}
                  size={18}
                  className="mr-1.5"
                  strokeWidth={2.7}
                />
                Wait till after resolution to get double $Cred!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {[
        {
          label: "Fees earned",
          value: `$${(totalPot * 0.09).toFixed(2)}`,
        },
        { label: "Base Cred", value: `${totalPot} $Cred` },
        {
          label: "Bonus Rewards",
          value: `${(totalPot * 2).toFixed(0)} $Cred`,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between w-full my-2"
        >
          <span className="font-normal text-[17.5px] text-[lightgray]">
            {item.label}
          </span>
          <span className="font-medium text-[19px] text-white">
            {item.value}
          </span>
        </div>
      ))}
      <div className="flex flex-row items-center gap-1.5 mt-5 mb-1 w-full">
        <DialogClose asChild>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-row items-center justify-center w-1/2 px-6 h-12 bg-[#1D1D1D] rounded-full"
          >
            <span className="ml-1.5 text-[20px] font-extrabold text-[#D9D9D9]">
              Cancel
            </span>
          </motion.button>
        </DialogClose>
        {loading || success || loading || error ? (
          <TxStatusButton
            isPending={loading}
            isSuccess={success}
            height="h-12"
            isError={error}
            pendingText="Withdrawing"
            successText="Success" 
            
            errorText="Withdrawl Failed"
          />
        ) : (
          <motion.button
            onClick={() => {
              success ? () => {} : removeLp(id);
            }}
            whileTap={{ scale: 0.95 }}
            className=" flex flex-row ml-4 px-6 h-12 rounded-full bg-[#D9D9D9] w-1/2 items-center justify-center border-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row items-center w-1/2 justify-center"
            >
              <ArrowDown color="black" strokeWidth={3} height={23} />
              <span className="text-[20px] text-[#1D1D1D] font-semibold ml-0.5">
                Withdraw
              </span>
            </motion.div>
          </motion.button>
        )}
      </div>
    </div>
  );
}
