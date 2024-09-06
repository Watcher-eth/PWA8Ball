// @ts-nocheck

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  X,
  ArrowDown,
  Check,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useRemoveLp } from "@/lib/onchain/mutations/RemoveLp";
import { useUserStore } from "@/lib/stores/UserStore";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { TxStatusButton } from "@/components/common/Animated/AnimatedTxStatus";

export function RemoveLPConfirmationScreen(props: {
  setStep: (num: number) => void;
  onClose: () => void;
  refetch: () => void;
  title: string;
  multiplier: number;
  points: number;
  id: number;
  isDesktop?: boolean;
  amountLp: number;
}) {
  const { onClose, refetch } = props;
  const {
    smartAccountReady,
    smartAccountClient,
    smartAccountAddress,
    eoaClient,
    eoa,
  } = useSmartAccount();
  const { user: userCon } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { mutate: removeLP, isPending, isSuccess, error } = useRemoveLp();

  const showToast = () => {
    toast(
      <div className="w-full rounded-full bg-[#101010] text-base font-[500] px-3 pr-4 text-white flex flex-row items-center p-2">
        <div className="p-0.5 py-1.5 rounded-full bg-[#212121] mr-2 flex justify-center items-center">
          <Check strokeWidth={4.5} className="text-green-400 h-[0.95rem]" />
        </div>
        Withdrawl Succesfull
      </div>,
      {
        unstyled: true,

        classNames: {
          title: "text-red-400 text-2xl",
          description: "text-red-400",
          actionButton: "bg-zinc-400",
          cancelButton: "bg-orange-400",
          closeButton: "bg-lime-400",
        },
      }
    );
  };

  async function userRemoveLP() {
    if (smartAccountReady) {
      try {
        showToast();
        setLoading(true);
        if (userCon?.walletType === "smartwallet")
          removeLP({
            userId: userCon?.externalAuthProviderUserId!,
            marketId: props.id,
            client: smartAccountClient,
            address: smartAccountAddress!,
          });

        if (userCon?.walletType === "eoa")
          removeLP({
            userId: userCon?.externalAuthProviderUserId!,
            marketId: props.id,
            client: eoaClient,
            address: eoa?.address!,
          });

        setTimeout(() => setLoading(false), 500);

        setTimeout(() => {
          onClose();
          refetch();
        }, 11000);
      } catch (error) {
        console.error("Failed to withdraw boost:", error);
        alert("Failed to withdraw boost!");
      }
    } else {
    }
  }

  return (
    <div
      className={`flex flex-col items-center ${
        props?.isDesktop
          ? "bg-[#080808] p-4 mt-3 rounded-[15px]"
          : "bg-[#101010] p-5 mt-[5px] rounded-t-[30px] -mb-2"
      } w-full`}
    >
      <motion.div
        className={`flex flex-col ${
          props?.isDesktop ? "bg-[#080808]" : "bg-[#101010] "
        } rounded-[20px] w-full`}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <AlertTriangle color={"#FF0050"} strokeWidth={3.5} size={33} />
          <motion.button
            onClick={() => {
              props?.isDesktop ? props?.setStep(1) : onClose();
            }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 px-1.5 rounded-[17px] bg-[#1C1C1C] border-none"
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.button>
        </div>
        <span className="text-[21px] leading-[23px] text-white mt-3.5 font-semibold">
          Are you sure you want to withdraw your Boost?
        </span>
        <span className="text-[15px] text-[lightgray] mt-2 font-normal">
          If you keep your boost till after the market resolves you earn 3x
          Points
        </span>
        <div className="flex flex-row items-center mt-8 mb-1.5">
          <Clock color={"white"} strokeWidth={3.5} height={19} />
          <span className="text-[18px] font-semibold text-white ml-1">
            Hold and earn 3x
          </span>
        </div>
        <div className="flex flex-col p-3.5 rounded-[15px] mt-4 bg-[#1C1C1C]">
          <div className="flex flex-row items-center mb-2.5 justify-between">
            <span className="text-[16.5px] text-[lightgray] font-[Aeonik]">
              Now
            </span>
            <span className="text-[16.5px] text-[lightgray] font-normal">
              {props.points.toFixed(0)} $Cred
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[20px] text-white font-[Aeonik]">
              After Resolution
            </span>
            <span className="text-[20px] text-white font-[Aeonik]">
              {(props.points * 3).toFixed(0)} $Cred
            </span>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-row  items-center gap-3.5  mt-10 w-full">
        <DialogClose asChild>
          <motion.button
            onClick={() =>
              setTimeout(() => {
                props?.setStep(1);
              }, 200)
            }
            whileTap={{ scale: 0.95 }}
            className={` px-6 h-12 rounded-full bg-[#1C1C1C] w-1/2 flex items-center justify-center border-none`}
          >
            <span className="text-[20px] text-[#D9D9D9] font-semibold">
              Hold
            </span>
          </motion.button>
        </DialogClose>
        {loading || success || isPending || isSuccess || error ? (
          <TxStatusButton
            isPending={isPending}
            isSuccess={isSuccess}
            height="h-12"
            isError={error}
            pendingText="Withdrawing"
            successText="Success"
            errorText="Withdrawl Failed"
          />
        ) : (
          <motion.button
            onClick={() => {
              isSuccess ? () => {} : userRemoveLP();
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
