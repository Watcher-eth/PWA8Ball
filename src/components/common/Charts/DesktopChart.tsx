// @ts-nocheck
import { motion } from "framer-motion";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig } from "@/components/ui/chart";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";

import { getMinMaxValues, processPrices } from "@/utils/chartUtils";
import { timeframes } from "./MyBetModal";
import { GenericAreaChart } from "@/components/charts/GenericAreaChart";
import { TimeframeSelector } from "@/components/charts/TimeframeSelector";
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
  option: number;
  userOwns?: { highest_amount: number; highest_option: number };
  isMarketPage?: boolean;
}) {
  const [timeframe, setTimeframe] = useState("1M");

  // const { data: prices, error: priceError } = useGetPricesForMarket(
  //   props?.id,
  //   timeframe
  // );

  const { data: prices2 } = useGetPricesForMarket(props?.id, timeframe);

  const userOutcome = props?.option;
  const { currentPrices, percentageDifference } = processPrices(
    prices2,
    userOutcome,
    props?.initialProb / 100,
    timeframe
  );

  const minMax = getMinMaxValues(currentPrices);

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    month: price.date.toLocaleString(), // Format the date as needed
    [`${props.options[0].name}`]: 100 - price.value,
    [`${props.options[1].name}`]: price.value,
  }));

  return (
    <div>
      <div className="flex flex-row items-center space-x-3 ">
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
            className={`${
              props?.isMarketPage
                ? " w-[5rem] h-[4.6rem] rounded-md"
                : " w-10 h-10 rounded-full"
            }  object-cover`}
            src={props.image}
            alt="Market image"
          />
        </div>
        <div className="flex flex-col w-full  -space-y-0.5">
          <div className="flex flex-row items-center justify-between mt-1">
            {props?.isMarketPage ? (
              <span className="text-white text-[1.9rem] font-[600]">
                {props?.title}
              </span>
            ) : (
              <span className="text-white text-lg font-semibold">
                {prices2
                  ? props?.userOwns?.highest_option === 1
                    ? currentPrices[currentPrices.length - 1].value.toFixed(2)
                    : currentPrices.length > 0
                    ? currentPrices[currentPrices.length - 1].value.toFixed(2)
                    : (100 - props.price).toFixed(2)
                  : (props.price / 10000).toFixed(2)}
                %{" "}
                {
                  props.options[props?.userOwns?.highest_option === 0 ? 1 : 0]
                    ?.name
                }
              </span>
            )}
            {props?.isMarketPage ? (
              <span
                className={`
            text-white text-3xl font-semibold
            ${props.optionNumber === 0 ? "text-[#FF0050]" : "text-blue-500"}
          `}
              >
                {currentPrices[currentPrices.length - 1].value.toFixed(2)}%{" "}
                {props?.options[0].name}
              </span>
            ) : (
              <span
                className={`
            text-white text-lg font-semibold
            ${props.optionNumber === 0 ? "text-[#FF0050]" : "text-blue-500"}
          `}
              >
                {percentageDifference && percentageDifference >= 0
                  ? `+${percentageDifference}`
                  : `${percentageDifference}`}
                %
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-between pb-1">
            {props?.isMarketPage ? (
              <span className="text-base text-white/80 font-[500]">
                {props?.question}
              </span>
            ) : (
              <span className="text-base text-white/80 font-semibold">
                {props.title}
              </span>
            )}
            {props?.isMarketPage ? (
              <span
                className={`
   text-base  font-semibold
                ${
                  percentageDifference === 0
                    ? "text-[#909090]"
                    : percentageDifference < 0
                    ? "text-[#FF0050]"
                    : "text-blue-500"
                }
              `}
              >
                {percentageDifference && percentageDifference >= 0
                  ? `+${percentageDifference}`
                  : `${percentageDifference}`}
                %
              </span>
            ) : (
              <span className="text-base text-white/80 font-semibold">
                {timeframe === "1D"
                  ? "Today"
                  : timeframe === "1W"
                  ? "This Week"
                  : timeframe === "1H"
                  ? "This Hour"
                  : "This Month"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          props?.isMarketPage ? "h-[48vh]  my-5" : "h-[40vh]"
        }  min-h-[280px] pb-2 pt-2"`}
      >
        <GenericAreaChart
          domain={[
            minMax.min - (minMax.max - minMax.min) / 4,
            minMax.max + (minMax.max - minMax.min) / 4,
          ]}
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
      {props?.userOwns && (
        <div className="flex flex-row items-center justify-between -mb-6">
          <div className="flex flex-col items-start">
            <span className="text-xs text-white/70">You voted</span>
            <span className="text-white text-lg font-semibold">
              {
                props.options[props?.userOwns?.highest_option === 1 ? 0 : 1]
                  ?.name
              }
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-white/70">Prediction Value</span>
            {prices2 && (
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
      )}
    </div>
  );
}
