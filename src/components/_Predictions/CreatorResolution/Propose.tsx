// @ts-nocheck

import React, { useState } from "react";
import { CheckCircle, Share as ShareIcon, Vote, X } from "lucide-react";
import { motion } from "framer-motion";
import useResolutionStore from "@/lib/stores/ResolutionStore";
import Image from "next/image";

interface ProposeAnswerProps {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  image: string;
  options: string[];
}

export const ProposeAnswer: React.FC<ProposeAnswerProps> = (props) => {
  const { onClose } = props;
  const options = useResolutionStore((state) => state.options);
  const setResolutionStore = useResolutionStore((state) => state.setState);

  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500); // Hide toast after 3.5 seconds
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        backgroundColor: "#131313",
        marginTop: "50px",
        padding: "20px",
        borderRadius: "30px",
      }}
    >
      {/* <CustomToastSuccess
        visible={toastVisible}
        message="Prediction successful!"
        icon={CheckCircle}
        position="top-center"
        color="#5ACE5A"
      /> */}
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
          <Image
            src={props.image}
            alt="Market"
            width={35}
            height={35}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
          />
        </div>
        <motion.div
          onClick={props.onClose}
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
        Resolve the market
      </div>
      <div
        style={{
          fontFamily: "AeonikBold",
          fontSize: "16px",
          color: "lightgray",
          marginTop: "0",
          alignSelf: "flex-start",
        }}
      >
        If the market has concluded you can propose an answer for resolution. If
        no one disputes it for 48hrs the market will resolve.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px 0",
          width: "100%",
        }}
      >
        <motion.div
          onClick={() => setResolutionStore({ option: 0 })}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#262626",
            borderRadius: "15px",
            overflow: "hidden",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              fontSize: "17px",
              color: "white",
              fontFamily: "AeonikBold",
            }}
          >
            {props?.options[0]}
          </div>
        </motion.div>
        <motion.div
          onClick={() => setResolutionStore({ option: 1 })}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#262626",
            borderRadius: "15px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "17px",
              color: "white",
              fontFamily: "AeonikBold",
            }}
          >
            {props?.options[1]}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

