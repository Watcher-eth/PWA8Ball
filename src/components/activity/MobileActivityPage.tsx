// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Users, Globe } from "lucide-react";

import { useGetFollowingPredictions } from "@/supabase/queries/friends/useGetFollowingPredictions";
import { useUserStore } from "@/lib/stores/UserStore";
import { groupPredictionsByDate } from "@/utils/predictions/groupPredictionsByDate";
import { parseOptionJSON } from "@/utils/predictions/parseOption";

import { InviteFriendsPlaceholder } from "@/components/common/placeholders/InviteFriendsPlaceholder";
import { NotificationsModal } from "@/components/notifications/NotificationsModal";
import { AltSkeleton } from "@/components/ui/Skeleton";

import { FollowPredictionSkeleton } from "@/components/activity/FollowPredictionSkeleton";
import {
  ActivityField,
  ActivityFieldMobile,
} from "@/components/activity/ActivityField";
import { Leaderboard } from "@/components/activity/Leaderboard";
import { YourStats } from "@/components/activity/YourStats";
import { useGetFriendsPositions } from "@/graphql/queries/friends/useGetFriendsOrders";
import { aggregatePredictedItemsWithImage } from "@/utils/predictions/aggregatePredictions";
import { HARD_MARKETS } from "@/constants/markets";

export function MobileActivityPage({ isDesktop }: { isDesktop?: boolean }) {
  const [page, setPage] = useState<boolean>(false);
  const { user } = useUserStore();
  const {
    data: predictions,
    error,
    loading: isLoading,
    refetch,
  } = useGetFriendsPositions(user?.walletAddress);

  if (isLoading) {
    return (
      <div
        className={`
      no-scrollbar flex flex-col

      p-5 pt-[30px]
      ${isDesktop ? "w-full bg-[transparent]" : "w-full bg-[#080808]"}
    `}
      >
        <div
          className={`
        fixed w-screen h-[125px] bottom-0 rounded-t-lg
        z-2
      `}
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(8, 8, 8, 0.8))",
          }}
        />
        <div
          className={`
        flex flex-row w-full justify-between items-center
        mb-2.5 ${isDesktop ? "bg-[transparent]" : "bg-[#080808]"}
      `}
        >
          <motion.button
            className={`p-2 rounded-[20px] ${
              page ? "bg-[#FF0050]" : "bg-[#1C1C1E]"
            }`}
            onClick={() => setPage(!page)}
          >
            {page ? (
              <Globe color="white" strokeWidth={3} size={18} />
            ) : (
              <Users color="white" strokeWidth={3} size={18} />
            )}
          </motion.button>
          <h1 className="text-[20px] text-white font-bold">
            {page ? "Global" : "Your Friends"}
          </h1>
          <NotificationsModal isDesktop={isDesktop}>
            <motion.button className="p-1.5 rounded-[20px] bg-[#1C1C1E]">
              <Bell color="white" strokeWidth={3} size={20} />
            </motion.button>
          </NotificationsModal>
        </div>

        <div>
          <ActivitySkeleton />;
        </div>
      </div>
    );
  }

  const aggregatedPredictions = predictions
    ? aggregatePredictedItemsWithImage(predictions, HARD_MARKETS)
    : [];

  const groupedPredictions = groupPredictionsByDate(aggregatedPredictions);
  console.log("predictions", predictions, groupedPredictions);
  return (
    <div
      className={`
        no-scrollbar flex flex-col
min-h-screen
        p-5 pt-[30px]
        ${isDesktop ? "w-full bg-[transparent]" : "w-full bg-[#080808]"}
      `}
    >
      <div
        className={`
          fixed w-screen h-[125px] bottom-0 rounded-t-lg
          z-2
        `}
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(8, 8, 8, 0.8))",
        }}
      />
      <div
        className={`
          flex flex-row w-full justify-between items-center
          mb-2.5 ${isDesktop ? "bg-[transparent]" : "bg-[#080808]"}
        `}
      >
        <motion.button
          className={`p-2 rounded-[20px] ${
            page ? "bg-[#FF0050]" : "bg-[#1C1C1E]"
          }`}
          onClick={() => setPage(!page)}
        >
          {page ? (
            <Globe color="white" strokeWidth={3} size={18} />
          ) : (
            <Users color="white" strokeWidth={3} size={18} />
          )}
        </motion.button>
        <h1 className="text-[20px] text-white font-bold">
          {page ? "Global" : "Your Friends"}
        </h1>
        <NotificationsModal isDesktop={false}>
          <motion.button className="p-1.5 rounded-[20px] bg-[#1C1C1E]">
            <Bell color="white" strokeWidth={3} size={20} />
          </motion.button>
        </NotificationsModal>
      </div>

      <div>
        <div className="px-1">
          {page ? (
            <Leaderboard />
          ) : (
            <div>
              <YourStats />
              {predictions?.length > 0 ? (
                <div>
                  {Object.entries(groupedPredictions).map(
                    ([dateKey, predictions], index) => {
                      return (
                        <div key={dateKey}>
                          <h2
                            className={`
                          font-[700] text-[20px] text-white -mb-px
                          ${index === 0 ? "mt-4" : "mt-[22px]"}
                        `}
                          >
                            {dateKey}
                          </h2>
                          {predictions.map((item, idx) => {
                            return (
                              <ActivityFieldMobile
                                isDesktop={isDesktop}
                                key={idx}
                                index={idx}
                                option={{
                                  name:
                                    item?.option === 1
                                      ? item.market?.outcomeA
                                      : item.market?.outcomeB,
                                  index: item?.option,
                                  value:
                                    item?.option === 1
                                      ? item.market?.outcomeOddsA
                                      : item.market?.outcomeOddsB,
                                }}
                                question={item.market.question}
                                name={item.user.name}
                                pfp={item.user.pfp}
                                amount={item.tokensOwned}
                                title={item.market.title}
                                image={item.image}
                                id={item?.marketId}
                                odds={12}
                                userId={item?.user?.walletAddress}
                                initialProb={item.market.initialProb}
                                onOpenBottomSheet={() => {}}
                              />
                            );
                          })}
                        </div>
                      );
                    }
                  )}
                  <div className="h-[110px]" />
                </div>
              ) : (
                <InviteFriendsPlaceholder />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex flex-col items-center min-h-screen  w-full bg-[#080808] h-[333px] p-4">
      <div className="my-3 max-w-full">
        <AltSkeleton className="h-4.5 !bg-[#212121] " />
      </div>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <FollowPredictionSkeleton key={index} index={index} />
      ))}
      <div className="my-5 max-w-full">
        <AltSkeleton className="h-4.5  !bg-[#212121]" />
      </div>
    </div>
  );
}
