// @ts-nocheck

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { motion } from "framer-motion";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";
import { useState } from "react";
import { processPrices } from "@/utils/chartUtils";
import { timeframes } from "./MyBetModal";

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
    desktop: price.value,
    mobile: 100 - price.value,
  }));

  const chartConfig2 = {
    desktop: {
      label: props.options[1].name,
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: props.options[0].name,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "30px 0 0 0",
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
            fontSize: 17,
            color: "white",
            fontWeight: 700,
          }}
        >
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
          style={{
            color: props.optionNumber === 0 ? "#FF0050" : "#0050FF",
            fontSize: 18,
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
          marginBottom: 3,
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
      <ChartContainer className="h-[25vh] w-full" config={chartConfig2}>
        <AreaChart accessibilityLayer data={chartData}>
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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          marginTop: 0,
          padding: "0 3rem",
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: -24,
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
            You voted
          </span>
          <span
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: 600,
            }}
          >
            {props.options[props?.userOwns?.highest_option === 1 ? 0 : 1]?.name}
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
