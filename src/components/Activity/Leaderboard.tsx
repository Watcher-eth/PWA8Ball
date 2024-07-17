// @ts-nocheck
import { motion } from "framer-motion";
import { useGetTopPredictors } from "@/supabase/queries/leaderboard/useGetTopPredictors";

import { AltSkeleton } from "@/components/ui/Skeleton";
import { PredictorInfo } from "./PredictorInfo";


export function Leaderboard() {
  const { data: topPredictors, isLoading } = useGetTopPredictors();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col mt-2"
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between my-1.5">
          <h2 className="text-white text-[15px] font-bold">Name</h2>
          <h2 className="text-white text-[15px] font-bold">At stake</h2>
        </div>
        {
          topPredictors?.map((predictor, index) => (
            <PredictorInfo key={index} {...predictor} index={index} />
          )) ?? (
            isLoading ? (
              <LoadingSkeleton />
            ) : (
              <p className="text-white">No predictors found</p>
            )
          )
        }
      </div>
    </motion.div>
  );
};



function LoadingSkeleton() {
  return ( [1, 2, 3, 4].map((index) => (
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
      <AltSkeleton className="h-3.5 w-6.25 bg-gray-900"/>
    </motion.div>
  )))
};


