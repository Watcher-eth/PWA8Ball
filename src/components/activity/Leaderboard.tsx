// @ts-nocheck
import { motion } from "framer-motion";
import { useGetTopPredictors } from "@/supabase/queries/leaderboard/useGetTopPredictors";

import { AltSkeleton } from "@/components/ui/Skeleton";
import { PredictorInfo } from "./PredictorInfo";
import { useGetGlobalLeaderboard } from "@/graphql/leaderboard/useGetGlobalLeaderboard";
import LeaderBoardTop3 from "./Leaderboard/LeaderboardTop3";

export function Leaderboard(props: { isDesktop: boolean }) {
  const { data: topPredictors, isLoading } = useGetTopPredictors();
  const data = useGetGlobalLeaderboard();
  const top3Users = topPredictors.slice(0, 3).map((predictor) => ({
    name: predictor.name?.length > 0 ? predictor?.name : "Anon",
    image: predictor.pfp?.length > 0 ? predictor.pfp : defaultAvatar,
    score: predictor.total_amount / 1000000,
  }));

  const remainingPredictors = topPredictors.slice(3);

  console.log("new data2", data);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen flex-col mt-2"
    >
      {props.isDesktop && (
        <div className="text-[1.8rem] text-white font-[600]">
          Global Leaderboard
        </div>
      )}
      <LeaderBoardTop3 users={top3Users} />
      <div className="flex flex-col ">
        <div className="flex flex-row items-center justify-between my-1.5">
          <h2 className="text-white text-[15px] font-bold">Name</h2>
          <h2 className="text-white text-[15px] font-bold">At stake</h2>
        </div>
        {data?.map((predictor, index) => (
          <PredictorInfo key={index} {...predictor} index={index} />
        )) ??
          (!data ? (
            <LoadingSkeleton />
          ) : (
            <p className="text-white">No predictors found</p>
          ))}
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return [1, 2, 3, 4].map((index) => (
    <motion.div
      key={index}
      className="flex flex-row items-center justify-between my-1.25"
    >
      <div className="flex flex-row items-center">
        <span className="text-white font-bold">{index + 1}</span>
        <div className="mx-3 ml-2.5">
          <AltSkeleton className="h-7.5 w-7.5 !rounded-full !bg-gray-900" />
        </div>
        <AltSkeleton className="h-4.25 w-10 !bg-gray-900" />
      </div>
      <AltSkeleton className="h-3.5 w-6.25 bg-gray-900" />
    </motion.div>
  ));
}
