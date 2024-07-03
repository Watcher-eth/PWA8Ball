import React, { useState } from "react";
import { CheckCircle, FolderUp, Share as ShareIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SubmitProofProps {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  multiplier: number;
  points: number;
  image: string;
}

export const SubmitProof: React.FC<SubmitProofProps> = (props) => {
  const { onClose } = props;

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
        Submit Proof
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
        Submit a source as proof for your proposed outcome. This makes it easier
        for others to verify the accuracy of your claim.
      </div>
      <div
        style={{
          display: "flex",
          padding: "20px",
          borderRadius: "20px",
          borderColor: "#1C1C1C",
          borderWidth: "2px",
          alignItems: "center",
          justifyContent: "center",
          margin: "22px 0",
          width: "101%",
        }}
      >
        <FolderUp color="lightgray" strokeWidth={4} size={22} />
        <div
          style={{
            fontFamily: "AeonikBold",
            fontSize: "15px",
            color: "lightgray",
            marginTop: "6px",
          }}
        >
          Upload a file (.txt, .pdf, .word)
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          margin: "5px 0 0 0",
        }}
      >
        <motion.div
          onClick={() => {}}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            padding: "11px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#D9D9D9",
            width: "80%",
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
            <ShareIcon color="black" strokeWidth={3} height={23} />

            <div
              style={{
                fontSize: "20px",
                color: "#1D1D1D",
                fontWeight: "800",
                marginLeft: "3px",
              }}
            >
              Share
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

