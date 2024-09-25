// @ts-nocheck
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Share } from "lucide-react"

import { HOME_PATH } from "@/utils/urls"
import { fillUserImages } from "@/utils/fillUserImages"

import { useModalStore } from "@/lib/stores/ModalStore"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DrawerClose } from "@/components/ui/drawer"

import { PredictModal } from "@/components/modals/PredictModal"
import { MobileShareBetModal } from "@/components/share/bet/MobileShareBetModal"

import { MobileDrawerContainer } from "@/components/ui/MobileDrawerContainer"
import { OutcomeButton } from "@/components/buttons/OutcomeButton"

import { MobileBettersModal } from "@/components/predictions/Betters/MobileBettersModal"
import { CommentSection } from "@/components/predictions/CommentSection"
import { BetDetails } from "@/components/predictions/BetDetails"
import { RelatedMarkets } from "@/components/predictions/RelatedMarkets"
import { useGetMarketById } from "@/graphql/queries/markets/useGetMarketById"
import { HARD_MARKETS } from "@/constants/markets"
import { HARD_TOPICS } from "@/constants/topics"
import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { formatMarket } from "@/utils/markets/formatMarketArr"
import {
  BlurOverlayWrapper,
  withBlurOverlay,
} from "../onboarding/Invites/InviteBlur"
import { INVITES_ACTIVE } from "@/constants"
import { useCheckReferral } from "@/hooks/useCheckReferral"
import { MarketMetadata } from "./BetDetails/MarketMetadata"
import { shortenAddress } from "@/utils/address/shortenAddress"
import { useUserStore } from "@/lib/stores/UserStore"
import { LoginModal } from "../modals/LoginModal"
import { useGetUserById } from "@/graphql/queries/users/useUserById"
import { useGetUserPositionsForMarket } from "@/graphql/queries/positions/useGetUserPositionsForMarket"
import { StatusBlock } from "./BetDetails/MarketStatus"

export function MobileMarketPage({ market, users, id }) {
  const openLoginModal = useModalStore((state) => state.openLoginModal)
  const userImages = fillUserImages(users, 3)
  useCheckReferral()

  const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
    market,
    HARD_MARKETS,
    HARD_TOPICS
  )
  return (
    <BlurOverlayWrapper shouldShowOverlay={INVITES_ACTIVE}>
      <MobileDrawerContainer>
        <MobileMarketContent
          setIsDrawerOpen={() => {}}
          users={users}
          id={market?.id}
          marketId={id}
          market={enhancedMarket}
          userImages={userImages}
          handleOpen={() => {}}
          {...formatMarket(enhancedMarket)}
        />
      </MobileDrawerContainer>
    </BlurOverlayWrapper>
  )
}

