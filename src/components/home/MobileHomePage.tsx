// @ts-nocheck
import { useState } from "react";

import { useUserStore } from "@/lib/stores/UserStore";
import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import {
  AltSkeleton,
  Skeleton,
  skeletonVariants,
} from "@/components/ui/Skeleton";

import { LoginModal } from "@/components/modals/LoginModal";

import { FeedCard } from "./FeedCard";
import { TopicHeader } from "./TopicHeader";
import { AppBanner } from "../common/AppBanner";
import {
  BlurOverlayWrapper,
  withBlurOverlay,
} from "../onboarding/Invites/InviteBlur";
import { INVITES_ACTIVE } from "@/constants";

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
    <BlurOverlayWrapper shouldShowOverlay={INVITES_ACTIVE}>
      <div className="w-screen flex flex-col  no-scrollbar py-0 min-h-screen bg-[#101010]">
        <AppBanner />
        <TopicHeader
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
        <div className="px-3 flex flex-col items-center no-scrollbar mt-2 space-y-6">
          {!enrichedFeedData
            ? enrichedFeedData?.map((bet, index) => {
                return (
                  <div key={index}>
                    <FeedCard
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
              })
            : [1, 2, 3, 4, 5, 6].map((index, item) => (
                <div
                  style={{
                    marginVertical: index === 0 ? 20 : 20,
                    alignSelf: "center",
                    marginTop: index === 0 ? 25 : 20,
                  }}
                >
                  <Skeleton className="w-[90vw] h-[65vh] rounded-[1.5rem]" />
                </div>
              ))}
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      </div>
    </BlurOverlayWrapper>
  );
}

