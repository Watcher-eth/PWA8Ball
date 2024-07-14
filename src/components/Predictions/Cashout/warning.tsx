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
  isDesktop?: boolean;
}

export const CashOutWarningScreen: React.FC<CashOutWarningScreenProps> = (
  props
) => {
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
        width: props.isDesktop ? "100%" : "93%",
        backgroundColor: props.isDesktop ? "transparent" : "#101010",
        marginTop: props.isDesktop ? "0px" : "50px",
        padding: props.isDesktop ? "30px" : "20px",
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
          backgroundColor: props.isDesktop ? "transparent" : "#131313",
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
              padding: "8.5px 6px",
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
            color: "white",
            marginTop: "14px",
            fontWeight: "600",
            lineHeight: "24px",
          }}
        >
          Are you sure you want cash out prior to resolution?
        </span>
        <span
          style={{
            fontSize: "15px",
            color: "lightgray",
            marginTop: "8px",
            fontWeight: "400",
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
            marginTop: props?.isDesktop ? "45px" : "35px",
            marginBottom: "6px",
          }}
        >
          <Clock color={"white"} strokeWidth={3.5} height={19} />
          <span
            style={{
              fontSize: "18px",
              color: "white",
              marginLeft: "4px",
              fontWeight: "600",
            }}
          >
            Hold and earn more
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px 14px",
            borderRadius: "15px",
            marginTop: props?.isDesktop ? "15px" : "8px",
            backgroundColor: "#1C1C1C",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "7px",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "16.5px",
                color: "lightgray",
                fontWeight: "500",
              }}
            >
              Now
            </span>
            <span
              style={{
                fontSize: "16.5px",
                color: "lightgray",
                fontWeight: "00",
              }}
            >
              ${props?.points?.toFixed(2)}
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
                color: "white",
                fontWeight: "600",
              }}
            >
              Possible Payout
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: "600",
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
          marginTop: props?.isDesktop ? "75px" : "35px",
        }}
      >
        <motion.div
          onClick={() => {
            props?.isDesktop ? props.changeStep(4) : props.changeStep(1);
          }}
          style={{
            marginTop: "12px",
            padding: props.isDesktop ? "11px" : "13px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#1C1C1C",
            width: props.isDesktop ? "11vw" : width / 2.5,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            display: "flex",
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
            padding: props.isDesktop ? "10px" : "11px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#D9D9D9",
            width: props.isDesktop ? "11vw" : width / 2.5,
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
