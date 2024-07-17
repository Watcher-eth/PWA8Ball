// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlignLeft,
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
import { DesktopCardModal } from "@/components/Modals/DesktopCardModal";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "./DesktopChart";
import { CashoutOverview } from "@/components/Predictions/Cashout/overview";
import { CashOutWarningScreen } from "@/components/Predictions/CreatorResolution";
import { CashoutConfirmScreen } from "@/components/Predictions/Cashout/confirm";
const timeframes = ["1H", "1D", "1W", "1M"];
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
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
  isDesktop?: boolean;
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
        backgroundColor: props?.isDesktop ? "transparent" : "rgba(12,12,12, 1)",
        alignSelf: "center",
        paddingBottom: 30,
        gap: 2,
        padding: props?.isDesktop ? 5 : 15,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
      className="w-full"
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
          % {props.options[props?.option === 1 ? 0 : 1]?.name}
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
        <div>
          <ChartContainer className="h-[23vh] w-full my-4" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      ) : (
        <div>
          <ChartContainer className="h-[25vh] w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
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
              {props.options[props?.option === 1 ? 0 : 1]?.name}
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
        }}
        className="w-full space-x-4"
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
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
          className="w-1/2"
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
            alignItems: "center",
            justifyContent: "center",
          }}
          className="w-1/2"
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
        <AlignLeft color="white" strokeWidth={3} size={17} />
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

export function DesktopMyBetModal({
  children,
  title,
  image,
  price,
  ownedAmount,
  options,
  percentage,
  betId,
  topic,
  icon,
  question,
  name,
  userId,
  option,
  optionNumber,
  isExternal,
}: {
  children: React.ReactNode;
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
}) {
  const [step, setStep] = useState(1);

  return (
    <DesktopCardModal
      cardClassName="w-full"
      dialogContentClassName="w-[30vw]  min-w-[400px]"
      cardContentClassName="w-[30vw] self-center  h-full min-w-[400px]"
      dialogClassName="w-full"
      content={
        step === 1 ? (
          <MyBetModal
            title={title}
            image={image}
            price={price}
            ownedAmount={ownedAmount}
            options={options}
            percentage={percentage}
            betId={betId}
            topic={topic}
            icon={icon}
            question={question}
            name={name}
            userId={userId}
            option={option}
            optionNumber={optionNumber}
            isExternal={isExternal}
            isDesktop={true}
            setStep={setStep}
          />
        ) : step === 2 ? (
          <CashoutOverview
            option={option}
            options={options}
            image={image}
            question={question}
            title={title}
            changeStep={setStep}
            id={betId}
            odds={"20"}
            totalPot={ownedAmount}
            amount={ownedAmount}
            isDesktop={true}
          />
        ) : step === 3 ? (
          <CashOutWarningScreen
            option={option}
            options={options}
            image={image}
            question={question}
            title={title}
            changeStep={setStep}
            id={betId}
            multiplier={"2"}
            points={ownedAmount}
            amount={ownedAmount}
            isDesktop={true}
          />
        ) : step === 4 ? (
          <CashoutConfirmScreen
            isDesktop={true}
            option={option}
            options={options}
            image={image}
            question={question}
            title={title}
            changeStep={setStep}
            id={betId}
            odds={"20"}
            totalPot={ownedAmount}
            amount={ownedAmount}
          />
        ) : null
      }
    >
      {children}
    </DesktopCardModal>
  );
}
