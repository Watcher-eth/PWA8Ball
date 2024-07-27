// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlignLeft, ArrowLeftRight, Clock, Receipt, User2 } from "lucide-react";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";
import { useRouter } from "next/router";
import { DesktopCardModal } from "@/components/modals/DesktopCardModal";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "./DesktopChart";
import { CashoutOverview } from "@/componentspredictionsCashout/overview";
import { CashOutWarningScreen } from "@/componentspredictionsCreatorResolution";
import { CashoutConfirmScreen } from "@/componentspredictionsCashout/confirm";
import { processPrices } from "@/utils/chartUtils";
import { getProfilePath } from "@/utils/urls";

export const timeframes = ["1H", "1D", "1W", "1M"];

export const MobileMyBetModal = (props: {
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
  initialProb?: number;
  onClose: () => void;
  openCashout: () => void;
  handleReceipt: () => void;
  setStep: () => void;
}) => {
  const [timeframe, setTimeframe] = useState("1M");

  const { data: prices, error: priceError } = useGetPricesForMarket(
    props.betId,
    timeframe
  );

  const router = useRouter();
  const userOutcome = props?.optionNumber;
  const { currentPrices, percentageDifference } = processPrices(
    prices,
    userOutcome,
    props?.initialProb,
    timeframe
  );

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    month: price.date.toLocaleString(), // Format the date as needed
    desktop: price.value,
    mobile: 100 - price.value,
  }));
  return (
    <div
      className={`flex flex-col ${
        props?.isDesktop ? "bg-transparent" : "bg-[#0c0c0c]"
      } self-center pb-[30px] gap-[2px] ${
        props?.isDesktop ? "p-[5px]" : "p-[15px]"
      } pt-[10px] rounded-t-[30px] w-full`}
    >
      <div className="flex flex-row items-center justify-between my-[5px]">
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
            className="h-[38px] w-[38px] rounded-full object-cover"
            alt="Market image"
          />
        </motion.div>
      </div>
      <div className="flex flex-row items-center justify-between mt-[5px]">
        <span className="text-[19px] text-white font-bold">
          {prices
            ? props.optionNumber === 1
              ? currentPrices[currentPrices.length - 1].value
              : currentPrices.length > 0
              ? 100 - currentPrices[currentPrices.length - 1].value
              : 100 - props.price
            : props.price / 10000}
          %{" "}
          {props.options[props?.optionNumber === 1 ? 0 : 1]?.name
            ? props.options[props?.optionNumber === 1 ? 0 : 1]?.name
            : props.options?.name}
        </span>
        <span
          className={`text-[20px] font-bold ${
            props.optionNumber === 0 ? "text-[#FF0050]" : "text-[#0050FF]"
          }`}
        >
          {percentageDifference && percentageDifference >= 0
            ? `+${percentageDifference}`
            : `${percentageDifference}`}
          %
        </span>
      </div>
      <div className="flex flex-row items-center justify-between mt-[-3px]">
        <span className="text-[17px] text-[lightgray] font-semibold">
          {props.title}
        </span>
        <span className="text-[17px] text-[lightgray] font-semibold">
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
                left: 0,
                right: 0,
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
      <div className="w-[75%] flex flex-row items-center self-center justify-between mt-0">
        {timeframes.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => setTimeframe(item)}
            className={`p-[4px_7px] ${
              timeframe === item ? "bg-[lightgray]" : "bg-transparent"
            } rounded-[15px]`}
          >
            <span
              className={`text-[14px] font-bold ${
                timeframe === item ? "text-black" : "text-gray"
              }`}
            >
              {item}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="w-[101%] h-[1px] bg-[rgba(100,100,100,0.3)] my-[15px] mt-[20px]" />
      {props.ownedAmount === undefined ? (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[12px] text-[lightgray]">Created by</span>
            <div className="flex flex-row items-center mt-[5px]">
              <img
                src={props.icon}
                className="h-[22px] w-[22px] rounded-full mr-[5px]"
                alt="Creator"
              />
              <span className="text-white text-[19px] font-semibold">
                {props.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-[lightgray]">
              Prediction Value
            </span>
            {prices && (
              <span className="text-white text-[19px] font-semibold mt-[2px]">
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
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[12px] text-[lightgray]">
              {props.isExternal ? props.name : "You"} voted
            </span>
            <span className="text-white text-[19px] font-semibold">
              {props.options?.name}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-[lightgray]">
              Prediction Value
            </span>
            {prices && (
              <span className="text-white text-[19px] font-semibold">
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
      <div className="flex flex-row items-center mt-[8px] mb-[10px] self-center justify-between w-full space-x-4">
        <motion.div
          onClick={() => {
            if (props.name) {
              router.push({ pathname: `u/${props?.userId}` });
            } else {
              props.setStep(2);
            }
          }}
          className="mt-[11px] rounded-[25px] p-[10px] bg-[#1D1D1D] flex items-center justify-center flex-row gap-[3px] w-1/2"
        >
          {props.name ? (
            <User2 height={20} color={"#D9D9D9"} strokeWidth={3.3} />
          ) : (
            <ArrowLeftRight height={20} color={"#D9D9D9"} strokeWidth={3} />
          )}
          <span className="text-[20px] text-[#D9D9D9] font-bold">
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
          className="mt-[11px] flex p-[10px] flex-row rounded-[25px] bg-[#D9D9D9] items-center justify-center w-1/2"
        >
          <Receipt height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span className="text-[20px] text-[#1D1D1D] font-bold ml-[3px]">
            Details
          </span>
        </motion.div>
      </div>
      <div className="h-[1px] w-[101%] bg-[rgba(100,100,100,0.3)] my-[14px] mt-[20px]" />
      <div className="flex flex-row items-center gap-[4px]">
        <AlignLeft color="white" strokeWidth={3} size={17} />
        <span className="text-white font-semibold text-[19px]">
          About {props.title}
        </span>
      </div>
      <span className="text-white text-[16.5px] leading-[19px] mt-[5px]">
        {props.question}
      </span>
      <div className="h-[1px] w-full bg-[rgba(100,100,100,0.3)] my-[14px] mt-[12px]" />
      <div className="flex flex-row items-center self-center gap-[5px]">
        <Clock
          color="#989898"
          size={15}
          strokeWidth={4}
          className="rounded-[5px] bg-[#171717]"
        />
        <span className="text-[#989898] text-[16px] font-semibold">
          Not resolved yet
        </span>
      </div>
    </div>
  );
};

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
  initialProb,
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
  initialProb?: number;
  isExternal?: boolean;
}) {
  const [step, setStep] = useState(1);
  console.log("oned2", ownedAmount);
  return (
    <DesktopCardModal
      cardClassName="w-full rounded-[1.5rem]"
      dialogContentClassName="w-[30vw] bg-[#080808] rounded-[1.5rem] min-w-[400px]"
      cardContentClassName="w-[30vw] bg-[#080808] self-center rounded-[1.5rem] h-full min-w-[400px]"
      dialogClassName="w-full bg-[#080808] rounded-[1.5rem]"
      content={
        step === 1 ? (
          <MobileMyBetModal
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
            initialProb={initialProb}
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
            onClose={() => {}}
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
            onClose={() => {}}
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
            onClose={() => {}}
            totalPot={ownedAmount}
            points={ownedAmount}
          />
        ) : null
      }
    >
      {children}
    </DesktopCardModal>
  );
}
