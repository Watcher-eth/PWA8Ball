// @ts-nocheck
import { motion } from "framer-motion";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";

import { processPrices } from "@/utils/chartUtils";
import { timeframes } from "./MyBetModal";
import { GenericAreaChart } from "@/components/charts/GenericAreaChart";

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DesktopChart(props: {
  question: string;
  id: string;
  title: string;
  image: string;
  options: string[];
  topic: string;
  initialProb: number;
  userOwns?: { highest_amount: number; highest_option: number };
}) {
  const [timeframe, setTimeframe] = useState("1M");

  const { data: prices, error: priceError } = useGetPricesForMarket(
    props?.id,
    timeframe
  );

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
    [`${props.options[0].name}`]: 100 - price.value,
    [`${props.options[1].name}`]: price.value,
  }));

  return (
    <div>
      <div className="flex flex-row items-center justify-between mt-6">
        <div
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
            className="size-9 rounded-full object-cover"
            src={props.image}
            alt="Market image"
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-1">
        <span className="text-white text-lg font-semibold">
          {prices
            ? props.optionNumber === 1
              ? currentPrices[currentPrices.length - 1].value
              : currentPrices.length > 0
              ? currentPrices[currentPrices.length - 1].value
              : 100 - props.price
            : props.price / 10000}
          % {props.options[props?.option === 1 ? 0 : 1]?.name}
        </span>
        <span
          className={`
            text-white text-lg font-semibold
            ${props.optionNumber === 0 ? "text-red-500" : "text-blue-500"}
          `}
        >
          {percentageDifference && percentageDifference >= 0
            ? `+${percentageDifference}`
            : `-${percentageDifference}`}
          %
        </span>
      </div>
      <div className="flex flex-row items-center justify-between pb-1">
        <span className="text-base text-white/80 font-semibold">
          {props.title}
        </span>
        <span className="text-base text-white/80 font-semibold">
          {timeframe === "1D"
            ? "Today"
            : timeframe === "1W"
            ? "This Week"
            : timeframe === "1H"
            ? "This Hour"
            : "This Month"}
        </span>
      </div>
      <div className="h-[25vh] min-h-[280px]">
        <GenericAreaChart
          chartData={chartData}
          xAxisKey="month"
          xAxisTickFormatter={(value) => value.slice(0, 3)}
        />
      </div>
      <TimeframeSelector
        timeframes={timeframes}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />
      <div className="flex flex-row items-center justify-between -mb-6">
        <div className="flex flex-col items-start">
          <span className="text-xs text-white/70">You voted</span>
          <span className="text-white text-lg font-semibold">
            {props.options[props?.userOwns?.highest_option === 1 ? 0 : 1]?.name}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-white/70">Prediction Value</span>
          {prices && (
            <span className="text-white text-lg font-semibold">
              $
              {(
                props?.userOwns?.highest_amount *
                (currentPrices[currentPrices.length - 1]?.value / 1000000)
              ).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


function TimeframeSelector({ timeframes, timeframe, setTimeframe }) {
  return (
    <div
      className={`
        flex flex-row items-center justify-between self-center
        mb-2.5 px-12
      `}
    >
      {timeframes.map((item, index) => (
        <div
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
        </div>
      ))}
    </div>
  );
}