import React from "react";
import { motion } from "framer-motion";
import { AltSkeleton } from "@/components/ui/Skeleton";

interface FollowPredictionSkeletonProps {
  index: number;
}

export const FollowPredictionSkeleton: React.FC<FollowPredictionSkeletonProps> = ({
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
    className="flex flex-row w-full items-center justify-between p-2 bg-[#171717] rounded-[15px] my-2"
  >
    <motion.div
      className="flex flex-row items-center gap-3"
      initial="initial"
      animate="pulse"
    >
      <AltSkeleton className="size-12 !rounded-full !bg-[#212121]" />
      <div className="flex flex-col gap-2">
        <AltSkeleton className="h-3 w-[30vw] !bg-[#212121]" />
        <AltSkeleton className="h-3.5 w-[50vw] !bg-[#212121]" />
      </div>
    </motion.div>
    <AltSkeleton
      className="-ml-12 !bg-transparent"
    >
      <AltSkeleton
        className="h-8 w-[15vw] !bg-[#212121] !rounded-full"
      />
    </AltSkeleton>
  </motion.div>
);

