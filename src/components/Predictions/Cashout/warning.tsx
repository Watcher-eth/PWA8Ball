// @ts-nocheck

import React, { useState } from "react";
import { AlertTriangle, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCashout } from "@/lib/onchain/mutations/Cashout";
import { toast } from "sonner";

interface CashOutWarningScreenProps {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  multiplier: number;
  points: number;
  id: number;
  option: number;
  isDesktop?: boolean;
}

export const CashOutWarningScreen: React.FC<CashOutWarningScreenProps> = (
  props
) => {
  const { onClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const width = window.innerWidth;

  const {
    smartAccountReady,
    smartAccountClient,
    smartAccountAddress,
    eoa,
    eoaClient,
    eoaAddress,
  } = useSmartAccount();
  const { user: userCon } = useUserStore();
  const { mutate: cashOut } = useCashout();

  async function cashOutPrediction() {
    //TODO: Check Balance of user
    const userBalance = Number(userCon?.balance) / 1000000;
    const desired = Number(amount.toFixed(4));

    const hasBalance = Number(userBalance) > desired;

    if (!hasBalance) {
      // router.navigate({ pathname: "/GetFundsModal" });
    }

    if (hasBalance && smartAccountReady)
      try {
        console.log("client", smartAccountClient);
        setLoading(true);
        if (userCon?.walletType === "smartwallet")
          cashOut({
            userId: userCon.external_auth_provider_user_id!,
            marketId: Number(props.id),
            amount: Number(props.points.toFixed(4)) * 1000000,
            client: smartAccountClient,
            address: smartAccountAddress,
            preferYes: Number(props.option) === 1 ? false : true,
            option: props.options[Number(props.option) - 1],
            isBuy: true,
          });

        if (userCon?.walletType === "eoa")
          cashOut({
            userId: userCon.external_auth_provider_user_id!,
            marketId: Number(props.id),
            amount: Number(props.points.toFixed(4)) * 1000000,
            client: eoaClient,
            address: eoaAddress,
            preferYes: Number(props.option) === 1 ? false : true,
            option: props.options[Number(props.option) - 1],
            isBuy: true,
          });

        setTimeout(() => {
          setLoading(false);

          setSuccess(true);
          toast.success("Cashed out successfully!", {
            icon: <CheckCircle />,
            style: { backgroundColor: "#5ACE5A", color: "white" },
          });
        }, 3500);

        setTimeout(() => {
          router.push({
            pathname: getProfilePath(userCon?.external_auth_provider_user_id),
          });
        }, 6500);
      } catch (error) {
        console.error("Failed to make prediction:", error);
        alert("Failed to make prediction!");
      }
  }

  return (
    <div
      className={`flex flex-col items-center ${
        props.isDesktop
          ? "w-full bg-transparent mt-0 p-8 rounded-none"
          : "w-[93%] bg-[#101010] mt-[50px] p-5 rounded-[30px]"
      }`}
    >
      <motion.div
        className={`flex flex-col w-full ${
          props.isDesktop ? "bg-transparent" : "bg-[#131313]"
        } rounded-[20px]`}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <AlertTriangle color={"#FF0050"} strokeWidth={3.5} size={33} />
          <motion.div
            onClick={() => onClose()}
            className="p-[8.5px] rounded-[17px] overflow-hidden bg-[#1C1C1C] cursor-pointer"
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.div>
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
        <div className="flex flex-col p-[16px] rounded-[15px] mt-[8px] bg-[#1C1C1C]">
          <div className="flex flex-row items-center mb-[7px] justify-between">
            <span className="text-[16.5px] text-[#D3D3D3] font-medium">
              Now
            </span>
            <span className="text-[16.5px] text-[#D3D3D3] font-normal">
              ${props?.points?.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <span className="text-[20px] text-white font-semibold">
              Possible Payout
            </span>
            <span className="text-[20px] text-white font-semibold">
              ${(props.points * 3).toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>
      <div
        className={`flex flex-row items-center gap-[5px] mb-0 ${
          props?.isDesktop ? "mt-[45px]" : "mt-[35px]"
        }`}
      >
        <motion.div
          onClick={() => {
            props?.isDesktop ? props.changeStep(4) : props.changeStep(1);
          }}
          className={`mt-[12px] ${
            props.isDesktop ? "py-[11px]" : "py-[13px]"
          } rounded-[24px] overflow-hidden bg-[#1C1C1C] ${
            props.isDesktop ? "w-[11vw]" : `w-[${width / 2.5}px]`
          } flex items-center justify-center cursor-pointer`}
        >
          <span className="text-[20px] text-[#D9D9D9] font-extrabold">
            Hold
          </span>
        </motion.div>
        <motion.div
          onClick={() => {
            cashOutPrediction();
          }}
          className={`mt-[12px] flex flex-row ml-[16px] ${
            props.isDesktop ? "py-[10px]" : "py-[11px]"
          } rounded-[24px] overflow-hidden bg-[#D9D9D9] ${
            props.isDesktop ? "w-[11vw]" : `w-[${width / 2.5}px]`
          } items-center justify-center cursor-pointer`}
        >
          {loading ? (
            <div className="flex flex-row items-center justify-center">
              <div className="loader"></div>
              <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-[3px]">
                Cashing out
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center">
              <motion.span className="text-[20px] text-[#1D1D1D] font-extrabold ml-[3px]">
                Confirm
              </motion.span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
