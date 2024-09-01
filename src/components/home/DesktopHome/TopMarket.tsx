import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { useGetMarketById } from "@/graphql/queries/markets/useGetMarketById";
import { Users } from "lucide-react";

import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";
import { getMinMaxValues, processPrices } from "@/utils/chartUtils";

import { GenericLineChart } from "@/components/charts/GenericLineChart";
import { Chip } from "@/components/ui/Chip";

export function TopMarket() {
  const { market } = useGetMarketById("1");
  const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
    market,
    HARD_MARKETS,
    HARD_TOPICS
  );

  const { data: prices2 } = useGetPricesForMarket("1", "1M");

  const userOutcome = 0;
  const { currentPrices, percentageDifference } = processPrices(
    prices2,
    userOutcome,
    enhancedMarket?.initialProb,
    "1M"
  );

  const minMax = getMinMaxValues(currentPrices);

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    month: price.date.toLocaleString(), // Format the date as needed
    [`${enhancedMarket?.outcomeA}`]: 100 - price.value,
    [`${enhancedMarket?.outcomeB}`]: price.value,
  }));

  return (
    <div className="w-full flex  flex-row pl-1 mt-2 -mb-5  border-b-[0.1rem]  border-[#181818] pb-12 p  ">
      <div className="flex flex-col w-[30%] pr-5 z-1 pt-2">
        <img
          className="h-[6rem] w-[6rem] object-cover -mb-2 rounded-md"
          src={enhancedMarket?.image}
        />
        <div className="text-white text-3xl mt-6 font-semibold">
          {enhancedMarket?.title}
        </div>
        <div className="text-[lightgray] mt-2 text-lg font-normal">
          {enhancedMarket?.question}
        </div>
        <div className="flex pt-2 space-x-2">
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

        <div className="text-[gray] mt-8 -mb-3 text-md flex flex-row items-center space-x-2 font-[500]"></div>
      </div>
      <div className="flex flex-col h-full justify-between  w-[70%] z-1 ">
        <div className="text-[gray] text-md font-normal">
          {enhancedMarket?.title}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl font-[500] my-1 text-white">
            {enhancedMarket?.outcomeOddsA / 100}%{" "}
            {enhancedMarket?.outcomeA !== "Yes"
              ? enhancedMarket?.outcomeA
              : "Chance"}
          </div>
          <div className="text-3xl text-white/20 font-[Aeonik-Bold]">
            Glimpse
          </div>
        </div>
        <div className="w-full h-[9rem] my-3 rounded-md ">
          <GenericLineChart
            domain={
              minMax.max && [
                minMax.min - (minMax.max - minMax.min) / 6,
                minMax.max + (minMax.max - minMax.min) / 6,
              ]
            }
            chartData={chartData}
            xAxisKey="month"
            xAxisTickFormatter={(value) => value.slice(0, 3)}
          />
        </div>
        <div className="flex flex-row justify-between -mb-3 items-center">
          <div></div>
          <div className="flex flex-row  space-x-3  items-center ">
            <div className="px-6 py-1.5  flex items-baseline font-[500] text-[1.1rem] rounded-md bg-[#808080]/10 text-white border-[0.1rem] border-[#202020]">
              {enhancedMarket?.outcomeA}
              <p className="text-[0.75rem] text-[lightgray] ml-1">
                {enhancedMarket?.outcomeOddsA / 100}%
              </p>
            </div>
            <div className="px-6 py-1.5 text-[1.1rem] font-[500]  flex items-baseline rounded-md bg-[#808080]/10 text-white border-[0.1rem] border-[#202020]">
              {enhancedMarket?.outcomeB}
              <p className="text-[0.75rem] text-[lightgray] ml-1">
                {enhancedMarket?.outcomeOddsB / 100}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
