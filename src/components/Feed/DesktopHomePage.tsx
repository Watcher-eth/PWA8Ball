// @ts-nocheck
import React, { useState } from "react";

import { Cards } from "@/components/Feed/Cards";
import { DesktopTrendingTopics } from "@/components/Feed/DesktopTrendingTopic";
import { TopicHeader } from "@/components/Feed/TopicHeader";

import { formatMarketArr } from "./formatMarketArr";


export function DesktopHomePage({ trendingMarkets }) {
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic
  const enrichedFeedData = formatMarketArr({
    markets: trendingMarkets,
    selectedTopic,
  });


  return (
    <>
      <div className="mt-[-1rem]">
        <TopicHeader
          isDesktop={true}
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
      </div>
      <div className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full px-8 gap-6 py-3 overflow-y-visible">
        {enrichedFeedData?.map((bet, index) => {
          return (
            <div key={index}>
              <Cards

                image={bet.image!}
                icon={bet?.icon}
                description={bet?.description}
                title={bet.name}
                subject={bet?.topic}
                id={bet?.marketId}
                stake={bet?.stake}
                multiplier={bet?.multiplier}
                topicId={bet?.topicId}
                optionA={bet?.optionA}
                optionB={bet?.optionB}
                topicBio={bet?.topicBio}
              />
            </div>
          );
        })}
      </div>
      <DesktopTrendingTopics
        title="US Elections"
        imageUrl="https://assets.ey.com/content/dam/ey-sites/ey-com/en_ch/webcast/2021/01/ey-the-impact-of-the-us-election-on-the-global-business-environment-version2-20210112.jpg"
        subtitle="Everathing about the US 2020 Federal Election"
        amount={"260,032"}
        topicId="1"
      />
    </>
  );
}
