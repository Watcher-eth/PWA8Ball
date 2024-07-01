// @ts-nocheck

import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Bell, Users, Globe } from "lucide-react";
import ActivityField from "./ActivityField";
import Leaderboard from "./Leaderboard";
import YourStats from "./YourStats";
import { useGetFollowingPredictions } from "@/lib/supabase/queries/friends/fetchFollowingPredictionts";
import { useUserStore } from "@/lib/stores/UserStore";
import { groupPredictionsByDate } from "@/utils/groupPredictionsByDate";
import InviteFriendsPlaceholder from "../Common/Placeholders/InviteFriendsPlaceholder";
import FollowPredictionSkeleton, {
  skeletonVariants,
} from "./ActivitySkelleton";
import NotificationsModal from "../Modals/NotificationsModal";

interface Prediction {
  // Define the structure of a prediction here
}

const ActivityPage: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUserStore();
  const {
    data: predictions,
    error,
    isLoading,
    refetch,
  } = useGetFollowingPredictions(user?.external_auth_provider_user_id);

  if (isLoading || predictions === undefined) {
    return (
      <motion.div
        className="flex flex-col items-center"
        style={{ height: (500 / 3) * 2, padding: "15px", maxWidth: "99%" }}
      >
        <div className="my-3">
          <motion.div
            className="h-4.5 w-[40%] bg-[#212121] rounded-xl"
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
        </div>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <FollowPredictionSkeleton key={index} index={index} />
        ))}
        <div className="my-5">
          <motion.div
            className="h-4.5 w-[40%] bg-[#212121] rounded-xl"
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
        </div>
      </motion.div>
    );
  }

  const groupedPredictions = groupPredictionsByDate(predictions);

  return (
    <div
      className="no-scrollbar"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        paddingTop: "30px",
        backgroundColor: "#101010",
        position: "relative",
      }}
    >
      <motion.div
        className="fixed  w-[100vw] h-[125px] bottom-0 rounded-t-lg "
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, transparent, rgba(13, 13, 13, 0.8))",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          backgroundColor: "#101010",
        }}
      >
        <motion.button
          style={{
            padding: "7px",
            borderRadius: "20px",
            backgroundColor: !page ? "#1C1C1E" : "#FF0050",
          }}
          onClick={() => setPage(!page)}
        >
          {!page ? (
            <Users color="white" strokeWidth={3} size={18} />
          ) : (
            <Globe color="white" strokeWidth={3} size={18} />
          )}
        </motion.button>
        <h1
          style={{
            fontSize: "20px",
            color: "white",
            fontWeight: "700",
          }}
        >
          {page ? "Global" : "Your Friends"}
        </h1>
        <NotificationsModal>
          <motion.button
            style={{
              padding: "6px",
              borderRadius: "20px",
              backgroundColor: "#1C1C1E",
            }}
          >
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
                        style={{
                          fontWeight: "800",
                          color: "white",
                          fontSize: "20px",
                          marginBottom: "1px",
                          marginTop: index === 0 ? "15px" : "22px",
                        }}
                      >
                        {dateKey}
                      </h2>
                      {groupedPredictions[dateKey].map((item, idx) => (
                        <ActivityField
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
                  <div style={{ height: "110px" }} />
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
};

export default ActivityPage;
