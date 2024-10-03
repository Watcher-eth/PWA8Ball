// @ts-nocheck
import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { StandardPageWrapper } from "../layouts/StandardPageWrapper"
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay"
import { Medal, Trophy, UserPlus } from "lucide-react"
import { useUserStore } from "@/lib/stores/UserStore"
import { BetComment } from "@/types/PostTypes"
import _ from "lodash"

import { JoinTopicButton } from "./JoinTopicButton"
import { useGetAllMarketsForTopic } from "@/graphql/queries/topics/useGetAllMarketsForTopic"
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { HARD_MARKETS } from "@/constants/markets"
import { HARD_TOPICS } from "@/constants/topics"
import {
  BlurOverlay,
  BlurOverlayWrapper,
} from "../onboarding/Invites/InviteBlur"
import { INVITES_ACTIVE } from "@/constants"
import { DesktopHomeNews } from "../home/DesktopHome/DesktopHomeNews"
import { FeaturedMarketsSection } from "../home/DesktopHome/FeaturedMarketsSection"
import { useGetTopicLeaderboard } from "@/graphql/leaderboard/useGetTopicLeaderboard"
import DesktopLeaderboardModal from "../activity/Leaderboard/DesktopLeaderboardModal"
import { getMarketPath } from "@/utils/urls"


export function DesktopTopic({
  name,
  description,
  image,
  icon,
  topic,
  id,
  type,
  members,
  markets,
  allTopicMarkets,
}) {
  const router = useRouter()
  const scrollRef = useRef(null)

  const { data: membersProfiles } = useGetMembersForTopic(id)
  const { user } = useUserStore()

  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    allTopicMarkets,
    HARD_MARKETS,
    HARD_TOPICS
  )

  const enhancedTrendingMarkets = enhanceMarketsWithImageAndPolyId(
    markets,
    HARD_MARKETS,
    HARD_TOPICS
  )

  const { data: LeaderBoardData } = useGetTopicLeaderboard()

  const [optimisticComments, setOptimisticComments] = useState<BetComment[]>([])

  const handleComment = () => {}
  const setReply = () => {}

  return (
    <BlurOverlayWrapper shouldShowOverlay={INVITES_ACTIVE}>
      <StandardPageWrapper className="h-full flex flex-col">
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className="w-full h-[18rem] relative">
              <img
                className="w-full transform object-cover h-[18rem] relative -mt-40"
                alt="CoverImage"
                src={image}
              />
              <div className="h-[18rem] w-full bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent absolute bottom-0" />
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
        <div className="full h-full overflow-y-auto z-20 mt-4 px-0 flex flex-col">
          <div className="flex flex-row items-center justify-between px-0">
            <div className="flex flex-col -space-y-2 mt-0">
              <div className="text-[2.5rem] text-white font-[Aeonik-Bold]">
                {name}
              </div>
              <div className="text-[1.2rem] text-[white]/[0.9] font-normal">
                {description}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex flex-row space-x-2 items-center">
                <JoinTopicButton
                  topicId={id}
                  userId={user?.walletAddress}
                />
                <DesktopLeaderboardModal title={name} data={LeaderBoardData}>
                  <div className="p-2.5 hover:scale-103 active:scale-97 flex space-x-2  items-center py-2.5 border-[0.1rem] bg-[#151515]/50 border-[#212121]/60 font-bold rounded-full text-base text-white">
                    <Trophy
                      color="white"
                      strokeWidth={2.5}
                      className="size-5"
                      size={"1.2rem"}
                    />
                  </div>
                </DesktopLeaderboardModal>
              </div>
              <div className="flex items-center mt-1.5 space-x-2 -mb-1 ml-[-0.2rem]">
                <div className="flex mt-1 -space-x-2">
                  {membersProfiles?.map((image, index) => (
                    <img
                      key={index}
                      src={image.pfp}
                      alt={`Avatar ${index}`}
                      className="size-7 hover:scale-103 active:scale-97 rounded-full border-2 border-[#151515]"
                    />
                  ))}
                </div>{" "}
                <span className="text-[lightgray] text-[1rem] ml-1 font-medium">
                  {membersProfiles?.length > 0
                    ? `${`${members} Members`}`
                    : `Be the first to join ${name}`}
                </span>
              </div>
            </div>
          </div>
          <div className="h-[0.05rem] w-full  bg-[#212121] mt-3.5  mb-5" />

          <div className="flex flex-col    ">
            <div className="mt-6 flex flex-row ">
              <DesktopHomeNews
                topic={true}
                amount={3}
                markets={enhancedTrendingMarkets}
              />
            </div>
            <div className="mb-6  text-3xl font-semibold text-white">
              Popular Predictions
            </div>
            <div className=" pb-[3rem]  flex flex-row">
              <FeaturedMarketsSection topic={true} markets={enhancedMarkets} />
            </div>

            <div className="h-[0.08rem] w-full bg-[#212121] px-8" />
            <div className="pt-12 pb-0 ml-1 flex flex-row ">
              <DesktopHomeNews amount={3} markets={enhancedMarkets} />
            </div>
          </div>
        </div>
      </StandardPageWrapper>
    </BlurOverlayWrapper>
  )
}

