// @ts-nocheck
import React, { useState } from "react";
import { DesktopNavbar } from "@/components/Common/DesktopNavbar";
import { Cards } from "@/components/Feed/Cards";
import { DesktopTrendingTopics } from "@/components/Feed/DesktopTrendingTopic";
import { TopicHeader } from "@/components/Feed/TopicHeader";
import { IMarketWithTopicDetails, useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { parseOptions } from "@/utils/predictions/parseOption";
import { stripEmoji } from "@/utils/string/stripEmoji";

export function formatMarketArr({
  trendingMarkets,
  selectedTopic,
}: {
  trendingMarkets: IMarketWithTopicDetails[];
  selectedTopic: string;
}) {
  const taggedMarketsData = trendingMarkets
    ? trendingMarkets.map((market) => ({
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
  return enrichedFeedData;
}
