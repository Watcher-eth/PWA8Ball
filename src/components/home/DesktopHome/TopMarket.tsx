import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { HARD_MARKETS } from "@/constants/markets"
import { HARD_TOPICS } from "@/constants/topics"
import { useGetMarketById } from "@/graphql/queries/markets/useGetMarketById"
import { Users } from "lucide-react"
import { getMinMaxValues, processPrices } from "@/utils/chartUtils"

import { GenericLineChart } from "@/components/charts/GenericLineChart"
import { Chip } from "@/components/ui/Chip"
import { formatChartDateStr } from "@/utils/datetime/parseChartDate"
import Link from "next/link"
import { getMarketPath } from "@/utils/urls"
import { useGetMarketPrices } from "@/graphql/queries/charts/useGetMarketPrices"
import { Skeleton } from "@/components/ui/Skeleton"
import MotionNumber from "motion-number"

export function TopMarket() {
  const { market } = useGetMarketById("1")
  const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
    market,
    HARD_MARKETS,
    HARD_TOPICS
  )

  const { data: prices2 } = useGetMarketPrices("1")

  const userOutcome = 0
  const { currentPrices, percentageDifference } = processPrices(
    prices2,
    userOutcome,
    enhancedMarket?.initialProb,
    "1W"
  )

  const minMax = getMinMaxValues(currentPrices)

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    month: price.date.toLocaleString(), // Format the date as needed
    [`${enhancedMarket?.outcomeA}`]: 100 - price.value,
    [`${enhancedMarket?.outcomeB}`]: price.value,
  }))

  return (
    <div className="w-full flex flex-row pl-1 -mt-2 -mb-5  border-b-[0.1rem] border-[#181818] pb-12">
      <Link
        href={getMarketPath(enhancedMarket?.marketId)}
        className="flex flex-col w-[30%] pr-5 z-1 pt-2"
      >
        {enhancedMarket?.image ? (
          <img
            className="size-24 object-cover -mb-2 rounded-md"
            src={enhancedMarket?.image}
          />
        ) : (
          <Skeleton className={`size-24 object-cover -mb-2 rounded-md`} />
        )}

        {enhancedMarket?.title ? (
          <div className="text-white text-2xl lg:text-3xl mt-6 font-semibold">
            {enhancedMarket?.title}
          </div>
        ) : (
          <Skeleton
            className={`h-9 w-[18rem] object-cover mt-0 lg:mt-6 rounded-full`}
          />
        )}
        {enhancedMarket?.question ? (
          <div className="text-[lightgray] lg:mt-2 text-lg font-[Aeonik]">
            {enhancedMarket?.question}
          </div>
        ) : (
          <div className="flex flex-col mt-3 mb-3">
            <Skeleton className={`h-[1rem] w-[20rem]   rounded-md`} />
            <Skeleton className={`h-[1rem] mt-2 w-[16rem]  rounded-md`} />
          </div>
        )}
        <div className="flex flex-col items-start lg:items-center gap-3 lg:gap-2 lg:flex-row pt-2 space-x-2">
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
              {(enhancedMarket?.usdcStake / 10 ** 6).toFixed(2)}
            </span>
            <div className="inline-block  text-sm text-white/60">at Stake</div>
          </Chip>
        </div>

        <div className="text-[gray] mt-8 -mb-3 text-md flex flex-row items-center space-x-2 font-[Aeonik]"></div>
      </Link>
      <div className="flex flex-col h-full justify-between -mb-1  w-[70%] z-1 ">
        {enhancedMarket?.title ? (
          <div className="text-[gray] text-md font-normal">
            {enhancedMarket?.title}
          </div>
        ) : (
          <Skeleton className={`h-[1rem] w-[15rem]   rounded-md`} />
        )}
        <Link
          href={getMarketPath(enhancedMarket?.marketId)}
          className="flex flex-row justify-between items-center"
        >
          <div className="text-3xl font-[Aeonik] my-0 text-white">
            <MotionNumber
              value={
                enhancedMarket?.outcomeOddsA
                  ? enhancedMarket?.outcomeOddsA / 100
                  : (0).toFixed(2)
              }
            />
            %{" "}
            {enhancedMarket
              ? enhancedMarket?.outcomeA !== "Yes"
                ? enhancedMarket?.outcomeA
                : "Chance"
              : "Chance"}
          </div>
          <div className="text-3xl text-white/10 font-[Aeonik-Bold]">
            Glimpse
          </div>
        </Link>
        <Link
          href={getMarketPath(enhancedMarket?.marketId)}
          className="w-[101%] h-[9rem] my-3.5 -ml-2  rounded-md "
        >
          <GenericLineChart
            domain={
              minMax.max && [
                minMax.min - (minMax.max - minMax.min) / 6,
                minMax.max + (minMax.max - minMax.min) / 6,
              ]
            }
            chartData={chartData}
            xAxisKey="month"
            xAxisTickFormatter={(value, ...args) => {
              // console.log({ value, args });
              return formatChartDateStr(value) //.slice(0, 3);
            }}
          />
        </Link>
        <div className="flex flex-row justify-between -mb-3 items-center">
          <div></div>
          <div className="flex flex-row  space-x-3  items-center ">
            <TopMarketOutcomeBtn
              id={enhancedMarket?.marketId}
              outcome={enhancedMarket?.outcomeA}
              outcomeOdds={enhancedMarket?.outcomeOddsA}
            />
            <TopMarketOutcomeBtn
              id={enhancedMarket?.marketId}
              outcome={enhancedMarket?.outcomeB}
              outcomeOdds={enhancedMarket?.outcomeOddsB}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function TopMarketOutcomeBtn({
  outcome,
  outcomeOdds = 0,
  id,
}: {
  outcome?: string
  outcomeOdds?: number // | bigint
  id: string
}) {
  return (
    <Link
      href={getMarketPath(id)}
      className={`
        px-6 py-1.5 flex items-baseline font-medium text-[1.1rem] rounded-md bg-[#1B1B1E]/70 hover:scale-101 active:scale-98 text-white border-[0.06rem] border-[#202020] shadow-sm shadow-[#212121]
      `}
    >
      {outcome}
      <p className="text-[0.75rem] text-[lightgray] ml-1">
        {outcomeOdds / 100}%
      </p>
    </Link>
  )
}
