// @ts-nocheck

import { useState } from "react";
import "../../styles/fonts.css";
import { LayoutGroup, motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share } from "lucide-react";
import { ShareModal } from "../Modals/ShareModal";
import { PredictModal } from "../Modals/PredictModal";
import { useGetUsersByMarketId } from "@/supabase/queries/markets/useGetUsersByMarketId";
import { useGetMarketById } from "@/supabase/queries/useGetMarketById";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";
import { CommentSection } from "../Posts/Comments/CommentSection";
import { BetDetails } from "../Predictions/Details";
import { RelatedMarkets } from "../Predictions/RelatedMarkets";
import { BettersOverviewModal } from "../Predictions/Betters/OverviewModal";
import { fillUserImages } from "@/utils/fillUserImages";
import { getMarketPath } from "@/utils/urls";
import Link from "next/link";

export function FeedCard({
  image,
  title,
  description,
  icon,
  topic,
  id,
  stake,
  multiplier,
  topicId,
  optionA,
  optionB,
  topicBio,
  handleOpen,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data: users } = useGetUsersByMarketId(id);
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const {
    data: market,
    error,
    isLoading,
    refetch,
  } = useGetMarketById(String(id), user?.external_auth_provider_user_id);

  const userImages = fillUserImages(users, 3);

  return (
    // <LayoutGroup>
    //   <motion.div layout className="font-[Aeonik-Bold]">
    //     <Drawer disablePreventScroll={false}>
    //       <DrawerTrigger asChild>
    <div>
      <Link href={getMarketPath(id)} prefetch={true}>
        <DisplayFeedCard
          image={image}
          title={title}
          description={description}
          icon={icon}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </Link>
    </div>
    // </DrawerTrigger>
    /* <DrawerContent className=" flex flex-col fixed max-h-[103%] border-0 rounded-3xl items-center self-center">
            <DisplayFeedDrawerContent
              image={image}
              title={title}
              description={description}
              icon={icon}
              setIsDrawerOpen={setIsDrawerOpen}
              users={users}
              market={market}
              userImages={userImages}
              openLoginModal={openLoginModal}
              id={id}
              stake={stake}
              multiplier={multiplier}
              topicId={topicId}
              optionA={optionA}
              optionB={optionB}
              topicBio={topicBio}
              handleOpen={handleOpen}
              topic={topic}
            />
          </DrawerContent> */
    // </Drawer>
    // </motion.div>
    // </LayoutGroup>
  );
}

export function DisplayFeedDrawerContent({
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
  topic
}) {
  console.log("this ran")
  return (
    <motion.div
      onClick={() => setIsDrawerOpen(false)}
      className="bg-[#070707] w-screen overflow-auto flex flex-col"
    >
      <div className="relative h-[100vw]">
        <div className="flex items-center absolute top-3 justify-between px-6 py-2 w-screen z-[2]">
          <DrawerClose>
            <Link href="/">
              <ArrowLeft
                strokeWidth={3.8}
                size={33}
                className="p-2 rounded-full backdrop-blur-lg bg-[rgba(17,17,17,0.15)]"
              />
            </Link>
          </DrawerClose>
          <ShareModal
            image={image}
            title={title}
            question={description}
            topic={topic}
            options={[optionB, optionA]}
          >
            <Share
              size={33}
              strokeWidth={3.3}
              className="p-2 rounded-full backdrop-blur-xl bg-[rgba(17,17,17,0.15)]"
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
            style={{ zIndex: 2 }}
            className="h-[38vw] w-screen bg-gradient-to-t from-black via-transparent to-transparent absolute bottom-0"
          />
        </motion.div>
      </div>
      <div
        style={{
          zIndex: 2,
          fontFamily: "Benzin-Bold",
          lineHeight: "2.4rem",
          fontSize: title?.length < 14 ? 35 : title?.length < 21 ? 32 : 26.5,
        }}
        className="pr-10 mt-[-3.8rem] self-start text-start mb-[-0.7rem] pl-5 pb-0 p-3 text-white text-bold"
      >
        {title}
      </div>

      <div className="flex justify-between mt-4 items-center w-[88vw] mx-5">
        <div className="flex flex-col">
          <div
            className={`
                      text-[0.85rem] text-gray-200 text-bold
                      font-[Aeonik-Bold] z-[2]
                    `}
          >
            At stake
          </div>
          <div
            className={`
                      text-[1.6rem] mt-[-0.25rem] text-white flex items-center
                      font-[Aeonik-Bold] z-[2]
                    `}
          >
            <div> ${((stake ?? 0) / 100000).toFixed(2)}</div>
          </div>
        </div>
        <BettersOverviewModal
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
            className="flex space-x-[-1rem] mb-3 items-center z-[2]"
          >
            <Avatar>
              <AvatarImage src={userImages[0]} />
            </Avatar>
            <Avatar>
              <AvatarImage src={userImages[1]} />
            </Avatar>
            <Avatar className="border-1 border-white">
              <AvatarImage src={userImages[2]} />
            </Avatar>
          </div>
        </BettersOverviewModal>
      </div>
      <div className="h-2 w-full color-gray-300 bg-[gray] mx-5 rounded-full z-20" />

      <div
        className={`
                  text-[1.05rem] self-start
                  -mb-px mt-2 ml-5
                  text-start text-[lightgray] max-w-[88vw]
                   z-[2] font-[Aeonik-Bold] leading-[1.35rem]
                `}
      >
        {description}
      </div>
      <div
        style={{ zIndex: 2 }}
        className="flex items-center w-[88vw] mt-[-4] mx-5 justify-between mx-2"
      >
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
        />
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
        />
      </div>
      <div style={{ zIndex: 2 }}>
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
      <div className="z-[2]">
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
      <RelatedMarkets topicId={topicId} id={id} />
    </motion.div>
  );
}


function DisplayFeedCard({image, title, description, icon}) {
  return (
    <div

      className={`
                flex items-start flex-col rounded-lg w-[88vw] max-w-[21.5rem] max-h-[27rem] justify-end h-[105vw] relative
                shadow-transparent shadow-md hover:shadow-purple-400/30 hover:scale-101 active:scale-96 transition-all
                cursor-pointer font-[Aeonik-Bold]
              `}
    >
      <img
        alt="Card_Preview"
        src={image}
        className="w-full h-full absolute  object-cover rounded-lg z-[2]"
      />
      <div
        className={`
                  h-[50vw] w-[88vw] max-w-[21.5rem] max-h-[21.5rem]  rounded-b-lg bg-gradient-to-t from-[#171717]/85 to-transparent absolute bottom-0
                  z-[2]
                `}
      />
      <div
        style={{
          lineHeight: "2.3rem",
        }}
        className="text-[2.3rem] text-start mb-[0.2rem] pr-10 pb-0 p-3 text-white text-bold font-[Benzin-Bold] z-[2]"
      >
        {title}{" "}
      </div>
      <div
        className={`
                  z-[2]
                  rounded-b-lg w-[88vw] max-w-[21.5rem] items-center p-3 px-3 bg-gray-800/[0.2]
                  backdrop-blur-lg flex
                  border-[0.5px] border-white/5
                `}
      >
        <img
          className="h-[13vw] max-w-[3.4rem] max-h-[3.4rem] object-cover rounded-md w-[13vw] relative"
          src={icon}
        />
        <div
          style={{ fontFamily: "Aeonik" }}
          className="text-[1.1rem] text-start  line-clamp-2 leading-[1.1rem] text-white max-w-[65vw] ml-3 "
        >
          {description}
        </div>
      </div>
    </div>
  );
}