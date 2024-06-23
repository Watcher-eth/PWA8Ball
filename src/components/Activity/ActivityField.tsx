// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import { parseOption, parseOptionJSON } from "@/lib/utils/parseOption";

interface ActivityFieldProps {
  index: number;
  pfp: string;
  name: string;
  amount: number;
  title: string;
  image: string;
  question: string;
  option: { name: string; value: number };
  onOpenBottomSheet: () => void;
}

const ActivityField: React.FC<ActivityFieldProps> = ({
  index,
  pfp,
  name,
  amount,
  title,
  image,
  question,
  option,
  onOpenBottomSheet,
}) => {
  const Option = parseOptionJSON(option);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "13.5px 0",
      }}
      onClick={onOpenBottomSheet}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={image}
          alt="Prediction"
          style={{
            height: "50px",
            width: "50px",
            objectFit: "cover",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        />
        <img
          src={pfp}
          alt="Profile"
          style={{
            height: "25px",
            width: "25px",
            objectFit: "cover",
            borderRadius: "15px",
            overflow: "hidden",
            position: "absolute",
            bottom: "-6px",
            left: "32px",
            borderWidth: "2.4px",
            borderColor: "#1B1B1E",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            marginLeft: "12.5px",
            marginRight: "-36px",
            maxWidth: "73.5%",
          }}
        >
          <h3
            style={{
              fontSize: "17px",
              color: "white",
              fontWeight: "700",
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontSize: "14.5px",
              color: "lightgray",
              fontWeight: "400",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "78vw",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "3px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "white",
            fontWeight: "700",
          }}
        >
          ${(amount / 10).toFixed(2)}
        </p>
        <p style={{ fontSize: "14px", color: "#C7C7C7", fontWeight: "700" }}>
          {Option?.name?.length < 8
            ? Option.name
            : Option?.name?.substring(0, 3)}
        </p>
      </div>
    </motion.div>
  );
};

export default ActivityField;
