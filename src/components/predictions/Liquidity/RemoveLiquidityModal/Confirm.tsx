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

export function RemoveLPConfirmationScreen(props: {
  setStep: (num: number) => void;
  onClose: () => void;
  refetch: () => void;
  title: string;
  multiplier: number;
  points: number;
  id: number;
  isDesktop?: boolean;
}) {
  const { onClose } = props;
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

  const { mutate: removeLP, isSuccess } = useRemoveLp();

  const showToast = () => {
    toast.success("Boost withdrawal successful!", {
      icon: <CheckCircle />,
      style: { backgroundColor: "#5ACE5A", color: "white" },
    });
  };

  async function userRemoveLP() {
    if (smartAccountReady) {
      try {
        setLoading(true);
        console.log("marketd", props.id);
        if (userCon?.walletType === "smartwallet")
          removeLP({
            userId: userCon?.external_auth_provider_user_id!,
            marketId: props.id,
            client: smartAccountClient,
            address: smartAccountAddress!,
          });

        if (userCon?.walletType === "eoa")
          removeLP({
            userId: userCon?.external_auth_provider_user_id!,
            marketId: props.id,
            client: eoaClient,
            address: eoa?.address!,
          });

        setTimeout(() => setLoading(false), 500);

        setSuccess(true);
        showToast();

        setTimeout(() => {}, 7000);
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
          : "bg-[#131313] p-5 mt-[50px] rounded-[30px]"
      } w-full`}
    >
      <motion.div
        className={`flex flex-col ${
          props?.isDesktop ? "bg-[#080808]" : "bg-[#131313]"
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
        <span className="text-[15px] text-lightgray mt-2 font-normal">
          If you keep your boost till after the market resolves you earn 3x
          Points
        </span>
        <div className="flex flex-row items-center mt-7 mb-1.5">
          <Clock color={"white"} strokeWidth={3.5} height={19} />
          <span className="text-[18px] font-semibold text-white ml-1">
            Hold and earn 3x
          </span>
        </div>
        <div className="flex flex-col p-3.5 rounded-[15px] mt-2.5 bg-[#1C1C1C]">
          <div className="flex flex-row items-center mb-2.5 justify-between">
            <span className="text-[16.5px] text-lightgray font-normal">
              Now
            </span>
            <span className="text-[16.5px] text-lightgray font-normal">
              {(props.points / 10 ** 5).toFixed(0)} $Cred
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[20px] text-white font-medium">
              After Resolution
            </span>
            <span className="text-[20px] text-white font-medium">
              {(props.points / 10 ** 5).toFixed(0)} $Cred
            </span>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-row items-center gap-1.5  mt-5 w-full">
        <motion.button
          onClick={onClose}
          whileTap={{ scale: 0.95 }}
          className="mt-3 p-2.5 rounded-full bg-[#1C1C1C] w-1/2 flex items-center justify-center border-none"
        >
          <span className="text-[20px] text-[#D9D9D9] font-extrabold">
            Hold
          </span>
        </motion.button>
        <motion.button
          onClick={() => {
            success ? () => {} : userRemoveLP();
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 flex flex-row ml-4 p-2 rounded-full bg-[#D9D9D9] w-1/2 items-center justify-center border-none"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row items-center justify-center"
            >
              <span className="loader" />
              <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-0.5">
                Withdrawing
              </span>
            </motion.div>
          ) : success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row items-center justify-center"
            >
              <div className="p-1 rounded-[19px] mr-1 bg-[#5ACE5A]">
                <Check strokeWidth={5} color="white" size={15} />
              </div>
              <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-0.5">
                Success
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row items-center justify-center"
            >
              <ArrowDown color="black" strokeWidth={3} height={23} />
              <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-0.5">
                Withdraw
              </span>
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
