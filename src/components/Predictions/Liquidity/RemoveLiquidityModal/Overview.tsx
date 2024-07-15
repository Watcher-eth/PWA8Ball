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
  isDesktop?: boolean;
}

export const Overview: React.FC<RemoveLPOverviewProps> = (props) => {
  const width = window.innerWidth;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: props?.isDesktop ? "#080808" : "#131313",
        padding: props?.isDesktop ? "10px" : "20px",
        marginTop: props?.isDesktop ? "0px" : "50px",
        borderRadius: "30px",
        alignSelf: "center",
      }}
      className="w-full "
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="w-full"
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
            className="oject-cover"
            src={props?.image}
            alt="Profile"
          />
          <span
            style={{
              fontWeight: "600",
              fontSize: "20px",
              color: "white",
            }}
            className="ml-2"
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
          padding: "22px",
          borderRadius: "20px",
          backgroundColor: "#1C1C1C",
          alignItems: "center",
          justifyContent: "center",
          margin: "22px 0",
        }}
        className="w-full flex flex-col"
      >
        <span style={{ fontWeight: "700", fontSize: "52px", color: "white" }}>
          ${(props?.totalPot * 1.09).toFixed(2)}
        </span>
        <span
          style={{
            fontWeight: "400",
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
          }}
          className="w-full"
        >
          <span
            style={{
              fontWeight: "400",
              fontSize: "17.5px",
              color: "lightgray",
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontWeight: "400",
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
        className="w-full "
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            padding: "13px",
            backgroundColor: "#1D1D1D",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
          className="w-1/2 rounded-full"
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
            backgroundColor: "#D9D9D9",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
          className="w-1/2 rounded-full"
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
