// @ts-nocheck

import React, { useState } from "react";

import { PredictModal } from "@/components/Modals/PredictModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";
import { BettersOverviewModal } from "@/components/Predictions/Betters/OverviewModal";
import { CommentSection } from "@/components/Posts/Comments/CommentSection";
import { BetDetails } from "@/components/Predictions/Details";
import { RelatedMarkets } from "@/components/Predictions/RelatedMarkets";
import { fillUserImages } from "@/utils/fillUserImages";
import { DesktopPredictComponent} from "./DesktopPredictComponent";
import { Grid } from "../ui/tailwind/Grid";
import { Col } from "../ui/tailwind/Col";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";

export function DesktopMarketPage({users, market, id }) {

  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);

  const userImages = fillUserImages(users, 3);

  return (
    <StandardPageWrapper className="h-full flex flex-col">

        <div className="bg-[#070707] w-full pl-3 h-full overflow-y-auto flex flex-col">
          <div className="relative h-full">
            <Grid gap={4} cols={{ xs: 10 }}>
              <Col xs={4}>
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
                      options={[
                        market?.options[0].name,
                        market?.options[1].name,
                      ]}
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
                      options={[
                        market?.options[0].name,
                        market?.options[1].name,
                      ]}
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
              </Col>
              <Col xs={3}>
                <div className="  flex flex-col items-center p-3 px-1    pb-1 rounded-[1.4rem]">
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
              </Col>
              <Col xs={3}>
                <div className=" rounded-lg">
                  <RelatedMarkets
                    isDesktop={true}
                    topicId={market?.topic_id}
                    id={market?.id}
                  />
                </div>
              </Col>
              <Col xs={4} className=" max-w-[70vw] p-4 rounded-lg mt-1">
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
              </Col>
            </Grid>
          </div>
        </div>
    </StandardPageWrapper>
  );
}
