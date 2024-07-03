import React from "react";
import { motion } from "framer-motion";
import { X, WalletCards, ArrowDown } from "lucide-react";

interface RemoveLPOverviewProps {
  setStep: (num: number) => void;
  onClose: () => void;
  changeStep: (step: number) => void;
  image: string;
  title: string;
  amount: string;
  multiplier: string;
  totalPot: number;
}

export const Overview: React.FC<RemoveLPOverviewProps> = (props) => {
  const width = window.innerWidth;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "93%",
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
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "18px",
              overflow: "hidden",
              marginRight: "5px",
            }}
            src={props?.image}
            alt="Profile"
          />
          <span
            style={{
              fontFamily: "AeonikBold",
              fontSize: "20px",
              color: "white",
            }}
          >
            {props?.title}
          </span>
        </div>
        <motion.button
          onClick={props.onClose}
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
      <div
        style={{
          display: "flex",
          padding: "22px",
          borderRadius: "20px",
          backgroundColor: "#1C1C1C",
          alignItems: "center",
          justifyContent: "center",
          margin: "22px 0",
          width: "101%",
        }}
      >
        <span
          style={{ fontFamily: "AeonikBold", fontSize: "52px", color: "white" }}
        >
          ${(props?.totalPot * 1.09).toFixed(2)}
        </span>
        <span
          style={{
            fontFamily: "AeonikBold",
            fontSize: "15px",
            color: "lightgray",
          }}
        >
          Cred Multiplier 3x
        </span>
      </div>
      {[
        {
          label: "Fees earned",
          value: `$${(props?.totalPot * 0.09).toFixed(2)}`,
        },
        { label: "Base Cred", value: `${props?.totalPot} $Cred` },
        {
          label: "Bonus Rewards",
          value: `${(props?.totalPot * 2).toFixed(0)} $Cred`,
        },
      ].map((item, index) => (
        <div
          key={index}
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
              fontFamily: "AeonikBold",
              fontSize: "17.5px",
              color: "lightgray",
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontFamily: "AeonikBold",
              fontSize: "20px",
              color: "white",
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
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
        <motion.button
          onClick={props.onClose}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            padding: "13px",
            borderRadius: "24px",
            backgroundColor: "#1D1D1D",
            width: width / 2.5,
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          <WalletCards color="#D9D9D9" strokeWidth={3} height={20} />
          <span
            style={{
              fontSize: "20px",
              color: "#D9D9D9",
              fontWeight: 800,
              marginLeft: "5px",
            }}
          >
            Hold
          </span>
        </motion.button>
        <motion.button
          onClick={() => props.setStep(2)}
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
        </motion.button>
      </div>
    </div>
  );
};
