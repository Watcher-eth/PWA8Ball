// @ts-nocheck
import React, { useState } from "react";

import { FeedCard } from "@/components/Feed/FeedCard";
import { DesktopTrendingTopics } from "@/components/Feed/DesktopTrendingTopic";
import { TopicHeader } from "@/components/Feed/TopicHeader";
import { AnimatePresence, motion } from "framer-motion";
import { formatMarketArr } from "./formatMarketArr";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";

export function DesktopHomePage({ trendingMarkets }) {
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic
  const enrichedFeedData = formatMarketArr({
    markets: trendingMarkets,
    selectedTopic,
  });

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
        className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full px-8 gap-6 py-3 overflow-y-visible"
      >
        {enrichedFeedData?.map((bet, index) => {
          return (
            <div key={index}>
              <FeedCard {...bet} />
            </div>
          );
        })}
      </motion.div>
      <StandardPageWrapper>
        <DesktopTrendingTopics
          title="US Elections"
          imageUrl="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ch/webcast/2021/01/ey-the-impact-of-the-us-election-on-the-global-business-environment-version2-20210112.jpg"
          subtitle="Everything about the US 2020 Federal Election"
          amount={"260,032"}
          topicId="1"
        />
      </StandardPageWrapper>
    </>
  );
}
