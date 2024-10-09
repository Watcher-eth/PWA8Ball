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
      <div className="flex flex-col mx-2 -mt-6 lg:mx-0">
        {/* <div className=" pb-8  flex flex-row">
          <TopMarket />
        </div> */}
        <StandardBleedOverlay>
          <TopicHeader
            setSelectedTopic={setSelectedTopic}
            selectedTopic={selectedTopic}
          />
        </StandardBleedOverlay>
        <HomeDivider />
        <div className="pt-3 pb-9 ">
          {/* Show 4 items on large screens */}
          <div className="hidden lg:flex">
            <DesktopHomeNews amount={4} markets={enrichedFeedData} />
          </div>
          {/* Show 2 items on medium and smaller screens */}
          <div className="flex lg:hidden">
            <DesktopHomeNews amount={3} markets={enrichedFeedData} />
          </div>
        </div>

        <HomeDivider />

        <div className="pt-10 pb-11 ">
          {/* Show 3 items on large screens */}
          <div className="hidden lg:flex">
            <DesktopHomeNews amount={3} markets={enhancedMarkets} />
          </div>
          {/* Show 2 items on medium and smaller screens */}
          <div className="flex lg:hidden">
            <DesktopHomeNews amount={2} markets={enhancedMarkets} />
          </div>
        </div>

        <HomeDivider />
        <div className="pt-12 pb-[6rem]  flex flex-row ">
          <FeaturedMarketsSection markets={[...enhancedMarkets].reverse()} />
        </div>
        <HomeDivider />

        <div className="pt-12 pb-[6.5rem] flex flex-row ">
          <TrendingCommunities />
        </div>
        <HomeDivider />
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

function HomeDivider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-[#212121] px-6 ${className}`} />;
}
