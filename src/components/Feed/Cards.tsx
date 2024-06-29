// @ts-nocheck

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../../styles/fonts.css";
import { LayoutGroup, motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import VotingModal from "../Modals/BuyVotes/index";
import { ArrowLeft, Share } from "lucide-react";
import ShareModal from "../Modals/ShareModal";
import Qourum from "./Qourum";
import BetDetails from "../Predictions/Details";
import { useGetUsersByMarketId } from "@/lib/supabase/queries/markets/getUsersForMarket";
import { useModalStore } from "@/lib/stores/ModalStore";
import BettersOverviewModal from "../Predictions/Betters/OverviewModal";
import { getUserOperationByHash } from "permissionless";
import CommentSection from "../Posts/Comments/CommentSection";
import { useGetMarketById } from "@/lib/supabase/queries/fetchMarketForId";
import { useUserStore } from "@/lib/stores/UserStore";
import LoginModal from "../Modals/LoginModal";
import RelatedMarkets from "../Predictions/RelatedMarkets";
function Cards(props: {
  image: string;
  title: string;
  description: string;
  icon: string;
  subject: string;
  stake: number;
  id: number;
  multiplier: number;
  topicId: string;
  optionA: { name: string; multiplier: number; odds: number };
  optionB: { name: string; multiplier: number; odds: number };
  topicBio: string;
  handleOpen: () => void;
}) {
  const {
    image,
    title,
    description,
    icon,
    subject,
    id,
    stake,
    multiplier,
    topicId,
    optionA,
    optionB,
    topicBio,
  } = props;
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

  const defaultImages = [
    "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
  ];

  let userImages;
  if (users) {
    userImages = users
      ?.map((user, index) => (index < 3 ? user.pfp : null))
      .filter((image) => image !== null);

    // Fill the remaining slots with default images if less than 3
    while (userImages.length < 3) {
      userImages.push(defaultImages[userImages.length]);
    }
  } else {
    userImages = defaultImages;
  }
  console.log("market2", market?.question);

  return (
    <LayoutGroup>
      <motion.div layout style={{ fontFamily: "Aeonik-Bold" }}>
        <Drawer>
          <DrawerTrigger asChild>
            <motion.div
              onClick={() => setIsDrawerOpen(true)}
              whileTap={{ scale: 0.96 }}
              style={{ borderRadius: "18px", fontFamily: "Aeonik-Bold" }}
              className="flex items-start flex-col rounded-xl w-[88vw] m-3 justify-end h-[105vw] relative"
            >
              <motion.div className="image-container">
                <Image
                  alt="Card_Preview"
                  layout="fill"
                  objectFit="cover"
                  src={image}
                  style={{ zIndex: 1, borderRadius: "18px" }}
                />
              </motion.div>

              <div
                style={{ zIndex: 2 }}
                className="h-[50vw] w-[88vw]   rounded-b-xl bg-gradient-to-t from-[#171717]/[0.85] to-transparent absolute bottom-0"
              />
              <div
                style={{
                  zIndex: 2,
                  lineHeight: "2.3rem",
                  fontFamily: "Benzin-Bold",
                }}
                className="text-[2.3rem] text-start mb-[0.2rem] pr-10 pb-0 p-3 text-white text-bold"
              >
                {title}{" "}
              </div>

              <div
                style={{ zIndex: 2 }}
                className="rounded-b-xl w-[88vw] items-center p-3 px-3 bg-gray-800/[0.2] backdrop-blur-lg flex"
              >
                <img
                  style={{ borderRadius: "8px" }}
                  className="h-[13vw] object-cover w-[13vw] relative"
                  src={icon}
                />
                <div
                  style={{ fontFamily: "Aeonik" }}
                  className="text-[1.1rem] text-start  line-clamp-2 leading-[1.1rem] text-white max-w-[65vw] ml-3 "
                >
                  {description}
                </div>
              </div>
            </motion.div>
          </DrawerTrigger>
          <DrawerContent className=" border-0 rounded-3xl items-center  self-center">
            <motion.div
              onClick={() => setIsDrawerOpen(false)}
              className="bg-[#070707] w-[100vw] h-[100vh] overflow-y-auto items-center  flex flex-col "
            >
              <div className="relative h-[100vw]">
                <div
                  style={{ zIndex: 2 }}
                  className="flex items-center absolute top-3  justify-between px-6 py-2  w-[100vw]"
                >
                  <DrawerClose>
                    <ArrowLeft
                      strokeWidth={3.8}
                      size={33}
                      style={{ backgroundColor: "rgba(17, 17, 17, 0.15)" }}
                      className="p-2 rounded-full backdrop-blur-lg "
                    />
                  </DrawerClose>
                  <ShareModal>
                    <Share
                      size={33}
                      strokeWidth={3.3}
                      style={{ backgroundColor: "rgba(17, 17, 17, 0.15)" }}
                      className="p-2 rounded-full backdrop-blur-xl "
                    />
                  </ShareModal>
                </div>
                <motion.div className="w-[100vw] h-[45vh] relative">
                  <img
                    className="w-[100vw] object-cover h-[45vh] relative"
                    alt="CoverImage"
                    src={image}
                  />
                  <div
                    style={{ zIndex: 2 }}
                    className="h-[40vw] w-[100vw]    bg-gradient-to-t from-black via-transparen to-transparent absolute bottom-0"
                  />
                </motion.div>
              </div>
              <div
                style={{
                  zIndex: 2,
                  fontFamily: "Benzin-Bold",
                  lineHeight: "2.4rem",
                  fontSize:
                    title?.length < 15 ? 35 : title?.length < 21 ? 32 : 26,
                }}
                className=" pr-10 mt-[-3.8rem] self-start text-start mb-[-0.7rem]  pl-5 pb-0 p-3 text-white text-bold"
              >
                {title}
              </div>

              <div className="flex justify-between  mt-4  items-center w-[88vw] mx-5">
                <div className="flex flex-col">
                  <div
                    style={{ zIndex: 2, fontFamily: "Aeonik-Bold" }}
                    className="text-[0.85rem]  text-gray-200 text-bold"
                  >
                    At stake
                  </div>
                  <div
                    style={{ zIndex: 2, fontFamily: "Aeonik-Bold" }}
                    className="text-[1.6rem] mt-[-0.25rem]  text-white flex items-center "
                  >
                    <div> ${stake ? (stake / 100000).toFixed(2) : "0.00"}</div>
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
                    style={{ zIndex: 2 }}
                    onClick={openLoginModal}
                    className="flex space-x-[-1rem] mb-3 items-center"
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
              <div
                style={{ zIndex: 20 }}
                className="h-2 w-[100%] color-gray-300  bg-[gray] mx-5 rounded-full"
              />

              <div
                style={{
                  zIndex: 2,
                  fontFamily: "Aeonik-Bold",
                  lineHeight: "1.35rem",
                }}
                className="text-[1.05rem] self-start mb-[-1] mt-1  mt-2 text-start leading-6 text-[lightgray] max-w-[88vw] ml-5 "
              >
                {market?.question}
              </div>
              <div
                style={{ zIndex: 2 }}
                className="flex items-center w-[88vw]  mt-[-4] mx-5 justify-between mx-2"
              >
                <VotingModal
                  handleOpen={props?.handleOpen}
                  image={image}
                  multiplier={optionB.odds / 100}
                  option={0}
                  text={optionB?.name}
                  question={description}
                  odds={market?.outcomea / 100}
                  marketId={id}
                  options={[optionB.name, optionA.name]}
                />
                <VotingModal
                  handleOpen={props?.handleOpen}
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
                  topic={subject}
                  id={id}
                />
              </div>
              <div style={{ zIndex: 2 }}>
                <CommentSection
                  topic_id={props?.topicId}
                  users={users}
                  totalComments={market?.total_comments}
                  optimisticComments={[]}
                  marketId={id}
                  setReply={() => {}}
                  handleComment={() => {}}
                />
              </div>
              <RelatedMarkets topicId={props?.topicId} id={id} />
            </motion.div>
          </DrawerContent>
        </Drawer>
      </motion.div>
    </LayoutGroup>
  );
}

export default Cards;
