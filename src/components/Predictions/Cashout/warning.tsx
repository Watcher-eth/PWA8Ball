// @ts-nocheck

import React, { useState } from "react";
import { AlertTriangle, Clock, Share as ShareIcon, X } from "lucide-react";
import { motion } from "framer-motion";
interface CashOutWarningScreenProps {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  multiplier: number;
  points: number;
  id: number;
  option: number;
}

const CashOutWarningScreen: React.FC<CashOutWarningScreenProps> = (props) => {
  const { onClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const width = window.innerWidth;

  async function cashOutPrediction() {
    try {
      setLoading(true);
      // Cash out logic here
      setSuccess(true);
    } catch (error) {
      console.error("Failed to cash out:", error);
      alert("Failed to cash out!");
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
      {/* <CustomToastSuccess
        visible={toastVisible}
        message="Your withdrawal was successful!"
        icon={CheckCircle}
        position="top-center"
        color="#5ACE5A"
      /> */}

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
          <motion.div
            onClick={() => onClose()}
            style={{
              paddingVertical: "8.5px",
              paddingHorizontal: "6px",
              borderRadius: "17px",
              overflow: "hidden",
              backgroundColor: "#1C1C1C",
              alignSelf: "flex-start",
              cursor: "pointer",
            }}
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.div>
        </div>
        <span
          style={{
            fontSize: "21px",
            fontFamily: "AeonikBold",
            color: "white",
            marginTop: "14px",
          }}
        >
          Are you sure you want cash out prior to resolution?
        </span>
        <span
          style={{
            fontSize: "15px",
            fontFamily: "AeonikBold",
            color: "lightgray",
            marginTop: "8px",
          }}
        >
          If you cash out now you will sell at the current probability and won't
          get any multiplier
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "35px",
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
            Hold and earn more
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "14px",
            paddingVertical: "16px",
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
              ${props.points.toFixed(2)}
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
              Possible Payout
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "AeonikBold",
                color: "white",
              }}
            >
              ${(props.points * 3).toFixed(2)}
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
          marginTop: "25px",
        }}
      >
        <motion.div
          onClick={() => {
            onClose();
            props?.onClose();
          }}
          style={{
            marginTop: "12px",
            padding: "13px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#1C1C1C",
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
            }}
          >
            Hold
          </span>
        </motion.div>
        <motion.div
          onClick={() => {
            cashOutPrediction();
          }}
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
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="loader"></div>
              <span
                style={{
                  fontSize: "20px",
                  color: "#1D1D1D",
                  fontWeight: "800",
                  marginLeft: "3px",
                }}
              >
                Cashing out
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.span
                style={{
                  fontSize: "20px",
                  color: "#1D1D1D",
                  fontWeight: "800",
                  marginLeft: "3px",
                }}
              >
                Confirm
              </motion.span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CashOutWarningScreen;
