// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";

import { formatMarketArr } from "@/utils/markets/formatMarketArr";

import { StandardPageWrapper } from "@/components/layouts/StandardPageWrapper";

import { FeedCard } from "@/components/home/FeedCard";
import { DesktopTrendingTopics } from "@/components/home/DesktopTrendingTopic";
import { TopicHeader } from "@/components/home/TopicHeader";
import { useGetAllMarkets } from "@/graphql/queries/markets/useGetAllMarkets";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { hardMarkets } from "@/constants/markets";
import { hardTopics } from "@/constants/topics";

export function DesktopHomePage({ trendingMarkets }) {
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic
  const { data: markets } = useGetAllMarkets();

  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    markets?.markets?.items,
    hardMarkets,
    hardTopics
  );
  const enrichedFeedData = formatMarketArr({
    markets: enhancedMarkets,
    selectedTopic,
  });

  if (enhancedMarkets)
    return (
      <>
        <div className="-mt-4">
          <TopicHeader
            setSelectedTopic={setSelectedTopic}
            selectedTopic={selectedTopic}
          />
        </div>
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full px-8 gap-6 py-6 overflow-y-visible"
        >
          {enrichedFeedData?.map((bet, index) => {
            return <FeedCard {...bet} key={index} />;
          })}
        </motion.div>
        <DesktopTrendingTopics
          title="US Elections"
          imageUrl="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ch/webcast/2021/01/ey-the-impact-of-the-us-election-on-the-global-business-environment-version2-20210112.jpg"
          subtitle="Everything about the US 2020 Federal Election"
          amount={"260,032"}
          topicId="1"
        />
      </>
    );
}
