import { useState } from "react";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { Market } from "@/__generated__/graphql";
import { formatMarketArr } from "@/utils/markets/formatMarketArr";

import { StandardPageWrapper } from "@/components/layouts/StandardPageWrapper";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "@/components/layouts/StandardBleedOverlay";
import { TopicHeader } from "@/components/home/TopicHeader";

import { TrendingCommunities } from "./TrendingCommunities";
import { ElectionFooter } from "./ElectionFooter";
import { TopMarket } from "./TopMarket";
import { DesktopHomeNews } from "./DesktopHomeNews";
import { FeaturedMarketsSection } from "./FeaturedMarketsSection";

export function DesktopHome({ markets }: { markets: Market[] }) {
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic

  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    markets,
    HARD_MARKETS,
    HARD_TOPICS
  );

  const enrichedFeedData = formatMarketArr({
    markets: enhancedMarkets,
    selectedTopic,
  });

  return (
    <StandardPageWrapper className="h-full bg-[#080808] flex flex-col">
      <div className="flex flex-col">
        <div className=" pb-8  flex flex-row">
          <TopMarket />
        </div>
        <TopicHeader
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
        <div className="h-[0.08rem] mt-4 w-full bg-[#212121] px-8" />

        <div className="pt-8 pb-3 flex flex-row px-1">
          <DesktopHomeNews amount={4} markets={enrichedFeedData} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />
        <div className="pt-8 pb-10 flex flex-row px-1">
          <DesktopHomeNews amount={3} markets={enhancedMarkets} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />
        <div className="pt-12 pb-[6rem] flex flex-row px-2">
          <FeaturedMarketsSection markets={enhancedMarkets} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />

        <div className="pt-12 pb-[6.5rem] flex flex-row px-5">
          <TrendingCommunities />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-5" />
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className="pt-12 flex flex-row">
              <ElectionFooter markets={enhancedMarkets} />
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
      </div>
    </StandardPageWrapper>
  );
}
