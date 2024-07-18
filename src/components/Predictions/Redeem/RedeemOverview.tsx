// @ts-nocheck


import { Check, Gift, X } from "lucide-react";
import { motion } from "framer-motion";
import { useExecuteRedeem } from "@/hooks/actions/useExecuteRedeem";


export function RedeemOverview({
  setIsOpen,
  onClose,
  changeStep,
  image,
  title,
  amount,
  multiplier,
  option,
  totalPot,
}: {
  setIsOpen: () => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  title: string;
  amount: string;
  multiplier: string;
  option: any;
  totalPot: number;
}) {
  const { executeRedeem } = useExecuteRedeem();

  const width = window.innerWidth;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        backgroundColor: "#131313",
        padding: "20px",
        marginTop: "50px",
        borderRadius: "30px",
        alignSelf: "center",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="Prediction"
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          />
        </div>
        <motion.div
          onClick={onClose}
          style={{
            padding: "8.5px 6px",
            borderRadius: "17px",
            overflow: "hidden",
            backgroundColor: "#1C1C1C",
            alignSelf: "flex-start",
            cursor: "pointer",
          }}
        >
          <X color="#585858" strokeWidth={5} height={18} />
        </motion.div>
      </div>
      <div
        style={{
          fontFamily: "AeonikBold",
          fontSize: "24px",
          color: "white",
          marginTop: "9px",
          alignSelf: "flex-start",
        }}
      >
        Correct Prediction
      </div>
      <div
        style={{
          fontFamily: "AeonikBold",
          fontSize: "17px",
          color: "lightgray",
          marginTop: "0",
          alignSelf: "flex-start",
        }}
      >
        Congrats your prediction was correct. You can now redeem your winnings.{" "}
      </div>
      <div
        style={{
          display: "flex",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#1C1C1C",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: "22px",
          width: "101%",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            color: "white",
          }}
        >
          ${totalPot.toFixed(2)}
        </div>

        <div style={{ fontSize: "15px", color: "lightgray" }}>
          Predicted '{option}'
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: "8px",
          marginTop: "3px",
          padding: "7px",
          backgroundColor: "#21DF2A",
          borderRadius: "20px",
          width: "103%",
        }}
      >
        <div
          style={{
            padding: "5px",
            backgroundColor: "#06A90E",
            borderRadius: "20px",
          }}
        >
          <Check strokeWidth={5} color={"white"} size={14} />
        </div>
        <div
          style={{
            fontFamily: "AeonikBold",
            fontSize: "18px",
            color: "white",
          }}
        >
          Correct Prediction
        </div>
        <div style={{ width: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: "5px",
          width: "99%",
        }}
      >
        <div
          style={{
            fontFamily: "AeonikBold",
            fontSize: "17.5px",
            color: "lightgray",
          }}
        >
          Payout
        </div>
        <div
          style={{
            fontFamily: "AeonikBold",
            fontSize: "20px",
            color: "white",
          }}
        >
          ${(totalPot * 3).toFixed(2)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: "5px",
          width: "99%",
        }}
      >
        <div
          style={{
            fontFamily: "AeonikBold",
            fontSize: "17.5px",
            color: "lightgray",
          }}
        >
          Cred earned
        </div>
        <div
          style={{
            fontFamily: "AeonikBold",
            fontSize: "20px",
            color: "white",
          }}
        >
          {(totalPot * 2).toFixed(0)} $Cred
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          marginBottom: "5px",
          marginTop: "10px",
        }}
      >
        <motion.div
          onClick={onClose}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            padding: "13px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#1D1D1D",
            width: width / 2.5,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "#D9D9D9",
              fontWeight: "800",
              marginLeft: "5px",
            }}
          >
            Cancel
          </div>
        </motion.div>
        <motion.div
          onClick={() => changeStep(1)}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "16px",
            padding: "11px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#D9D9D9",
            width: width / 2.5,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gift color="black" strokeWidth={3} height={23} />

            <motion.span
              style={{
                fontSize: "20px",
                color: "#1D1D1D",
                fontWeight: "800",
                marginLeft: "3px",
              }}
            >
              Redeem
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
