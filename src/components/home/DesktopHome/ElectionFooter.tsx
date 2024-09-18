import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "@/components/layouts/StandardBleedOverlay";
import { Countdown } from "@/components/common/CountDown";
import { ELECTION_END_DATE } from "@/components/topic/ElectionPage";

import { MarketCard } from "./MarketCard";
import { DesktopFooter } from "./DesktopFooter";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { ELECTIONS_PATH } from "@/utils/urls";

export function ElectionFooter<T>({ markets }: { markets: T[] }) {
  const enrichedFeedData = formatMarketArr({
    // @ts-ignore
    markets,
    selectedTopic: "🇺🇸 2024 US Elections",
  });

  return (
    <div className="px-4 mt-[6.5rem] flex flex-col w-full">
      <div className="flex flex-col w-full px-14">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0 mb-3">
            <div className="text-[1.9rem] text-white font-[Aeonik-Bold] space-x-2">
              🇺🇸 2024 US Elections
            </div>
            <div className="text-[1.05rem] text-[lightgray] font-normal flex flex-col space-x-2">
              Get the latest forecasts about the 2024 US Federal Elections
            </div>
          </div>{" "}
          <Countdown endDate={ELECTION_END_DATE} />
        </div>

        <MarketCardSection
          length={3}
          feedDataArr={enrichedFeedData?.slice(0, 3)}
        />
        <div className="flex items-center justify-between">
          <div className="text-[1.7rem] text-white font-[Aeonik-Bold] space-x-2 hover:scale-[100.5%] active:scale-99">
            Latest News
          </div>
          <Link href={ELECTIONS_PATH} className="flex items-center gap-1">
            <div className="text-[1.1rem] text-[gray] font-[Aeonik] space-x-2">
              See all latest news
            </div>
            <ChevronDown color="gray" strokeWidth={2.4} size={"1.1rem"} />
          </Link>
        </div>
        <MarketCardSection
          length={2}
          feedDataArr={enrichedFeedData?.slice(1, 4)}
        />
        <Link
          href={ELECTIONS_PATH}
          className="flex items-center justify-center gap-1 hover:scale-[100.5%] active:scale-99"
        >
          <div className="text-[1.1rem] text-[#909090] font-[400] space-x-2">
            See all 20+ live Election forecasts
          </div>
          <ChevronDown color="gray" strokeWidth={2.4} size={"1.1rem"} />
        </Link>
        <div className="mb-40" />
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <DesktopFooter />
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
      </div>
    </div>
  );
}

function MarketCardSection<T>({
  feedDataArr,
  length,
}: {
  feedDataArr?: T[];
  length: number;
}) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="flex flex-row overflow-x-auto no-scrollbar w-full gap-6 py-6   mb-7"
    >
      {feedDataArr?.map((item: T, index: number) => (
        <MarketCard key={index} item={item} isTwoCards={length === 2} />
      )) ??
        [1, 2, 3, 4, 5, 6].map((index) => (
          <div
            className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}
            key={index}
          >
            <Skeleton className="rounded-lg w-[88vw] max-w-[23.5rem] md:max-w-[21.5rem] lg:max-w-[21.5rem] max-h-[27rem] h-[107vw]" />
          </div>
        ))}
    </motion.div>
  );
}