function MobileMarketContent({
  image,
  title,
  description,
  icon,
  setIsDrawerOpen,
  users,
  market,
  userImages,
  id,
  stake,
  multiplier,
  topicId,
  optionA,
  optionB,
  topicBio,
  handleOpen,
  topic,
  marketId,
}) {
  const { user } = useUserStore()
  const { openLoginModal, isLoginModalOpen, closeLoginModal } = useModalStore()
  const { user: creator, loading } = useGetUserById(market?.userAddress)
  const { data: userOwns } = useGetUserPositionsForMarket(
    user?.walletAddress,
    id
  )

  return (
    <motion.div
      onClick={() => setIsDrawerOpen(false)}
      className="bg-[#070707] w-screen overflow-auto flex flex-col"
    >
      <div className="relative h-[100vw]">
        <div className="flex items-center absolute top-3 justify-between px-6 py-2 w-screen z-2">
          <DrawerClose>
            <Link href={HOME_PATH} prefetch={true}>
              <ArrowLeft
                strokeWidth={3.8}
                size={33}
                className="p-2 text-white rounded-full border-[0.1rem] border-[#212121] backdrop-blur-md bg-[rgba(50 , 50 , 50 , 0.1)]"
              />
            </Link>
          </DrawerClose>
          <MobileShareBetModal
            image={image}
            title={title}
            question={description}
            topic={topic}
            options={[optionB, optionA]}
            isDesktop={false}
          >
            <Share
              size={33}
              strokeWidth={3.3}
              className="p-2 rounded-full text-white border-[0.1rem] border-[#212121] backdrop-blur-lg md-[rgba(50 , 50 , 50 , 0.1)]"
            />
          </MobileShareBetModal>
        </div>
        <motion.div className="w-screen h-[44vh] -mt-5 relative">
          <img
            className="w-screen object-cover h-[44vh] relative"
            alt="CoverImage"
            src={image}
          />
          <div
            className={`
              h-[38vw] w-screen
              bg-gradient-to-t from-black via-transparent to-transparent
              absolute bottom-0 z-2
            `}
          />
        </motion.div>
      </div>
      <div
        className={`
          pr-7 mt-[-3.8rem]  mb-[-0.7rem] pl-5 pb-0 p-3
          text-white text-bold leading-[2.4rem]
          self-start text-start z-2 font-[Benzin-Bold]
          ${
            title?.length < 14
              ? "text-[35px]"
              : title?.length < 21
              ? "text-[31px]"
              : "text-[26.5px]"
          }
        `}
      >
        {title}
      </div>

      <div className="flex justify-between mt-4 items-center w-[90vw] mx-5">
        <div className="flex flex-col">
          <div
            className={`
              text-[0.85rem] text-gray-200 text-bold
              font-[Aeonik-Bold] z-2
            `}
          >
            At stake
          </div>
          <div
            className={`
              text-[1.45rem] mt-[-0.35rem] text-white flex items-center
              font-[Aeonik-Bold] z-2
            `}
          >
            <div> ${((market?.usdcStake ?? 0) / 100000).toFixed(2)}</div>
          </div>
        </div>
        <MobileBettersModal
          title={title}
          question={description}
          image={image}
          optionA={optionA.name}
          optionB={optionB.name}
          odds={75}
          marketId={id}
          users={users}
        >
          <div
            onClick={openLoginModal}
            className="flex space-x-[-1rem] mb-3 items-center z-2"
          >
            <Avatar>
              <AvatarImage src={userImages[0]} />
            </Avatar>
            <Avatar>
              <AvatarImage src={userImages[1]} />
            </Avatar>
            <Avatar>
              <AvatarImage src={userImages[2]} />
            </Avatar>
          </div>
        </MobileBettersModal>
      </div>
      <div className="h-[0.06rem]  text-[0.01rem] bg-[#212121] w-[90%] my-1 z-1 self-center">
        h
      </div>
      <div
        className={`
          text-[1.05rem] self-start
          -mb-px mt-2 ml-5
          text-start text-[lightgray] max-w-full
           z-2 font-medium leading-[1.35rem]
        `}
      >
        {description}
      </div>

      {!user?.walletAddress ? (
        <div className="flex items-center  w-full justify-between z-2 space-x-4 px-4 ">
          <div
            onClick={openLoginModal}
            className="mt-4 hover:scale-101 w-full  active:scale-95 transition-all"
          >
            <OutcomeButton
              text={market?.outcomeB}
              multiplier={market?.outcomeOddsB / 100}
              option={0}
            />
          </div>
          <div className="mt-4 hover:scale-101 w-full  active:scale-95 transition-all ">
            <OutcomeButton
              onClick={openLoginModal}
              text={market?.outcomeA}
              multiplier={market?.outcomeOddsA / 100}
              option={1}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center  justify-between z-2 space-x-4 px-4 ">
          <PredictModal
            handleOpen={handleOpen}
            image={image}
            multiplier={market?.outcomeOddsB / 100}
            option={0}
            text={market?.outcomeB}
            question={description}
            odds={market?.outcomeOddsA / 100}
            marketId={id}
            options={[market?.outcomeB, market?.outcomeA]}
          >
            <div className="mt-4 hover:scale-101 active:scale-95 transition-all">
              <OutcomeButton
                text={market?.outcomeB}
                multiplier={market?.outcomeOddsB / 100}
                option={0}
              />
            </div>
          </PredictModal>
          <PredictModal
            handleOpen={handleOpen}
            image={image}
            multiplier={market?.outcomeOddsA / 100}
            option={1}
            text={market?.outcomeA}
            question={description}
            odds={market?.outcomeOddsA / 100}
            marketId={id}
            options={[market?.outcomeB, market?.outcomeA]}
          >
            <div className="mt-4 hover:scale-101 active:scale-95 transition-all ">
              <OutcomeButton
                text={market?.outcomeA}
                multiplier={market?.outcomeOddsA / 100}
                option={1}
              />
            </div>
          </PredictModal>
        </div>
      )}
      <div className="z-2 mt-3.5 px-1.5">
        <MarketMetadata
          creatorAddress={shortenAddress(market?.userAddress)}
          creatorLoading={loading}
          creator={creator}
          usdcStake={market?.usdcStake}
          liquidityStake={market?.liquidityBalanceUsdc}
          length={users?.length}
          users={userImages}
        />
        <BetDetails
          endDate={"12th September, 2024"}
          icon={icon}
          multiplier={multiplier}
          topicId={topicId}
          members={30}
          handleBoost={() => {}}
          joined={false}
          question={topicBio}
          image={image}
          betId={id}
          topic={topic}
          id={id}
        />
        <StatusBlock
          creator={market?.userAddress}
          endDate={"12th September, 2024"}
          createdAt={market?.createdAt}
          resolved={market?.resolved}
          outcome={market?.outcome}
          resolvedAt={market?.resolvedAt}
          proposedOutcome={market?.proposedOutcome}
          proposedAt={market?.proposedAt}
        />
      </div>
      <div className="z-2 -mt-5">
        <CommentSection
          topic_id={topicId}
          users={users}
          totalComments={market?.total_comments}
          marketId={market?.id}
        />
      </div>
      <div className="-mt-20">
        <RelatedMarkets topicId={topicId} id={id} />
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </motion.div>
  )
}
