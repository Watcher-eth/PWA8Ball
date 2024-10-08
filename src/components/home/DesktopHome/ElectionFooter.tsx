import Link from "next/link";
import { ELECTIONS_PATH } from "@/utils/urls";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import { Countdown } from "@/components/common/CountDown";
import { ELECTION_END_DATE } from "@/components/topic/ElectionPage";
import { ChevronDown } from "lucide-react";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "@/components/layouts/StandardBleedOverlay";
import { DesktopFooter } from "./DesktopFooter";
import { motion } from "framer-motion";
import { DesktopCardSectionSkelleton, MarketCard } from "./MarketCard";

export function ElectionFooter<T>({ markets }: { markets: T[] }) {
  const enrichedFeedData = formatMarketArr({
    // @ts-ignore
    markets,
    selectedTopic: "🇺🇸 2024 US Elections",
  });

  return (
    <div className="px-0 xl:px-4 mt-[6.5rem] flex flex-col w-full">
      <div className="flex flex-col w-full px-6 lg:px-14">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0 mb-3">
            <div className="text-[1.9rem] text-white font-[Aeonik-Bold] space-x-2">
              🇺🇸 2024 US Elections
            </div>
            <div className="text-base text-[lightgray] font-normal flex flex-col space-x-2">
              Get the latest forecasts about the 2024 US Federal Elections
            </div>
          </div>
          <Countdown endDate={ELECTION_END_DATE} />
        </div>

        <MarketCardSection
          length={3}
          feedDataArr={enrichedFeedData?.slice(0, 3)}
          amount={{ base: 3, xl: 4 }}
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
          feedDataArr={enrichedFeedData?.slice(0, 4)}
          amount={{ base: 2, xl: 2 }}
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
  amount,
}: {
  feedDataArr?: T[];
  length: number;
  amount: { base: number; xl: number; "2xl"?: number };
}) {
  const skeletonCount =
    amount?.base && feedDataArr?.length
      ? Math.max(amount.base - feedDataArr.length, 0)
      : 0;

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="flex flex-row overflow-x-auto no-scrollbar w-full gap-6 py-6 mb-7"
    >
      {feedDataArr?.map((item: T, index: number) => (
        <MarketCard
          key={index}
          item={item}
          isTwoCards={length === 2}
          amount={amount}
        />
      ))}

      {Array.from({ length: skeletonCount }).map((_, index) => (
        <DesktopCardSectionSkelleton
          item={index}
          isTwoCards={length === 2}
          loading={false}
          amount={amount}
        />
      ))}
    </motion.div>
  );
}
