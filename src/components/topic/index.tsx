// @ts-nocheck

import { useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Link from "next/link"
// Adjust import path as necessary
import { ChevronLeft, Share, Star } from "lucide-react"

import { LEADERBOARD_PATH } from "@/utils/urls"

import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic"

import { ShareTopicModal } from "@/components/share/topic/ShareTopicModal"

import { BetBigView, BetSmallView } from "./BetViews"
import { AvatarGroup } from "./AvatarGroup"
import { useGetCommentsForTopic } from "@/supabase/queries/comments/useGetCommentsForTopic"
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { HARD_MARKETS } from "@/constants/markets"
import { HARD_TOPICS } from "@/constants/topics"

const ICON_BUTTON_CLASSNAME = `
  bg-[rgba(50,50,50,0.25)] backdrop-blur-2xl
  rounded-full flex justify-center items-center
  absolute top-12 z-10 border-[0.1rem] border-[#606060]/20
  `

export function Topic({
  name,
  description,
  image,
  icon,
  topic,
  id,
  type,
  members,
  allTopicMarkets,
  trendingMarkets,
}) {
  const router = useRouter()
  const scrollRef = useRef(null)

  const { data: membersProfiles } = useGetMembersForTopic(id)
  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    allTopicMarkets,
    HARD_MARKETS,
    HARD_TOPICS
  )
  const enhancedTrendingMarkets = enhanceMarketsWithImageAndPolyId(
    trendingMarkets,
    HARD_MARKETS,
    HARD_TOPICS
  )
  console.log("markets", trendingMarkets, allTopicMarkets)
  return (
    <div className="flex overflow-x-hidden overflow-y-scroll flex-col no-scrollbar w-full bg-[#070707]  relative">
      <a
        onClick={() => router.back()}
        className={`${ICON_BUTTON_CLASSNAME} size-8 top-8 left-4`}
      >
        <ChevronLeft color="white" size={20} strokeWidth={4} />
      </a>
      <Link
        href={LEADERBOARD_PATH}
        className={`${ICON_BUTTON_CLASSNAME} size-8 top-8 right-14`}
      >
        <Star color="white" size={20} strokeWidth={3} />
      </Link>
      <ShareTopicModal
        image={image}
        title={name}
        question={description}
        topic={id}
        members={membersProfiles}
        markets={allTopicMarkets?.length}
      >
        <div className={`${ICON_BUTTON_CLASSNAME} p-2 top-8 right-3.5 `}>
          <Share size={17} strokeWidth={3.3} color="white" />
        </div>
      </ShareTopicModal>
      <motion.div
        className="w-full h-[35vh] flex flex-col -mt-2.5 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute top-10 w-screen h-[37.5vh] bg-gradient-to-b from-transparent to-[#070707]"></div>
      <div className="flex flex-col no-scrollbar p-4 mt-[-1.5rem]">
        <h1
          className={`
            text-[2.3rem] text-white font-bold mb-1 z-10 font-['Aeonik-Bold']
            ${name?.length < 17 ? "text-4xl" : "text-2xl"}
          `}
        >
          {name}
        </h1>
        <p className="text-base text-[lightgray] font-medium z-10">
          {description}
        </p>

        {enhancedTrendingMarkets?.length > 0 && (
          <div className="flex items-center mt-4 -ml-0.5  mb-1.5 ">
            <span className="text-white text-2xl  font-['Aeonik-Bold']">
              Trending Today
            </span>
          </div>
        )}
        {enhancedTrendingMarkets?.slice(0, 4)?.map((market, idx) => {
          const BetViewComponent = idx % 2 == 0 ? BetBigView : BetSmallView
          return (
            <BetViewComponent
              key={idx}
              marketId={market.id}
              title={market.title}
              question={market.question}
              image={market.image}
              topic={name}
              option1={{ name: market?.outcomeA, odds: market?.outcomeOddsA }}
              option2={{ name: market?.outcomeB, odds: market?.outcomeOddsB }}
            />
          )
        })}
        {enhancedMarkets?.length > 0 && (
          <div className="flex items-center mt-4 -ml-0.5  mb-1.5 ">
            <span className="text-white text-2xl  font-['Aeonik-Bold']">
              Popular Predictions
            </span>
          </div>
        )}
        {enhancedMarkets?.slice(0, 4)?.map((market, idx) => {
          const BetViewComponent = idx % 2 == 0 ? BetBigView : BetSmallView
          return (
            <BetViewComponent
              key={idx}
              marketId={market.id}
              title={market.title}
              question={market.question}
              image={market.image}
              topic={name}
              option1={{ name: market?.outcomeB, odds: market?.outcomeOddsB }}
              option2={{ name: market?.outcomeA, odds: market?.outcomeOddsA }}
            />
          )
        })}
      </div>
    </div>
  )
}
