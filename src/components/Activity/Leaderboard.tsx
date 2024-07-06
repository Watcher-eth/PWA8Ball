// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useGetTopPredictors } from "@/lib/supabase/queries/leaderboard/useGetTopPredictors";
import Link from "next/link";
import { AltSkeleton } from "@/components/ui/Skeleton_";

export const Leaderboard: React.FC = () => {
  const { data: topPredictors, error, isLoading } = useGetTopPredictors();
  const router = useRouter();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p style={{ color: "white" }}>An error occurred: {error.message}</p>;
  }

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
        {topPredictors?.map((predictor, index) => (
          <Link href={`/profile/${predictor.user_id}`}>
            <motion.button
              key={index}
              className="flex flex-row items-center justify-between my-1.5"
            >
              <div className="flex flex-row items-center">
                <p className="text-white font-bold">{index + 1}</p>
                <img
                  src={predictor.pfp}
                  alt="Profile"
                  className="size-[30px] rounded-full object-cover ml-2.5 mr-3"
                />
                <p
                  className="text-white text-[17px] font-semibold"
                >
                  {predictor.name}
                </p>
              </div>
              <p
                className="text-[lightgray] text-[15px] font-medium"
              >
                ${(predictor.total_amount / 1000000).toFixed(2)}
              </p>
            </motion.button>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};




const LoadingSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col mt-2.5"
  >
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between my-1.5">
        <span className="text-white font-bold text-sm">Name</span>
        <span className="text-white font-bold text-sm">At stake</span>
      </div>
      {[1, 2, 3, 4].map((index) => (
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
      ))}
    </div>
  </motion.div>
);
