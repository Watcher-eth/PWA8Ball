// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Clock,
  Lightbulb,
  Receipt,
  User2,
  X,
} from "lucide-react";
import { AnimatedChart } from "./AnimatedChart";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";
import { useRouter } from "next/router";
const timeframes = ["1H", "1D", "1W", "1M"];

const MyBetModal = (props: {
  title: string;
  image: string;
  price: number;
  ownedAmount: number;
  options: string[];
  percentage: number;
  betId: string;
  topic: string;
  icon: string;
  question: string;
  name?: string;
  userId?: string;
  option?: number;
  optionNumber?: number;
  isExternal?: boolean;
  onClose: () => void;
  openCashout: () => void;
  handleReceipt: () => void;
  setStep: () => void;
}) => {
  const [timeframe, setTimeframe] = useState("1D");

  const { data: prices, error: priceError } = useGetPricesForMarket(
    props.betId,
    timeframe
  );

  const router = useRouter();
  const userOutcome = props?.optionNumber;
  const currentPrices = prices?.map((price) => ({
    value:
      userOutcome === 1
        ? Number(parseFloat(price.price.toFixed(2)))
        : 10000 - Number(price.price),
    date: new Date(price.timestamp * 1000),
    outcome: price.outcome,
  }));

  let percentageDifference = null;
  if (currentPrices && currentPrices?.length > 1) {
    const firstPrice = currentPrices[0]?.value;
    const lastPrice = currentPrices[currentPrices.length - 1].value;
    percentageDifference = ((lastPrice - firstPrice) / firstPrice) * 100;
  }
  if (currentPrices && currentPrices?.length <= 1) {
    const now = new Date();
    const oneMinuteLater = new Date(now.getTime() + 60000);
    currentPrices.push({ value: 50, date: now });
    currentPrices.push({ value: 50, date: oneMinuteLater });

    percentageDifference = 0;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(12,12,12, 1)",
        width: "100vw",
        alignSelf: "center",
        paddingBottom: 30,
        gap: 2,
        padding: 15,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "5px 0",
        }}
      >
        <motion.div
          onClick={() => {
            props.onClose();
            router.push({
              pathname: "[id]",
              query: {
                id: props.betId,
                name: props.title,
                description: props.question,
                icon: props.icon,
                image: props.image,
                topic: props.topic,
                option: props.option,
              },
            });
          }}
        >
          <img
            src={props.image}
            style={{
              height: 38,
              width: 38,
              borderRadius: "50%",
              overflow: "hidden",
              objectFit: "cover",
            }}
            alt="Market image"
          />
        </motion.div>
        <motion.div
          onClick={() => props.onClose()}
          style={{
            padding: "8.5px 6px",
            borderRadius: 17,
            overflow: "hidden",
            backgroundColor: "#1C1C1C",
            alignSelf: "flex-start",
          }}
        >
          <X color={"#585858"} strokeWidth={5} height={18} />
        </motion.div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <span
          style={{
            fontSize: 19,
            color: "white",
            fontWeight: 700,
          }}
        >
          {prices
            ? props.optionNumber === 1
              ? prices[prices.length - 1].value / 10000
              : prices.length > 0
              ? prices[prices.length - 1].value / 10000
              : 100 - props.price
            : props.price / 10000}
          % {props.options[props?.option === 1 ? 0 : 1].name}
        </span>
        <span
          style={{
            color: props.optionNumber === 0 ? "#FF0050" : "#0050FF",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {percentageDifference && percentageDifference >= 0
            ? `+${percentageDifference}`
            : `${percentageDifference}`}
          %
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: -3,
        }}
      >
        <span
          style={{
            fontSize: 17,
            color: "lightgray",
            fontWeight: 600,
          }}
        >
          {props.title}
        </span>
        <span
          style={{
            color: "lightgray",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          {timeframe === "1D"
            ? "Today"
            : timeframe === "1W"
            ? "This Week"
            : timeframe === "1H"
            ? "This Hour"
            : "This Month"}
        </span>
      </div>
      {prices ? (
        <div style={{ height: "34.2vh" }}>
          <AnimatedChart prices={currentPrices} option={props.optionNumber} />
        </div>
      ) : (
        <div style={{ padding: 10 }}></div>
      )}
      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          marginTop: 0,
        }}
      >
        {timeframes.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => setTimeframe(item)}
            style={{
              padding: "4px 7px",

              backgroundColor: timeframe === item ? "lightgray" : "transparent",
              borderRadius: 15,
            }}
          >
            <span
              style={{
                color: timeframe === item ? "black" : "gray",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {item}
            </span>
          </motion.div>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "rgba(100,100,100, 0.3)",
          margin: "15px 0",
        }}
      />
      {props.ownedAmount === undefined ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "lightgray",
              }}
            >
              Created by
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <img
                src={props.icon}
                style={{
                  height: 22,
                  width: 22,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: 5,
                }}
                alt="Creator"
              />
              <span
                style={{
                  color: "white",
                  fontSize: 19,
                  fontWeight: 600,
                }}
              >
                {props.name}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "lightgray",
              }}
            >
              Prediction Value
            </span>
            {prices && (
              <span
                style={{
                  color: "white",
                  fontSize: 19,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                $
                {(
                  props.ownedAmount *
                  (prices[prices.length - 1].value / 1000000)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "lightgray",
              }}
            >
              {props.isExternal ? props.name : "You"} voted
            </span>
            <span
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: 600,
              }}
            >
              {props.options[props?.option === 1 ? 0 : 1].name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "lightgray",
              }}
            >
              Prediction Value
            </span>
            {prices && (
              <span
                style={{
                  color: "white",
                  fontSize: 19,
                  fontWeight: 600,
                }}
              >
                $
                {(
                  props.ownedAmount *
                  (prices[prices.length - 1]?.value / 1000000)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
          marginBottom: 10,
          alignSelf: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <motion.div
          onClick={() => {
            if (props.name) {
              router.push({ pathname: "profile", query: { id: props.userId } });
            } else {
              props.setStep(2);
            }
          }}
          style={{
            marginTop: 11,
            borderRadius: 25,
            padding: "10px 10px",
            overflow: "hidden",
            backgroundColor: "#1D1D1D",
            width: "44vw",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          {props.name ? (
            <User2 height={20} color={"#D9D9D9"} strokeWidth={3.3} />
          ) : (
            <ArrowLeftRight height={20} color={"#D9D9D9"} strokeWidth={3} />
          )}
          <span style={{ fontSize: 20, color: "#D9D9D9", fontWeight: 800 }}>
            {props.name ? "Profile" : "Cashout"}
          </span>
        </motion.div>
        <motion.div
          onClick={() => {
            if (props.name) {
              props.onClose();
              router.push({
                pathname: "[id]",
                query: {
                  id: props.betId,
                  name: props.title,
                  description: props.question,
                  icon: "icon",
                  image: props.image,
                  topic: props.topic,
                  option: props.option,
                },
              });
            } else {
              props.setStep(4);
            }
          }}
          style={{
            marginTop: 11,
            display: "flex",
            padding: "10px 8px",
            flexDirection: "row",
            borderRadius: 25,
            overflow: "hidden",
            backgroundColor: "#D9D9D9",
            width: "44vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Receipt height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span
            style={{
              fontSize: 20,
              color: "#1D1D1D",
              fontWeight: 800,
              marginLeft: "3px",
            }}
          >
            Details
          </span>
        </motion.div>
      </div>
      <div
        style={{
          height: 1,
          width: "101%",
          backgroundColor: "rgba(100,100,100, 0.3)",
          margin: "14px 0",
          marginTop: 20,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Lightbulb color="white" strokeWidth={3} size={17} />
        <span
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: 19,
          }}
        >
          About {props.title}
        </span>
      </div>
      <span
        style={{
          color: "white",
          fontSize: 16.5,
          lineHeight: "19px",
          marginTop: "5px",
        }}
      >
        {props.question}
      </span>
      <div
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "rgba(100,100,100, 0.3)",
          margin: "14px 0",
          marginTop: 12,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          gap: "5px",
        }}
      >
        <Clock
          color="#989898"
          size={15}
          strokeWidth={4}
          style={{
            borderRadius: 5,
            overflow: "hidden",
            backgroundColor: "#171717",
          }}
        />
        <span style={{ color: "#989898", fontSize: 16, fontWeight: 600 }}>
          Not resolved yet
        </span>
      </div>
    </div>
  );
};

export default MyBetModal;
