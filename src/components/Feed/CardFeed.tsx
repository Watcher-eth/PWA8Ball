// @ts-nocheck

import React, { useEffect, useMemo, useState } from "react";
import {Cards} from "./Cards";
import { useGetAllTopics } from "@/lib/supabase/queries/getTopics";
import { useGetTrendingMarkets } from "@/lib/supabase/queries/getTrendingMarkets";
import {TopicHeader} from "./TopicHeader";
import { stripEmoji } from "@/lib/utils/stripEmoji";
import { parseOptions } from "@/lib/utils/parseOption";
import { useUserStore } from "@/lib/stores/UserStore";
import {LoginModal} from "../Modals/LoginModal";

export function CardFeed() {
  const { user } = useUserStore();

  const data = [
    {
      image:
        "https://variety.com/wp-content/uploads/2024/01/MCDBARB_WB059.jpg?w=1000&h=563&crop=1",
      title: "Best Picture",
      description: "Will Barbie win the 2024 Academy Awards: Best Picture?",
      icon: "https://t2.gstatic.com/images?q=tbn:ANd9GcQEsRX4rvaUjN6bxmAR9bT6qlWkBFVJfgMLan-evEeWBLrh4KFqljv4ZUagBVmvCZVzN1jGbQ",
      subject: "Barbie Movie",
    },
    {
      image:
        "https://zora.co/api/thumbnail/8453/0xbfdb5d8d1856b8617f1881fd718580256fa8cf35",
      title: "100k MAU's",
      description: "Will Farcaster reach 100k monthly active users by July?",
      icon: "https://pbs.twimg.com/profile_images/1546487688601096192/QoG0ZVgH_400x400.jpg",
      subject: "Farcaster",
    },
    {
      image:
        "https://core.colorsxstudios.com/wp-content/uploads/2023/06/collect-bryann-2048x1152.jpeg",
      title: "10k Mints",
      description: "Will Colors Studio reach 10k mints on Zora by 2025?",
      icon: "https://www.colorsxstudio.com/static/e090ee77c7abac6371ab387b8035f1fa/logo.gif",
      subject: "Colors Studio",
    },
  ];
  const {
    data: topicsData,
    isLoading: topicsLoading,
    error: topicsError,
  } = useGetAllTopics();
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
        )

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="w-[100vw] flex flex-col  no-scrollbar py-0  bg-[#101010]">
      <TopicHeader
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
      <div className="px-3 flex flex-col items-center no-scrollbar space-x-3">
        {enrichedFeedData?.map((bet, index) => {
          if (bet?.topic !== "Farcaster")
            return (
              <div key={index}>
                <Cards
                  handleOpen={handleOpenLoginModal}
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
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
}

