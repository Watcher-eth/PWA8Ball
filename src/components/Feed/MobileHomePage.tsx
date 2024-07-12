// @ts-nocheck
import { useState } from "react";

import { useUserStore } from "@/lib/stores/UserStore";
import { LoginModal } from "../Modals/LoginModal";

import { formatMarketArr } from "./formatMarketArr";
import { Cards } from "./Cards";
import { TopicHeader } from "./TopicHeader";

export function MobileHomePage({ trendingMarkets }) {
  const { user } = useUserStore();

  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic
  const enrichedFeedData = formatMarketArr({
    markets: trendingMarkets,
    selectedTopic,
  });

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="w-screen flex flex-col  no-scrollbar py-0  bg-[#101010]">
      <TopicHeader
        setSelectedTopic={setSelectedTopic}
        selectedTopic={selectedTopic}
      />
      <div className="px-3 flex flex-col items-center no-scrollbar mt-2 space-y-6">
        {enrichedFeedData?.map((bet, index) => {
          return (
            <div key={index}>
              <Cards
                handleOpen={handleOpenLoginModal}
                {...bet}
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
