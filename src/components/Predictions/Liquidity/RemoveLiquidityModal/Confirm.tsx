import React, { useState } from "react";
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

  async function executePrediction() {
    if (smartAccountReady) {
      try {
        setLoading(true);

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

        setTimeout(() => {
          onClose();
          props.refetch();
        }, 7000);
      } catch (error) {
        console.error("Failed to withdraw boost:", error);
        alert("Failed to withdraw boost!");
      }
    } else {
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: props?.isDesktop ? "#080808" : "#131313",
        marginTop: props?.isDesktop ? "0px" : "50px",
        padding: props?.isDesktop ? "10px" : "20px",
        borderRadius: "30px",
      }}
      className="w-full"
    >
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: props?.isDesktop ? "#080808" : "#131313",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <AlertTriangle color={"#FF0050"} strokeWidth={3.5} size={33} />
          <motion.button
            onClick={() => {
              props?.isDesktop ? props?.setStep(1) : onClose();
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8.5px 6px",
              borderRadius: "17px",
              backgroundColor: "#1C1C1C",
              border: "none",
            }}
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.button>
        </div>
        <span
          style={{
            fontSize: "21px",
            lineHeight: "23px",
            color: "white",
            marginTop: "14px",
            fontWeight: "600",
          }}
        >
          Are you sure you want to withdraw your Boost?
        </span>
        <span
          style={{
            fontSize: "15px",
            color: "lightgray",
            marginTop: "8px",
            fontWeight: 400,
          }}
        >
          If you keep your boost till after the market resolves you earn 3x
          Points
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "27px",
            marginBottom: "6px",
          }}
        >
          <Clock color={"white"} strokeWidth={3.5} height={19} />
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              marginLeft: "4px",
            }}
          >
            Hold and earn 3x
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "14px 16px",
            borderRadius: "15px",
            marginTop: "9px",
            backgroundColor: "#1C1C1C",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "9px",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "16.5px",
                color: "lightgray",
                fontWeight: "400",
              }}
            >
              Now
            </span>
            <span
              style={{
                fontSize: "16.5px",
                color: "lightgray",
                fontWeight: "400",
              }}
            >
              {(props.points / 10 ** 5).toFixed(0)} $Cred
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "500",
              }}
            >
              After Resolution
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "500",
              }}
            >
              {(props.points / 10 ** 5).toFixed(0)} $Cred
            </span>
          </div>
        </div>
      </motion.div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          marginBottom: "0",
          marginTop: "22px",
        }}
        className="w-full"
      >
        <motion.button
          onClick={() => {
            onClose();
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "12px",
            padding: "13px",
            borderRadius: "24px",
            backgroundColor: "#1C1C1C",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
          className="w-1/2"
        >
          <span
            style={{
              fontSize: "20px",
              color: "#D9D9D9",
              fontWeight: 800,
            }}
          >
            Hold
          </span>
        </motion.button>
        <motion.button
          onClick={() => {
            success ? () => {} : executePrediction();
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "16px",
            padding: "11px",
            borderRadius: "24px",
            backgroundColor: "#D9D9D9",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
          className="w-1/2"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="loader" />
              <span
                style={{
                  fontSize: "20px",
                  color: "#1D1D1D",
                  fontWeight: 800,
                  marginLeft: "3px",
                }}
              >
                Withdrawing
              </span>
            </motion.div>
          ) : success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: "4px",
                  borderRadius: "19px",
                  marginRight: "4px",
                  backgroundColor: "#5ACE5A",
                }}
              >
                <Check strokeWidth={5} color="white" size={15} />
              </div>
              <span
                style={{
                  fontSize: "20px",
                  color: "#1D1D1D",
                  fontWeight: 800,
                  marginLeft: "3px",
                }}
              >
                Success
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowDown color="black" strokeWidth={3} height={23} />
              <span
                style={{
                  fontSize: "20px",
                  color: "#1D1D1D",
                  fontWeight: 800,
                  marginLeft: "3px",
                }}
              >
                Withdraw
              </span>
            </motion.div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
