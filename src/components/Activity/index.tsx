// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Users, Globe } from "lucide-react";

import { useGetFollowingPredictions } from "@/supabase/queries/friends/useGetFollowingPredictions";
import { useUserStore } from "@/lib/stores/UserStore";
import { groupPredictionsByDate } from "@/utils/predictions/groupPredictionsByDate";

import { InviteFriendsPlaceholder } from "@/components/common/Placeholders/InviteFriendsPlaceholder";
import { NotificationsModal } from "@/components/Modals/NotificationsModal";
import { AltSkeleton } from "@/components/ui/Skeleton";

import { FollowPredictionSkeleton } from "./FollowPredictionSkeleton";
import { ActivityField } from "./ActivityField";
import { Leaderboard } from "./Leaderboard";
import { YourStats } from "./YourStats";

export function ActivityPage({ isDesktop }: { isDesktop?: boolean }) {
  const [page, setPage] = useState<boolean>(false);
  const { user } = useUserStore();
  const {
    data: predictions,
    error,
    isLoading,
    refetch,
  } = useGetFollowingPredictions(user?.external_auth_provider_user_id);

  if (isLoading || predictions === undefined) {
    return <ActivitySkeleton />;
  }

  const groupedPredictions = groupPredictionsByDate(predictions);

  return (
    <div
      className={`
        no-scrollbar flex flex-col
        p-5 pt-[30px]
        ${isDesktop ? "w-[41vw] bg-[transparent]" : "w-full bg-[#101010]"}
      `}
    >
      <div
        className={`
          fixed w-screen h-[125px] bottom-0 rounded-t-lg
          z-[2]
        `}
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(13, 13, 13, 0.8))",
        }}
      />
      <div
        className={`
          flex flex-row w-full justify-between items-center
          mb-2.5 ${isDesktop ? "bg-[transparent]" : "bg-[#101010]"}
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
        <div>
          {page ? (
            <Leaderboard />
          ) : (
            <div>
              <YourStats />
              {predictions?.length > 0 ? (
                <div>
                  {Object.entries(groupedPredictions).map(
                    ([dateKey, predictions], index) => (
                      <div key={dateKey}>
                        <h2
                          className={`
                          font-extrabold text-[20px] text-white -mb-px
                          ${index === 0 ? "mt-4" : "mt-[22px]"}
                        `}
                        >
                          {dateKey}
                        </h2>
                        {predictions.map((item, idx) => (
                          <ActivityField
                            isDesktop={isDesktop}
                            key={idx}
                            index={idx}
                            question={item.markets.question}
                            name={item.users.name}
                            pfp={item.users.pfp}
                            amount={item.amount / 10 ** 5}
                            title={item.markets.question}
                            image={item.markets.image}
                            option={item.option}
                            onOpenBottomSheet={() => {}}
                          />
                        ))}
                      </div>
                    )
                  )}
                  <div className="h-[110px]" />
                </div>
              ) : (
                <InviteFriendsPlaceholder isDesktop={isDesktop} />
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
    <div className="flex flex-col items-center w-[99%] h-[333px] p-4">
      <div className="my-3">
        <AltSkeleton className="h-4.5 w-[40%] !bg-[#212121] " />
      </div>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <FollowPredictionSkeleton key={index} index={index} />
      ))}
      <div className="my-5">
        <AltSkeleton className="h-4.5 w-[40%] !bg-[#212121]" />
      </div>
    </div>
  );
}
