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

import { useGetHighestOrderOption } from "@/supabase/queries/markets/useGetHighestOrderOption";
import { DesktopBettersModal } from "../Betters/DesktopBettersModal";
import { RulesCollapsible } from "../BetDetails/RulesCollapsible";
import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { useCheckReferral } from "@/hooks/useCheckReferral";
import { DesktopMarketHeader } from "./DesktopMarketHeader";
import { DesktopChartCard } from "./DesktopChartCard";

export function DesktopMarketPage({ users, market, id }) {
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const { data: userOwns } = useGetHighestOrderOption(user?.walletaddress, id);
  useCheckReferral();
  const userImages = fillUserImages(users, 3);
  const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
    market,
    HARD_MARKETS,
    HARD_TOPICS
  );

  console.log(enhancedMarket);
  return (
    <StandardPageWrapper className="h-full flex flex-col">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-60 relative">
            <img
              className="w-full transform rotate-180 object-cover h-60 relative"
              alt="CoverImage"
              src={enhancedMarket?.image}
            />
            <div
              className={`
                h-60 w-full
                bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent
                backdrop-blur-lg absolute bottom-0
              `}
            />
            <InverseBleedOverlay>
              <div className="flex absolute top-8">
                <img
                  className={` mt-10
                  size-28 md:size-32 lg:size-36 xl:size-40
                  ml-3  object-cover rounded-md
                   mb-4 border border-white/10 z-20
                `}
                  src={enhancedMarket?.image}
                />

                <div className="flex-grow">
                  <DesktopMarketHeader
                    {...enhancedMarket}
                    userImages={userImages}
                  />
                </div>
              </div>
            </InverseBleedOverlay>
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>
      <div className="w-full h-full overflow-y-auto flex flex-col">
        <div>
          <Grid gap={4} cols={{ xs: 8 }} className="px-2 pt-2">
            <Col xs={4} lg={5}>
              <DesktopChartCard {...enhancedMarket} userOwns={userOwns} />
              <div className="py-4">
                <CommentSection
                  topic_id={enhancedMarket?.topic_id}
                  users={users}
                  totalComments={enhancedMarket?.total_comments}
                  marketId={id}
                  isDesktop={true}
                />
              </div>
            </Col>
            <Col xs={4} lg={3}>
              <div className="xl:px-4 pb-1">
                <DesktopPredictComponent
                  id={id}
                  question={enhancedMarket?.question}
                  title={enhancedMarket?.title}
                  image={enhancedMarket?.image}
                  initialProb={enhancedMarket?.initialprob}
                  userOwns={userOwns}
                  options={[
                    {
                      name: enhancedMarket?.options[0].name,
                      value: enhancedMarket?.outcomeOddsA,
                    },
                    {
                      name: enhancedMarket?.options[1].name,
                      value: enhancedMarket?.outcomeOddsB,
                    },
                  ]}
                  topic={enhancedMarket?.topic_title}
                />
              </div>
              <div className="flex flex-col py-4">
                <BetDetails
                  endDate={"12th September, 2024"}
                  icon={enhancedMarket?.topic_image}
                  multiplier={2}
                  topicId={enhancedMarket?.topic_id}
                  members={enhancedMarket?.members}
                  handleBoost={() => {}}
                  joined={false}
                  question={enhancedMarket?.topic_description}
                  image={enhancedMarket?.image}
                  topic={enhancedMarket?.topic_title}
                  id={id}
                  isDesktop={true}
                />
                <RulesCollapsible />
              </div>
              <div className="mx-4 mt-2 rounded-lg">
                <RelatedMarkets
                  isDesktop={true}
                  topicId={enhancedMarket?.topic_id}
                  id={enhancedMarket?.id}
                />
              </div>
            </Col>
          </Grid>
          <Grid gap={4} cols={{ xs: 8 }}>
            <Col xs={5} className=" p-4 rounded-lg mt-1"></Col>
            <Col xs={3}></Col>
          </Grid>
        </div>
      </div>
    </StandardPageWrapper>
  );
}
