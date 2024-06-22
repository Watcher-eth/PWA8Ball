import React from "react";
import { motion } from "framer-motion";

export const skeletonVariants = {
  initial: { opacity: 1 },
  pulse: {
    opacity: 0.4,
    transition: {
      duration: 0.8,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

interface FollowPredictionSkeletonProps {
  index: number;
}

const FollowPredictionSkeleton: React.FC<FollowPredictionSkeletonProps> = ({
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
    className="flex flex-row w-full items-center justify-between p-2 bg-[#101010] rounded-[15px] my-2"
  >
    <motion.div
      className="flex flex-row items-center gap-3"
      initial="initial"
      animate="pulse"
    >
      <motion.div
        className="h-12 w-12 rounded-full bg-[#212121]"
        variants={skeletonVariants}
        initial="initial"
        animate="pulse"
      />
      <div className="flex flex-col gap-2">
        <motion.div
          className="h-3 w-[30vw] bg-[#212121] rounded-xl"
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <motion.div
          className="h-3.5 w-[50vw] bg-[#212121] rounded-xl"
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
      </div>
    </motion.div>
    <motion.div
      className="ml-[-50px]"
      variants={skeletonVariants}
      initial="initial"
      animate="pulse"
    >
      <motion.div
        className="h-8 w-[15vw] bg-[#212121] rounded-full"
        variants={skeletonVariants}
        initial="initial"
        animate="pulse"
      />
    </motion.div>
  </motion.div>
);

export default FollowPredictionSkeleton;
