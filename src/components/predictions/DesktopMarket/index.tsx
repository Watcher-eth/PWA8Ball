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

import { DesktopBettersModal } from "../Betters/DesktopBettersModal";

import { enhanceSingleMarketWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { useCheckReferral } from "@/hooks/useCheckReferral";
import { DesktopMarketHeader } from "./DesktopMarketHeader";
import { DesktopChartCard } from "./DesktopChartCard";
import { MarketMetadata } from "../BetDetails/MarketMetadata";
import { shortenAddress } from "@/utils/address/shortenAddress";
import { StatusBlock } from "../BetDetails/MarketStatus";
import { useGetUserById } from "@/graphql/queries/users/useUserById";
import { useGetUserPositionsForMarket } from "@/graphql/queries/positions/useGetUserPositionsForMarket";
import { aggregatePredictedItemsWithImage } from "@/utils/predictions/aggregatePredictions";

export function DesktopMarketPage({ users, market, id }) {
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  useCheckReferral();
  const userImages = fillUserImages(users, 3);
  const enhancedMarket = enhanceSingleMarketWithImageAndPolyId(
    market,
    HARD_MARKETS,
    HARD_TOPICS
  );

  const { user: creator, loading } = useGetUserById(market?.userAddress);
  const { data: userPositions } = useGetUserPositionsForMarket(
    user?.walletAddress,
    id
  );
  const userOwns = userPositions?.filter((item) => item.tokensOwned > 0) || [];

  const aggregatedPositions = aggregatePredictedItemsWithImage(
    userOwns ?? [],
    HARD_MARKETS
  );

  return (
    <StandardPageWrapper className="h-full w-full flex flex-col">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-[8rem] relative">
            <img
              className="w-full transform rotate-180 object-cover h-[8rem] relative"
              alt="CoverImage"
              src={enhancedMarket?.image}
            />
            <div
              className={`
               h-[8rem] w-full
                bg-gradient-to-t from-[#080808] via-[#080808]/65  to-[#080808]/45
                backdrop-blur-xl absolute bottom-0
              `}
            />
            {/* <InverseBleedOverlay>
              <div className="flex absolute top-14">
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
            </InverseBleedOverlay> */}
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>
      <div className="w-full h-full mt-1.5 overflow-y-auto z-[30] lg:mx-0 2xl:px-20 flex flex-col">
        <div>
          <Grid
            gap={4}
            cols={{ xs: 8, sm: 2, md: 2, lg: 8 }}
            className="px-2 pt-4"
          >
            <Col xs={4} sm={4} md={4} lg={5}>
              <DesktopChartCard {...enhancedMarket} userOwns={userOwns} />

              <div className="py-4">
                <div className="flex p-3 rounded-md items-center justify-center border-dashed border-[0.1rem] border-[#303030] -mt-3 mb-5 text-align-center text-white text-lg font-medium">
                  {enhancedMarket?.question}
                </div>
                <CommentSection
                  options={[
                    {
                      name: enhancedMarket?.outcomeA,
                      value: enhancedMarket?.outcomeOddsA,
                    },
                    {
                      name: enhancedMarket?.outcomeA,
                      value: enhancedMarket?.outcomeOddsA,
                    },
                  ]}
                  topic_id={enhancedMarket?.topic_id}
                  users={users}
                  totalComments={enhancedMarket?.total_comments}
                  marketId={id}
                  isDesktop={true}
                />
              </div>
            </Col>
            <Col xs={4} lg={3}>
              <div className="xl:px-4 border-none  pb-1">
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
                <MarketMetadata
                  creatorAddress={shortenAddress(market?.userAddress)}
                  creatorLoading={loading}
                  creator={creator}
                  usdcStake={market?.usdcStake}
                  liquidityStake={enhancedMarket?.liquidityBalanceUsdc}
                  length={users?.length}
                  users={userImages}
                />
                <BetDetails
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
              <div className="mx-4 -mt-2 rounded-lg">
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
