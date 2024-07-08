// @ts-nocheck

import React from "react";
import { X, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface RemoveLPOverviewProps {
  setIsOpen: () => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  title: string;
  amount: string;
  multiplier: string;
  totalPot: number;
}

export const CashoutOverview: React.FC<RemoveLPOverviewProps> = (props) => {
  const width = window.innerWidth;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#101010",
        padding: "30px 20px",
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
          marginBottom: "18px",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "8px",
              backgroundColor: "#1C1C1C",
              borderRadius: "20px",
            }}
          >
            <Clock strokeWidth={4} color={"lightgray"} size={17} />
          </div>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "22px",
              color: "white",
            }}
          >
            {props.title}
          </span>
        </div>
        <motion.div
          onClick={() => props.onClose()}
          style={{
            padding: "8.5px 6px",
            borderRadius: "17px",
            overflow: "hidden",
            backgroundColor: "#1C1C1C",
            alignSelf: "flex-start",
            cursor: "pointer",
          }}
        >
          <X color={"#585858"} strokeWidth={5.5} height={18} />
        </motion.div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#1C1C1C",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: "22px",
          width: "101%",
        }}
      >
        <span style={{ fontSize: "50px", color: "white", fontWeight: 800 }}>
          ${props?.totalPot?.toFixed(2)}
        </span>

        <span
          style={{
            fontSize: "15px",
            color: "lightgray",
            fontWeight: 400,
            marginTop: -11,
          }}
        >
          Unresolved
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "18px 0 5px 0",
          width: "99%",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            color: "lightgray",
          }}
        >
          Possible Multiplier
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "white",
          }}
        >
          3x
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "5px 0",
          width: "99%",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            color: "lightgray",
          }}
        >
          Current Payout
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "white",
          }}
        >
          ${props?.totalPot.toFixed(2)}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "5px 0",
          width: "99%",
        }}
      >
        <span
          style={{
            fontSize: "17px",
            color: "lightgray",
          }}
        >
          Cred earned
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "white",
          }}
        >
          {(props?.totalPot * 2).toFixed(0)} $Cred
        </span>
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
          onClick={() => props?.changeStep(1)}
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
          <span
            style={{
              fontSize: "20px",
              color: "#D9D9D9",
              fontWeight: "800",
              marginLeft: "5px",
            }}
          >
            Cancel
          </span>
        </motion.div>
        <motion.div
          onClick={() => props?.changeStep(4)}
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
          <span
            style={{
              fontSize: "20px",
              color: "#1D1D1D",
              fontWeight: "800",
              marginLeft: "3px",
            }}
          >
            Cashout
          </span>
        </motion.div>
      </div>
    </div>
  );
};
