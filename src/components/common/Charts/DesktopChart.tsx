// @ts-nocheck
import { motion } from "framer-motion"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig } from "@/components/ui/chart"

import { getMinMaxValues, processPrices } from "@/utils/chartUtils"
import { timeframes } from "./MyBetModal"
import { GenericAreaChart } from "@/components/charts/GenericAreaChart"
import { TimeframeSelector } from "@/components/charts/TimeframeSelector"
import { Chip } from "@/components/ui/Chip"
import { MessageCircle, PlusCircle, ShareIcon, Users } from "lucide-react"
import { DesktopShareBetModal } from "@/components/share/bet/DesktopShareBetModal"
import { useGetMarketPrices } from "@/graphql/queries/charts/useGetMarketPrices"
export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DesktopChart(props: {
  question: string
  id: string
  title: string
  image: string
  options: string[]
  topic: string
  initialProb: number
  option: number
  userOwns?: { highest_amount: number; highest_option: number }
  isMarketPage?: boolean
  odds?: number[]
}) {
  const [timeframe, setTimeframe] = useState("1M")

  const { data: prices2 } = useGetMarketPrices(props?.id)

  const userOutcome = props?.option
  const { currentPrices, percentageDifference } = processPrices(
    prices2,
    userOutcome,
    props?.initialProb / 100,
    timeframe
  )

  const minMax = getMinMaxValues(currentPrices)

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    month: price.date.toLocaleString(), // Format the date as needed
    [`${props.options[0].name}`]: price.value,
    [`${props.options[1].name}`]: 100 - price.value,
  }))

  return (
    <div>
      <div className="flex flex-row items-center space-x-3 ">
        <div
          onClick={() => {
            props.onClose()
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
            })
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
              <span className="text-white text-[1.9rem] font-semibold">
                {props?.title}
              </span>
            ) : (
              <span className="text-white text-lg font-semibold">
                {prices2
                  ? props?.userOwns[0]?.option === 1
                    ? currentPrices[currentPrices.length - 1].value.toFixed(2)
                    : currentPrices.length > 0
                    ? currentPrices[currentPrices.length - 1].value.toFixed(2)
                    : (100 - props.price).toFixed(2)
                  : (props.price / 10000).toFixed(2)}
                %{" "}
                {props.options[props?.userOwns[0]?.option === 0 ? 1 : 0]?.name}
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
                {props?.options[0].name === "Yes"
                  ? "Chance"
                  : props?.options[0].name}
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
              <span className="text-base text-white/80 font-medium">
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
                    ? "text-[#FF3F3F]"
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

      {props?.isMarketPage && (
        <div className="flex pt-4 space-x-2 -mb-4 items-center justify-between">
          <div className="flex space-x-2">
            <Chip className="flex-shrink space-x-2 pt-0.5">
              <Users
                size="16"
                strokeWidth={2.7}
                color="gray"
                className="inline -mt-0.5"
              />
              <div className="inline-block text-[lightgray] text-sm">
                354+ Predictors
              </div>
            </Chip>
            <Chip className="flex-shrink space-x-1 text-[lightgray] pt-1 text-sm">
              $
              <span className="font-semibold text-[lightgray]">
                {(props?.usdcStake / 10 ** 6).toFixed(2)}
              </span>
              <div className="inline-block  text-sm text-white/60">
                at Stake
              </div>
            </Chip>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="hover:scale-102 active:scale-98">
              <MessageCircle
                size={20}
                className="text-white/60"
                strokeWidth={2.5}
              />
            </div>
            <div className="hover:scale-102 active:scale-98">
              <DesktopShareBetModal
                setStep={() => {}}
                image={props?.image}
                options={props.options}
                question={props.question}
                title={props.title}
                id={props.id}
                topic={props?.topic_title}
                odds={[props.outcomeOddsA, props?.outcomeOddsB]}
              >
                <ShareIcon
                  size={20}
                  className="text-white/60"
                  strokeWidth={2.5}
                />
              </DesktopShareBetModal>
            </div>
            <div className="hover:scale-102 active:scale-98">
              <PlusCircle
                size={20}
                className="text-white/60"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          props?.isMarketPage
            ? ` ${
                props?.userOwns.length > 0 ? "xl:h-[40vh] lg:h-[36vh] h-[37vh]" : "h-[38vh] lg:h-[36vh] xl:h-[43vh]"
              }  mt-7 mb-2.5 pt-2`
            : "h-[40vh] pb-2 pt-2"
        }  min-h-[280px] "`}
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
      {props?.userOwns.length > 0 && (
        <div className="flex flex-row items-center justify-between mb-2 mt-7">
          <div className="flex flex-col items-start">
            <span className="text-xs text-white/70">You voted</span>
            <span className="text-white text-lg font-semibold">
              {props.options[props?.userOwns[0]?.option === 1 ? 0 : 1]?.name}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-white/70">Prediction Value</span>
            {prices2 && (
              <span className="text-white text-lg font-semibold">
                $
                {(
                  (props?.userOwns[0]?.tokensOwned / 10 ** 6) *
                  (currentPrices[currentPrices.length - 1]?.value / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
