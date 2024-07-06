// @ts-nocheck

import React, { useState, useCallback, useRef } from "react";
import { ArrowLeft, ChevronLeft, LineChart, Share } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";

import { AvatarImage, Avatar } from "../ui/avatar";
import { VotingModal } from "../Modals/BuyVotes/VotingModal";
import { ShareModal } from "../Modals/ShareModal";
import { useModalStore } from "@/lib/stores/ModalStore";
import { motion } from "framer-motion";
import { useGetUsersByMarketId } from "@/lib/supabase/queries/markets/useGetUsersByMarketId";
import { useGetMarketById } from "@/lib/supabase/queries/fetchMarketForId";
import { BettersOverviewModal } from "./Betters/OverviewModal";
import { CommentSection } from "../Posts/Comments/CommentSection";
import { BetDetails } from "./Details";
import { parseOptions } from "@/lib/utils/parseOption";

const Bet = ({ id }) => {
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
  console.log("market", market);
  if (market)
    return (
      <motion.div
        onClick={() => setIsDrawerOpen(false)}
        className="bg-[#070707] w-[100vw] h-[100vh] overflow-y-auto items-center  flex flex-col "
      >
        <div className="relative h-[100vw]">
          <div
            style={{ zIndex: 2 }}
            className="flex items-center absolute top-3  justify-between px-6 py-2  w-[100vw]"
          >
            <ArrowLeft
              strokeWidth={3.8}
              size={33}
              style={{ backgroundColor: "rgba(17, 17, 17, 0.15)" }}
              className="p-2 rounded-full backdrop-blur-lg "
            />
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
              src={market?.image}
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
              market?.title?.length < 14
                ? 35
                : market?.title?.length < 21
                ? 32
                : 26,
          }}
          className=" pr-10 mt-[-3.8rem] text-start mb-[-0.7rem] self-start  pl-5 pb-0 p-3 text-white text-bold"
        >
          {market?.title}
        </div>

        <div className="flex justify-between  mt-4  items-center w-[88vw] mx-5">
          <div className="flex flex-col">
            <div
              style={{ zIndex: 2 }}
              className="text-[0.85rem]  text-gray-200 text-bold"
            >
              At stake
            </div>
            <div
              style={{ zIndex: 2, fontWeight: 600 }}
              className="text-[1.6rem] mt-[-0.25rem]  text-white flex items-center "
            >
              <div>
                {" "}
                $
                {market?.usdcstake
                  ? (market?.usdcstake / 100000).toFixed(2)
                  : "0.00"}
              </div>
            </div>
          </div>
          <BettersOverviewModal
            title={market?.title}
            question={market?.description}
            image={market?.image}
            optionA={{
              multiplier: 1, // Dummy value, adjust as necessary
              name: market?.options[1].name, // Assuming options array is not empty
              odds: market?.outcomea || 50, // Dummy odds, calculate or adjust as necessary
            }}
            optionB={{
              multiplier: 1, // Dummy value, adjust as necessary
              name: market?.options[0].name, // Assuming options array is not empty
              odds: market?.outcomeb || 50, // Dummy odds, calculate or adjust as necessary
            }}
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
          style={{ zIndex: 2 }}
          className="h-[0.1rem] w-[89vw] mt-[0rem] bg-[#212121] mx-5 rounded-full"
        />

        <div
          style={{
            zIndex: 2,
            fontFamily: "Aeonik-Bold",
            lineHeight: "1.35rem",
          }}
          className="text-[1.05rem] line-clamp-2 mb-[-1] mt-1  mt-2 text-start leading-6 text-gray-300 max-w-[88vw] ml-5 "
        >
          {market?.question}
        </div>
        <div
          style={{ zIndex: 2 }}
          className="flex items-center w-[88vw]  mt-[-4] mx-5 justify-between mx-2"
        >
          <VotingModal
            handleOpen={() => {}}
            image={market?.image}
            multiplier={market?.outcomeb || 50}
            option={0}
            text={market?.options[1].name}
            question={market?.question}
            odds={market?.outcomea}
            marketId={id}
            options={[market?.options[0].name, market?.options[1].name]}
          />
          <VotingModal
            handleOpen={() => {}}
            image={market?.image}
            multiplier={market?.outcomea || 50}
            option={1}
            text={market?.options[0].name}
            question={market?.question}
            odds={market?.outcomea}
            marketId={id}
            options={[market?.options[0].name, market?.options[1].name]}
          />
        </div>
        <div style={{ zIndex: 2 }}>
          <BetDetails
            endDate={"12th September, 2024"}
            icon={market?.topic_image}
            multiplier={2}
            topicId={market.topic_id}
            members={market?.members}
            handleBoost={() => {}}
            joined={false}
            question={market?.topic_description}
            image={market?.image}
            topic={market.topic_title}
            id={id}
          />
        </div>
        <div style={{ zIndex: 2 }}>
          <CommentSection
            topicId={market?.topic_id}
            users={users}
            totalComments={market?.total_comments}
            optimisticComments={[]}
            marketId={id}
            setReply={() => {}}
            handleComment={() => {}}
          />
        </div>
      </motion.div>
    );
};

export default Bet;
