// @ts-nocheck

import React, { useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, LineChart, Share } from "lucide-react";
import { useGetMarketById } from "@/lib/drizzle/drizzle/supabase/queries/fetchMarketForId";
import { useGetUsersByMarketId } from "@/lib/drizzle/drizzle/supabase/queries/markets/getUsersForMarket";
import { useUserStore } from "@/lib/stores/UserStore";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import VoteSideBet from "@/components/Bet/Vote/SideBet";
import CommentSection from "@/components/post/Comments/CommentSection";
import BetDetails from "@/components/Bet/BetDetails";
import BetButtons from "@/components/Bet/BetButtons";
import VotersOverviewSheet from "@/components/common/Modal/VotersOverviewSheet";
import BoostLiquidity from "@/components/Bet/Actions/BoostLiquidityModal";
import CommentBottomSheet from "@/components/post/Comments/CommentBottomSheet";
import ChartModalSheet from "@/components/common/Modal/ChartModal";
import RelatedMarkets from "@/components/common/FunctionalScreens/RelatedMarkets";


const Bet = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const commentModalRef = useRef(null);
  const votersModalRef = useRef(null);
  const chartModalRef = useRef(null);
  const BoostRef = useRef(null);

  const { data: market, refetch } = useGetMarketById(
    id,
    user.external_auth_provider_user_id
  );
  const { data: users } = useGetUsersByMarketId(id);
  const stake = market?.usdcstake;

  const handleOpenBottomSheet = useCallback((props) => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleOpenCommentSheet = useCallback(() => {
    commentModalRef.current?.present();
  }, []);

  const handleOpenVotersSheet = useCallback(() => {
    votersModalRef.current?.present();
  }, []);

  const handleBoosterSheet = useCallback(() => {
    BoostRef.current?.present();
  }, []);

  const handleChartSheet = useCallback(() => {
    chartModalRef.current?.present();
  }, []);

  const addComment = useCallback((newComment) => {
    setComments((currentComments) => [newComment, ...currentComments]);
  }, []);

  const defaultImages = [
    "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/F5RcCF7a0AALiMO?format=jpg&name=4096x4096",
  ];

  const userImages = users
    ? users
        .map((user, index) => (index < 3 ? user.pfp : null))
        .filter((image) => image !== null)
    : defaultImages;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <BottomSheetModalProvider>
        <div className="absolute top-10 left-0 right-0 z-10 flex justify-between items-center p-4 bg-opacity-50 bg-gray-800">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 rounded-full p-2"
          >
            <ChevronLeft className="text-white" size={21} />
          </button>
          <div className="text-center">
            <h1 className="text-white text-lg font-bold">{market?.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleChartSheet}
              className="bg-gray-700 rounded-full p-2"
            >
              <LineChart className="text-white" size={16} />
            </button>
            <button
              onClick={() =>
                navigate(
                  `/shareBetModal?topic=${market?.topic_title}&question=${market?.question}&image=${market?.image}&options=${market?.options[1].name},${market?.options[0].name}&title=${market?.title}`
                )
              }
              className="bg-gray-700 rounded-full p-2"
            >
              <Share className="text-white" size={16} />
            </button>
          </div>
        </div>

        <CommentBottomSheet
          addComment={addComment}
          id={id}
          ref={commentModalRef}
          reply={reply}
        />

        <div className="flex-1 overflow-auto">
          {market?.image && (
            <img
              src={market.image}
              alt="Market"
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-4">
            <h1 className="text-3xl font-bold text-white">{market?.title}</h1>
            <div className="flex justify-between items-center my-4">
              <div>
                <span className="text-gray-400">At stake</span>
                <div className="text-white text-xl font-bold">
                  ${stake ? (stake / 100000).toFixed(2) : "0.00"}
                </div>
              </div>
              <AvatarGroup
                images={userImages}
                height={39}
                width={39}
                onClick={handleOpenVotersSheet}
              />
            </div>
            <p className="text-lg text-gray-400">{market?.question}</p>
          </div>

          <BetButtons
            question={description}
            title={name}
            totalPot={19325}
            betId="123"
            onChange={handleOpenBottomSheet}
            image={market?.image}
            optionA={{
              name: market?.options[1].name,
              value: market?.outcomeb,
              index: 1,
            }}
            optionB={{
              name: market?.options[0].name,
              value: market?.outcomea,
              index: 2,
            }}
          />

          <BetDetails
            topicId={market?.topicid}
            icon={market?.topic_image}
            topic={market?.topic_title}
            question={market?.topic_description}
            endDate="12th September, 2024"
            multiplier={2}
            members={market?.members}
            handleBoost={handleBoosterSheet}
            joined={market?.joined}
          />

          <HighestOrderOptionComponent
            userAddress={user?.walletaddress}
            marketId={id}
            options={market?.options}
          />

          <CommentSection
            topic_id={market?.topicid}
            users={users}
            totalComments={market?.total_comments}
            optimisticComments={comments}
            marketId={id}
            setReply={setReply}
            handleComment={handleOpenCommentSheet}
          />

          <RelatedMarkets topicId={market?.topicid} id={market?.id} />
        </div>

        <BottomSheetModal ref={votersModalRef}>
          <VotersOverviewSheet
            title={market?.title}
            question={market?.question}
            image={market?.image}
            options={[market?.options[1].name, market?.options[0].name]}
            odds={market?.outcomea}
            marketId={id}
            users={users}
            setIsOpen={setIsVotersModal}
          />
        </BottomSheetModal>

        <BottomSheetModal ref={bottomSheetModalRef}>
          <VoteSideBet
            refetch={refetch}
            setIsOpen={setIsOpen}
            image={market?.image}
            betId={id}
            index={2}
            odds={market?.outcomea}
            title={market?.title}
            question={market?.question}
            totalPot={19325}
            options={[
              {
                name: market?.options[1].name,
                value: (
                  1 +
                  (100 - market?.outcomeb) / market?.outcomeb
                ).toFixed(2),
                index: 1,
              },
              {
                name: market?.options[0].name,
                value: (
                  1 +
                  (100 - market?.outcomea) / market?.outcomea
                ).toFixed(2),
                index: 2,
              },
            ]}
          />
        </BottomSheetModal>

        <BottomSheetModal ref={chartModalRef}>
          <ChartModalSheet
            title={market?.title}
            image={market?.image}
            options={["Yes", "No"]}
            percentage={-15}
            topic={market?.topicid}
            betId={id}
            question={market?.question}
            setIsOpen={setIsOpen}
          />
        </BottomSheetModal>

        <BottomSheetModal ref={BoostRef}>
          <BoostLiquidity
            setIsOpen={setIsBooster}
            title="2024 US Elections"
            question="Who will win the 2024 US federal Elections?"
            image={market?.image}
            betId={id}
            options={[market?.options[1].name, market?.options[0].name]}
            odds={0.34}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </div>
  );
};

export default Bet;
