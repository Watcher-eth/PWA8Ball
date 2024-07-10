// @ts-nocheck

import { DesktopNavbar } from "@/components/Common/DesktopNavbar";
import { PredictModal } from "@/components/Modals/PredictModal";
import { ShareModal } from "@/components/Modals/ShareModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetUsersByMarketId } from "@/supabase/queries/markets/useGetUsersByMarketId";
import { useGetMarketById } from "@/supabase/queries/useGetMarketById";
import { ArrowLeft, Share } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BettersOverviewModal } from "@/components/Predictions/Betters/OverviewModal";
import { CommentSection } from "@/components/Posts/Comments/CommentSection";
import { BetDetails } from "@/components/Predictions/Details";
import { RelatedMarkets } from "@/components/Predictions/RelatedMarkets";
import { DesktopChart } from "@/components/Common/Charts/DesktopChart";

function DesktopHomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data: users } = useGetUsersByMarketId(10);
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const { data: market } = useGetMarketById(
    String(10),
    user?.external_auth_provider_user_id
  );

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
  const id = 8;
  return (
    <div className="w-full bg-[#080808] h-full flex flex-col">
      <motion.div className="w-full h-[28vh] relative">
        <img
          className="w-full object-cover h-[28vh] relative"
          alt="CoverImage"
          src={market?.image}
        />
        <div className="h-[40vw] w-full bg-gradient-to-t from-[#080808] via-transparent to-transparent absolute bottom-0" />
      </motion.div>
      <div className="absolute top-8 w-full px-8 z-10 self-center">
        <DesktopNavbar />
      </div>
      <motion.div
        onClick={() => setIsDrawerOpen(false)}
        className="bg-[#070707] w-full h-full overflow-y-auto flex flex-col"
      >
        <div className="relative h-full">
          <div className="grid grid-cols-10 gap-4 p-6">
            <div className="col-span-4">
              <div className="flex flex-col mt-[-5rem] z-10">
                <img
                  className="h-[14vh] ml-4 object-cover w-[14vh] rounded-[0.5rem] mb-4 border-2 border-[#080808]"
                  src={market?.image}
                />
                <div
                  style={{
                    fontFamily: "Benzin-Bold",
                    lineHeight: "2rem",
                    fontSize:
                      market?.title?.length < 14
                        ? 35
                        : market?.title?.length < 21
                        ? 32
                        : 26,
                  }}
                  className="pr-10 text-start mb-[-0.7rem] pl-5 pb-0 p-3 text-white font-bold"
                >
                  {market?.title}
                </div>
                <div className="flex justify-between mt-4 items-center mx-5">
                  <div className="flex flex-col">
                    <div className="text-[0.85rem] text-gray-200 font-bold">
                      At stake
                    </div>
                    <div
                      style={{ fontWeight: 600 }}
                      className="text-[1.6rem] mt-[-0.25rem] text-white flex items-center"
                    >
                      <div>
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
                <div className="h-[0.1rem] mt-[0rem] bg-[#212121] mx-5 rounded-full" />
                <div
                  style={{
                    fontFamily: "Aeonik-Bold",
                    lineHeight: "1.35rem",
                  }}
                  className="text-[1.05rem] line-clamp-2 mb-[-1] mt-1 mt-2 text-start leading-6 text-gray-300 max-w-full ml-5"
                >
                  {market?.question}
                </div>
                <div className="flex items-center mt-[-4] mx-5 justify-between">
                  <PredictModal
                    isDesktop={true}
                    handleOpen={() => {}}
                    image={market?.image}
                    multiplier={market?.outcomeb / 100 || 50}
                    option={0}
                    text={market?.options[1].name}
                    question={market?.question}
                    odds={market?.outcomea / 100}
                    marketId={id}
                    options={[market?.options[0].name, market?.options[1].name]}
                  />
                  <PredictModal
                    isDesktop={true}
                    handleOpen={() => {}}
                    image={market?.image}
                    multiplier={market?.outcomea / 100 || 50}
                    option={1}
                    text={market?.options[0].name}
                    question={market?.question}
                    odds={market?.outcomea / 100}
                    marketId={id}
                    options={[market?.options[0].name, market?.options[1].name]}
                  />
                </div>
                <BetDetails
                  endDate={"12th September, 2024"}
                  icon={market?.topic_image}
                  multiplier={2}
                  topicId={market?.topic_id}
                  members={market?.members}
                  handleBoost={() => {}}
                  joined={false}
                  question={market?.topic_description}
                  image={market?.image}
                  topic={market?.topic_title}
                  id={id}
                  isDesktop={true}
                />
              </div>
            </div>
            <div className="col-span-3 bg-[#121212] flex flex-col items-center p-4 rounded-xl">
              <DesktopChart question="Will Gta 6 cost more than 80 Dollars on release?" />
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-[25vw] bg-[#171717] rounded-xl p-5 py-4 flex flex-row items-center self-center justify-center"
              >
                <Share
                  className="h-[1.1rem] mr-1 text-white"
                  strokeWidth={3.4}
                />
                <p className="text-[1.1rem] font-semibold self-center text-white">
                  Share with your friends
                </p>
              </motion.div>
            </div>
            <div className="col-span-3 bg-[#080808] p-4 pt-16 rounded-lg">
              <RelatedMarkets
                isDesktop={true}
                topicId={market?.topic_id}
                id={market?.id}
              />
            </div>
            <div className="col-span-7 bg-[#080808] p-4 rounded-lg mt-4">
              <CommentSection
                topic_id={market?.topic_id}
                users={users}
                totalComments={market?.total_comments}
                optimisticComments={[]}
                marketId={id}
                setReply={() => {}}
                handleComment={() => {}}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DesktopHomePage;
