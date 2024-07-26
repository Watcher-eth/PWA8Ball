// @ts-nocheck
import "../../styles/fonts.css";

import { motion } from "framer-motion";
import Link from "next/link";

import { HOME_PATH } from "@/utils/urls";
import { fillUserImages } from "@/utils/fillUserImages";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DrawerClose } from "@/components/ui/drawer";

import { PredictModal } from "@/components/Modals/PredictModal";
import { ShareModal } from "@/components/Modals/ShareModal";

import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";

import { MobileBettersModal } from "@/components/Predictions/Betters/MobileBettersModal";
import { CommentSection } from "@/components/Posts/Comments/CommentSection";
import { BetDetails } from "@/components/Predictions/BetDetails";
import { RelatedMarkets } from "@/components/Predictions/RelatedMarkets";

import { formatMarket } from "@/utils/markets/formatMarketArr";

import { ArrowLeft, Share } from "lucide-react";
import { MobileDrawerContainer } from "@/components/ui/MobileDrawerContainer";

import { OutcomeButton } from "@/components/buttons/OutcomeButton";

export function MobileMarketPage({ market, users }) {
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const userImages = fillUserImages(users, 3);

  return (
    <MobileDrawerContainer>
      <MobileMarketContent
        setIsDrawerOpen={() => {}}
        users={users}
        market={market}
        userImages={userImages}
        openLoginModal={openLoginModal}
        handleOpen={() => {}}
        {...formatMarket(market)}
      />
    </MobileDrawerContainer>
  );
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
  openLoginModal,
  id,
  stake,
  multiplier,
  topicId,
  optionA,
  optionB,
  topicBio,
  handleOpen,
  topic,
}) {
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
                className="p-2 text-white rounded-full backdrop-blur-lg bg-[rgba(17,17,17,0.15)]"
              />
            </Link>
          </DrawerClose>
          <ShareModal
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
              className="p-2 rounded-full text-white backdrop-blur-xl bg-[rgba(17,17,17,0.15)]"
            />
          </ShareModal>
        </div>
        <motion.div className="w-screen h-[42vh] relative">
          <img
            className="w-screen object-cover h-[42vh] relative"
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
          pr-10 mt-[-3.8rem]  mb-[-0.7rem] pl-5 pb-0 p-3
          text-white text-bold leading-[2.4rem]
          self-start text-start z-2 font-[Benzin-Bold]
          ${
            title?.length < 14
              ? "text-[35px]"
              : title?.length < 21
              ? "text-[32px]"
              : "text-[26.5px]"
          }
        `}
      >
        {title}
      </div>

      <div className="flex justify-between mt-4 items-center w-[88vw] mx-5">
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
              text-[1.6rem] mt-[-0.25rem] text-white flex items-center
              font-[Aeonik-Bold] z-2
            `}
          >
            <div> ${((stake ?? 0) / 100000).toFixed(2)}</div>
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
            <Avatar className="border border-white">
              <AvatarImage src={userImages[2]} />
            </Avatar>
          </div>
        </MobileBettersModal>
      </div>
      <div className="h-2 w-full text-gray-300 bg-[gray] mx-5 rounded-full z-20" />

      <div
        className={`
          text-[1.05rem] self-start
          -mb-px mt-2 ml-5
          text-start text-[lightgray] max-w-[88vw]
           z-2 font-[Aeonik-Bold] leading-[1.35rem]
        `}
      >
        {description}
      </div>
      <div className="flex items-center justify-around mx-4 z-2 space-x-4">
        <PredictModal
          handleOpen={handleOpen}
          image={image}
          multiplier={optionB.odds / 100}
          option={0}
          text={optionB?.name}
          question={description}
          odds={market?.outcomea / 100}
          marketId={id}
          options={[optionB.name, optionA.name]}
        >
          <div className="mt-4 hover:scale-101 active:scale-95 transition-all w-full">
            <div>
              <OutcomeButton
                text={optionB?.name}
                multiplier={optionB.odds / 100}
                option={0}
              />
            </div>
          </div>
        </PredictModal>
        <PredictModal
          handleOpen={handleOpen}
          image={image}
          multiplier={optionA.odds / 100}
          option={1}
          text={optionA?.name}
          question={description}
          odds={market?.outcomea / 100}
          marketId={id}
          options={[optionB.name, optionA.name]}
        >
          <div className="mt-4 hover:scale-101 active:scale-95 transition-all w-full">
            <OutcomeButton
              text={optionA?.name}
              multiplier={optionA.odds / 100}
              option={1}
            />
          </div>
        </PredictModal>
      </div>
      <div className="z-2">
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
      </div>
      <div className="z-2">
        <CommentSection
          topicId={topicId}
          users={users}
          totalComments={market?.total_comments}
          optimisticComments={[]}
          marketId={id}
          setReply={() => {}}
          handleComment={() => {}}
        />
      </div>
      <div className="-mt-20">
        <RelatedMarkets topicId={topicId} id={id} />
      </div>
    </motion.div>
  );
}
