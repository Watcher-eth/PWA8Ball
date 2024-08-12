// @ts-nocheck

import { fillUserImages } from "@/utils/fillUserImages";

import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Grid } from "@/components/ui/tailwind/Grid";
import { Col } from "@/components/ui/tailwind/Col";
import { StandardPageWrapper } from "@/components/layouts/StandardPageWrapper";
import {
  InverseBleedOverlay,
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "@/components/layouts/StandardBleedOverlay";
import { CommentSection } from "@/components/predictions/CommentSection";
import { BetDetails } from "@/components/predictions/BetDetails";
import { RelatedMarkets } from "@/components/predictions/RelatedMarkets";

import { DesktopPredictComponent } from "./DesktopPredictComponent";

import { AlignLeft } from "lucide-react";
import { DesktopBettersModal } from "./Betters/DesktopBettersModal";
import { useGetHighestOrderOption } from "@/supabase/queries/markets/useGetHighestOrderOption";
import { useState } from "react";
import { RulesCollapsible } from "./BetDetails/RulesCollapsible";

export function DesktopMarketPage({ users, market, id }) {
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const { data: userOwns } = useGetHighestOrderOption(user?.walletaddress, id);
  const userImages = fillUserImages(users, 3);
  const [comments, setComments] = useState([]);

  return (
    <StandardPageWrapper className="h-full flex flex-col">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-80 relative">
            <img
              className="w-full transform rotate-180 object-cover h-80 relative -mt-24"
              alt="CoverImage"
              src={market?.image}
            />
            <div className="h-80 w-full bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent backdrop-blur-lg absolute bottom-0" />
            <InverseBleedOverlay>
              <img
                className="size-28 md:size-32 lg:size-36 xl:size-40 ml-3 absolute -bottom-12 object-cover  rounded-[0.5rem] mb-4 border-2 border-[#080808] z-20"
                src={market?.image}
              />
            </InverseBleedOverlay>
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>
      <div className="w-full h-full overflow-y-auto flex flex-col">
        <div className="">
          <Grid gap={4} cols={{ xs: 8 }}>
            <Col xs={4} lg={5}>
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
                    <div className="text-[0.85rem] text-[lightgray] font-semibold">
                      At stake
                    </div>
                    <div className="text-[1.6rem] mt-[-0.25rem] text-white flex items-center font-semibold">
                      <div>
                        ${((market?.usdcstake ?? 0) / 100000).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <DesktopBettersModal
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
                      <Avatar className="border border-white">
                        <AvatarImage src={userImages[2]} />
                      </Avatar>
                    </div>
                  </DesktopBettersModal>
                </div>
                <div className="h-[0.1rem] mt-[0.55rem] bg-[#212121] mx-5  rounded-full" />
                <div className="text-[1rem] font-medium line-clamp-2 mb-0 mt-3 text-start flex flex-row items-center text-[lightgray] max-w-full ml-4 leading-[1.35rem]">
                  <AlignLeft className="h-[1rem]" strokeWidth={2.5} />
                  <div> Question</div>
                </div>
                <div className="text-[1.2rem] font-medium line-clamp-2 mb-0 mt-1 text-start text-[#fefefe] max-w-full ml-5 leading-[1.35rem]">
                  {market?.question}
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
                <RulesCollapsible />
              </div>
            </Col>
            <Col xs={4} lg={3}>
              <div className="pt-3 xl:px-4 pb-1 rounded-[1.5rem] ">
                <DesktopPredictComponent
                  id={market?.id}
                  question={market?.question}
                  title={market?.title}
                  image={market?.image}
                  initialProb={market?.initialprob}
                  userOwns={userOwns}
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
            <Col xs={5} className=" p-4 rounded-lg mt-1">
              <CommentSection
                topic_id={market?.topic_id}
                users={users}
                totalComments={market?.total_comments}
                marketId={id}
                isDesktop={true}
              />
            </Col>
            <Col xs={3}>
              <div className="mx-4 mt-2 rounded-lg">
                <RelatedMarkets
                  isDesktop={true}
                  topicId={market?.topic_id}
                  id={market?.id}
                />
              </div>
            </Col>
          </Grid>
        </div>
      </div>
    </StandardPageWrapper>
  );
}
