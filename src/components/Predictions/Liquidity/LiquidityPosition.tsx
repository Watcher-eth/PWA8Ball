// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";

interface LiquidityPositionProps {
  image: string;
  title: string;
  amount: number;
  onChange: () => void;
}

const LiquidityPosition: React.FC<LiquidityPositionProps> = ({
  image,
  title,
  amount,
  onChange,
}) => {
  return (
    <motion.div
      onClick={onChange}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "14px",
        paddingTop: "12px",
        paddingBottom: "12px",
        borderRadius: "15px",
        backgroundColor: "rgba(49, 49, 49, 0.8)",
        marginBottom: "15px",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden", // Ensure no overflow beyond the parent container
      }}
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "15px",
          objectFit: "cover",
          position: "absolute",
          zIndex: 0,
          filter: "blur(35px)",
          transform: "scale(1.2)",
        }}
        src={image}
        alt="background"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "18.5px",
              color: "rgba(250, 250, 250, 0.9)",
              fontFamily: "Aeonik-Bold",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: "14.5px",
              color: "white",
              fontFamily: "Aeonik-Regular",
              marginTop: "0px",
            }}
          >
            +{(amount / 11).toFixed(2)}$ Fees earned
          </span>
        </div>
        <img
          style={{
            height: "43px",
            width: "43px",
            borderRadius: "10px",
            overflow: "hidden",
            objectFit: "cover",
          }}
          src={image}
          alt="icon"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span
            style={{
              fontSize: "15px",
              color: "white",
              fontFamily: "Aeonik-Bold",
              alignSelf: "flex-start",
              marginTop: "5px",
            }}
          >
            $
          </span>
          <span
            style={{
              fontSize: "30px",
              color: "white",
              fontFamily: "Aeonik-Bold",
            }}
          >
            {(amount + amount / 11).toFixed(2)}
          </span>
        </div>
        <motion.button
          onClick={() => {}}
          style={{
            padding: "5.5px 10px",

            borderRadius: "17px",
            overflow: "hidden",
            backgroundColor: "rgba(20, 20, 20, 0.2)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "white",
              fontFamily: "Aeonik-Bold",
              fontWeight: 400,
            }}
          >
            Withdraw Boost
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LiquidityPosition;
