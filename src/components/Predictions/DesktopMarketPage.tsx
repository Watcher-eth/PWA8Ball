// @ts-nocheck

import React, { useState } from "react";

import { DesktopNavbar } from "@/components/Common/DesktopNavbar";
import { PredictModal } from "@/components/Modals/PredictModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetUsersByMarketId } from "@/supabase/queries/markets/useGetUsersByMarketId";
import { useGetMarketById } from "@/supabase/queries/useGetMarketById";
import { BettersOverviewModal } from "@/components/Predictions/Betters/OverviewModal";
import { CommentSection } from "@/components/Posts/Comments/CommentSection";
import { BetDetails } from "@/components/Predictions/Details";
import { RelatedMarkets } from "@/components/Predictions/RelatedMarkets";
import { fillUserImages } from "@/utils/fillUserImages";
import DesktopPredictComponent from "./DesktopPredictComponent";

export function DesktopMarketPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data: users } = useGetUsersByMarketId(10);
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const { data: market } = useGetMarketById(
    String(4),
    user?.external_auth_provider_user_id
  );

  const userImages = fillUserImages(users, 3);

  const id = 8;
  return (
    <div className="w-full bg-[#080808] h-full flex flex-col">
      <div className="w-full h-[28vh] relative">
        <img
          className="w-full transform rotate-180 object-cover h-[28vh] relative"
          alt="CoverImage"
          src={market?.image}
        />
        <div className="h-[40vw] w-full  bg-gradient-to-b from-[#080808] via-transparent to-transparent backdrop-blur-xl -contrast-200 absolute bottom-0" />

        <div className="h-[40vw] w-full bg-gradient-to-t from-[#080808] via-transparent to-transparent absolute bottom-0" />
        <img
          className="h-[14vh] absolute ml-14 -bottom-16 object-cover w-[14vh] rounded-[0.5rem] mb-4 border-2 border-[#080808] z-20"
          src={market?.image}
        />
      </div>
      <div className="absolute top-8 w-full px-8 z-10 self-center">
        <DesktopNavbar />
      </div>
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="bg-[#070707] w-full pl-3 h-full overflow-y-auto flex flex-col"
      >
        <div className="relative h-full">
          <div className="grid grid-cols-10 gap-4 p-6">
            <div className="col-span-4">
              <div className="flex flex-col mt-[2.5rem] z-10">
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
                        ${((market?.usdcstake ?? 0) / 100000).toFixed(2)}
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
            <div className="col-span-3  flex flex-col items-center p-3 px-1 -mr-9    pb-1 rounded-[1.4rem]">
              <DesktopPredictComponent
                id={market?.id}
                question={market?.question}
                title={market?.title}
                image={market?.image}
                options={[
                  {
                    name: market?.options[0].name,
                    value: market?.outcomea,
                  },
                  {
                    name: market?.options[1].name,
                    value: market?.outcomeb,
                  },
                ]}
                topic={market?.topic_title}
              />
            </div>
            <div className="col-span-3 bg-[#080808] p-4  pt-[3.8rem] rounded-lg">
              <RelatedMarkets
                isDesktop={true}
                topicId={market?.topic_id}
                id={market?.id}
              />
            </div>
            <div className="col-span-4 bg-[#080808] max-w-[70vw] p-4 rounded-lg mt-1">
              <CommentSection
                topic_id={market?.topic_id}
                users={users}
                totalComments={market?.total_comments}
                optimisticComments={[]}
                marketId={id}
                setReply={() => {}}
                isDesktop={true}
                handleComment={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
