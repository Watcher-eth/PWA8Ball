// @ts-nocheck
import { motion } from "framer-motion"

import { Skeleton } from "@/components/ui/Skeleton"
import { PredictorInfo } from "./PredictorInfo"
import { useGetGlobalLeaderboard } from "@/graphql/leaderboard/useGetGlobalLeaderboard"
import { LeaderBoardTop3 } from "./Leaderboard/LeaderboardTop3"
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"

export function Leaderboard({ isDesktop }: { isDesktop: boolean }) {
  const { data, isLoading } = useGetGlobalLeaderboard()
  if (isLoading) {
    return <LoadingLeaderboardSkeleton />
  }

  if (data) {
    const top3Users = data?.slice(0, 3).map((predictor) => ({
      name: predictor.name?.length > 0 ? predictor?.name : "Anon",
      image:
        predictor.pfp?.length > 0 ? predictor.pfp : DEFAULT_PFP_PLACEHOLDER,
      score: predictor.totalAmountUsdc / 1000000,
      walletAddress: predictor?.walletAddress,
    }))

    const remainingPredictors = data?.slice(3)
    console.log("remaning", remainingPredictors.length)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex h-screen flex-col mt-2"
      >
        {isDesktop && (
          <div className="text-[1.8rem] text-white font-semibold">
            Global Leaderboard
          </div>
        )}
        <LeaderBoardTop3 users={top3Users} />
        <div className="flex flex-col ">
          <div className="flex flex-row items-center justify-between my-1.5">
            <h2 className="text-white text-[15px] font-bold">Name</h2>
            <h2 className="text-white text-[15px] font-bold">At stake</h2>
          </div>
          {remainingPredictors.length > 0 ? (
            remainingPredictors?.map((predictor, index) => (
              <PredictorInfo
                key={index}
                {...predictor}
                address={predictor?.walletAddress}
                index={index}
              />
            ))
          ) : remainingPredictors ? (
            <LoadingLeaderboardSkeleton />
          ) : (
            <p className="text-white">No predictors found</p>
          )}
        </div>
      </motion.div>
    )
  }
}

export function LoadingLeaderboardSkeleton() {
  return [1, 2, 3, 4].map((index) => (
    <motion.div
      key={index}
      className="flex flex-row items-center justify-between my-3"
    >
      <div className="flex flex-row items-center">
        <span className="text-white font-bold">{index + 3}</span>
        <div className="mx-3 ml-2.5">
          <Skeleton className="h-7 w-7 !rounded-full " />
        </div>
        <Skeleton className="h-4 w-40 " />
      </div>
      <Skeleton className="h-5 w-14 " />
    </motion.div>
  ))
}
