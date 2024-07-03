// @ts-nocheck

import React, { useState } from "react";
import {
  ArrowDown,
  CheckCircle,
  Clock,
  Share as ShareIcon,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

interface RemoveLPConfirmationScreenProps {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  multiplier: number;
  points: number;
  image: string;
  option: number;
  options: [];
}

export const CashoutConfirmScrreen: React.FC<RemoveLPConfirmationScreenProps> = (
  props
) => {
  const { onClose } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const width = window.innerWidth;

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "WebShare Example",
          text: "Check out this website!",
          url: "https://www.example.com",
        });
        console.log("Data was shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      console.log("Web Share not supported on this browser");
    }
  };

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
      {success ? (
        <div />
      ) : (
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
            <div style={{ width: "37px" }}></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "5px",
                borderRadius: "15px",
                backgroundColor: "#212121",
              }}
            >
              <div
                style={{
                  padding: "5px",
                  borderRadius: "10px",
                  backgroundColor: "green",
                }}
              >
                <ArrowDown color={"white"} strokeWidth={3.5} size={18} />
              </div>
              <span
                style={{
                  fontSize: "17px",
                  fontFamily: "AeonikBold",
                  color: "white",
                  marginHorizontal: "6px",
                  alignSelf: "center",
                }}
              >
                Yes
              </span>
            </div>
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
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <GradientText
              text={`${props.points?.toFixed(2)}`}
              fontSize={45}
              colors={["green", "lightgreen"]} // Define your gradient colors here
            /> */}
          </div>
          <div
            style={{
              borderWidth: "0.3px",
              borderStyle: "dashed",
              borderRadius: "1px",
              borderColor: "lightgray",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
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
              Market
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "AeonikBold",
                  fontSize: "20px",
                  color: "white",
                  marginRight: "9px",
                }}
              >
                {props.title}
              </span>
              <img
                style={{
                  height: "38px",
                  width: "38px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                src={props?.image}
                alt="Market"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
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
              Predicted on
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "AeonikBold",
                  fontSize: "19px",
                  color: "lightgray",
                  marginRight: "4px",
                }}
              >
                2024
              </span>
              <span
                style={{
                  fontFamily: "AeonikBold",
                  fontSize: "19px",
                  color: "white",
                  marginRight: "7px",
                }}
              >
                Thursday
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "7px",
                  paddingVertical: "1px",
                  width: "41px",
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "#181818",
                  alignItems: "center",
                  gap: "-3px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "8px",
                    fontFamily: "AeonikBold",
                    color: "#FF0050",
                  }}
                >
                  Sept
                </span>
                <span
                  style={{
                    fontSize: "25px",
                    color: "white",
                  }}
                >
                  21
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
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
              Tx Receipt
            </span>

            <span
              style={{
                fontFamily: "AeonikBold",
                fontSize: "20px",
                color: "white",
                textDecoration: "underline",
              }}
            >
              0xrf724sda3...kja3
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "10px 0",
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
              Cred Bonus
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "AeonikBold",
                  fontSize: "20px",
                  marginRight: "5px",
                  color: "white",
                }}
              >
                {(props.points * 2).toFixed(0)} $Cred
              </span>
              <img
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "10px",
                  marginRight: "-10px",
                  overflow: "hidden",
                }}
                src="/assets/icons/Pen.png"
                alt="Pen"
              />
            </div>
          </div>
        </motion.div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          marginBottom: "0",
          marginTop: "5px",
        }}
      >
        <motion.div
          onClick={() => {
            shareLink();
          }}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            padding: "11px",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#D9D9D9",
            width: width / 1.25,
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

            <motion.span
              style={{
                fontSize: "20px",
                color: "#1D1D1D",
                fontWeight: "800",
                marginLeft: "3px",
              }}
            >
              Share
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

