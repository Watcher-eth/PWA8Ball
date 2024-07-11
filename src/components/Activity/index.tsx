// @ts-nocheck
import { useState } from "react";

import { motion } from "framer-motion";
import { Bell, Users, Globe } from "lucide-react";
import { ActivityField } from "./ActivityField";
import { Leaderboard } from "./Leaderboard";
import { YourStats } from "./YourStats";
import { useGetFollowingPredictions } from "@/supabase/queries/friends/useGetFollowingPredictions";
import { useUserStore } from "@/lib/stores/UserStore";
import { groupPredictionsByDate } from "@/utils/predictions/groupPredictionsByDate";
import { InviteFriendsPlaceholder } from "../Common/Placeholders/InviteFriendsPlaceholder";
import { FollowPredictionSkeleton } from "./FollowPredictionSkeleton";
import { NotificationsModal } from "../Modals/NotificationsModal";
import { AltSkeleton } from "@/components/ui/Skeleton";

export function ActivityPage(props: { isDesktop?: boolean }) {
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
        ${props.isDesktop ? "w-[41vw]" : "w-full"} min-h-[100vh]
        p-[20px] pt-[30px]
        ${props.isDesktop ? "bg-[transparent]" : "bg-[#101010]"} relative
      `}
    >
      <div
        className={`
          fixed  w-[100vw] h-[125px] bottom-0 rounded-t-lg
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
          mb-2.5 ${props?.isDesktop ? "bg-[transparent]" : "bg-[#101010]"}
        `}
      >
        <motion.button
          style={{
            padding: "7px",
            borderRadius: "20px",
            backgroundColor: page ? "#FF0050" : "#1C1C1E",
          }}
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
        <NotificationsModal isDesktop={props?.isDesktop}>
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
                  {Object.keys(groupedPredictions).map((dateKey, index) => (
                    <div key={dateKey}>
                      <h2
                        className={`
                          font-extrabold text-[20px] text-white mb-[1px]
                          ${index === 0 ? "mt-[15px]" : "mt-[22px]"}
                        `}
                      >
                        {dateKey}
                      </h2>
                      {groupedPredictions[dateKey].map((item, idx) => (
                        <ActivityField
                          isDesktop={props?.isDesktop}
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
                  ))}
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
