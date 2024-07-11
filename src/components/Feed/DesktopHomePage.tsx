// @ts-nocheck
import React, { useState } from "react";
import { DesktopNavbar } from "@/components/Common/DesktopNavbar";
import { Cards } from "@/components/Feed/Cards";
import { DesktopTrendingTopics } from "@/components/Feed/DesktopTrendingTopic";
import { TopicHeader } from "@/components/Feed/TopicHeader";
import { useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { parseOptions } from "@/utils/predictions/parseOption";
import { stripEmoji } from "@/utils/string/stripEmoji";


export function DesktopHomePage() {
  const {
    data: markets,
    isLoading,
    error,
    refetch: refetchMarkets,
  } = useGetTrendingMarkets();
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic

  const taggedMarketsData = markets
    ? markets.map((market) => ({
        marketId: market.id,
        name: market.title, // Use title as name
        description: market.question, // Use question as description
        topic: market.topic_title || "Unknown", // Extract topic title if available
        image: market.image || "", // Use image if available
        icon: market.topic_image, // You might need a default or conditional icon
        stake: market.usdcstake,
        topicId: market.topic_id,
        multiplier:
          market.outcomea === market.outcomeb
            ? 2
            : market.outcomea > market.outcomeb
            ? 1 + (100 - market.outcomeb) / market.outcomeb
            : 1 + (100 - market.outcomea) / market.outcomea,
        optionA: {
          multiplier: 1, // Dummy value, adjust as necessary
          name: parseOptions(market?.options, 1), // Assuming options array is not empty
          odds: market.outcomea || 50, // Dummy odds, calculate or adjust as necessary
        },
        optionB: {
          multiplier: 1, // Dummy value
          name: parseOptions(market?.options, 2), // Assuming two options minimum
          odds: market.outcomeb || 50, // Dummy odds
        },
        type: "market",
        topicBio: market?.topic_description,
      }))
    : [];

  const enrichedFeedData =
    selectedTopic === "🔥 Trending"
      ? taggedMarketsData
      : taggedMarketsData.filter((item) =>
          item?.topic
            ? stripEmoji(item.topic) === stripEmoji(selectedTopic)
            : stripEmoji(item.name) === stripEmoji(selectedTopic)
        );

  return (
    <>
      <div className="mt-[-1rem]">
        <TopicHeader
          isDesktop={true}
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
      </div>
      <div className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full px-8 gap-6">
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
