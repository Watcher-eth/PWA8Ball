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
import { Toaster, toast } from "sonner";

interface RemoveLPConfirmationScreenProps {
  setStep: (num: number) => void;
  onClose: () => void;
  refetch: () => void;
  title: string;
  multiplier: number;
  points: number;
  id: number;
}

const RemoveLPConfirmationScreen: React.FC<RemoveLPConfirmationScreenProps> = (
  props
) => {
  const { onClose } = props;
  const { smartAccountReady, smartAccountClient, smartAccountAddress } =
    useSmartAccount();
  const { user: userCon } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const width = window.innerWidth;

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
        removeLP({
          userId: userCon?.external_auth_provider_user_id!,
          marketId: props.id,
          client: smartAccountClient,
          address: smartAccountAddress!,
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
        width: "93%",
        backgroundColor: "#131313",
        marginTop: "50px",
        padding: "20px",
        borderRadius: "30px",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#131313",
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
            onClick={onClose}
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
            fontFamily: "AeonikBold",
            color: "white",
            marginTop: "14px",
          }}
        >
          Are you sure you want to withdraw your Boost?
        </span>
        <span
          style={{
            fontSize: "15px",
            fontFamily: "AeonikBold",
            color: "lightgray",
            marginTop: "8px",
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
              fontFamily: "AeonikBold",
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
                fontFamily: "AeonikBold",
                color: "lightgray",
              }}
            >
              Now
            </span>
            <span
              style={{
                fontSize: "16.5px",
                fontFamily: "AeonikBold",
                color: "lightgray",
              }}
            >
              {props.points.toFixed(0)} $Cred
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
                fontFamily: "AeonikBold",
                color: "white",
              }}
            >
              After Resolution
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "AeonikBold",
                color: "white",
              }}
            >
              {(props.points * 3).toFixed(0)} $Cred
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
            width: width / 2.5,
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
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
            width: width / 2.5,
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
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
};

export default RemoveLPConfirmationScreen;
