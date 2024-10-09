// @ts-nocheck
import { useState } from "react";

import { INVITES_ACTIVE } from "@/constants";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { Market } from "@/__generated__/graphql";
import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import { Skeleton } from "@/components/ui/Skeleton";
import { LoginModal } from "@/components/modals/LoginModal";
import { AppBanner } from "@/components/common/AppBanner";
import { BlurOverlayWrapper } from "@/components/onboarding/Invites/InviteBlur";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { FeedCard } from "./FeedCard";
import { TopicHeader } from "./TopicHeader";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";

export function MobileHomePage({ markets }: { markets: Market[] }) {
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
  const { user } = useUserStore();
  const { openLoginModal, isLoginModalOpen, closeLoginModal } = useModalStore();
  return (
    <BlurOverlayWrapper shouldShowOverlay={!user?.invited}>
      <div className=" flex flex-col w-full  no-scrollbar py-0 min-h-screen bg-[#080808]">
        <AppBanner />
        <TopicHeader
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
        <div className="px-6 flex flex-col w-full items-center no-scrollbar mt-3 space-y-6">
          {enrichedFeedData?.map((bet, index) => {
            return (
              <div key={index}>
                <FeedCard {...bet} />
              </div>
            );
          }) ??
            [1, 2, 3, 4, 5, 6].map((index, item) => (
              <div className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}>
                <Skeleton className="w-[90vw] h-[65vh] rounded-[1.5rem]" />
              </div>
            ))}
        </div>
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </div>
    </BlurOverlayWrapper>
  );
}
