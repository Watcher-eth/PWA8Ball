// @ts-nocheck
import { useState } from "react";

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
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { hardMarkets } from "@/constants/markets";
import { hardTopics } from "@/constants/topics";
import { Market } from "@/__generated__/graphql";

export function MobileHomePage({ markets }: { markets: Market[] }) {
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic
  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    markets,
    hardMarkets,
    hardTopics
  );
  const enrichedFeedData = formatMarketArr({
    markets: enhancedMarkets,
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
      <div className=" flex flex-col w-full  no-scrollbar py-0 min-h-screen bg-[#080808]">
        <AppBanner />
        <TopicHeader
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
        <div className="px-5 flex flex-col w-full items-center no-scrollbar mt-2 space-y-6">
          {enrichedFeedData
            ? enrichedFeedData?.map((bet, index) => {
                return (
                  <div key={index}>
                    <FeedCard {...bet} />
                  </div>
                );
              })
            : [1, 2, 3, 4, 5, 6].map((index, item) => (
                <div
                  className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}
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
