// @ts-nocheck

import React from "react";
import { Skeleton } from "@/components/ui/Skeleton_";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { UserPredictionSkeleton } from "@/components/profile/UserPredictions";
import Link from "next/link";
import { HOME_PATH } from "@/utils/urls";
import { AltSkeleton } from "@/components/ui/Skeleton_";

export function NewPlaceholder({ isUser }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-[94%] p-2 mt-2 mx-auto">
      {[...Array(3)].map((_, index) => (
        <UserPredictionSkeleton index={index} />
      ))}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.7) 70%, #101010 100%)",
          height: "225px",
          width: "100%",
          marginTop: "-230px",
        }}
      />
      <div className="flex flex-col items-center mt-10">
        <div className="text-white text-lg font-bold mb-2">
          There's nothing here, yet
        </div>
        <div className="text-gray-400 text-sm text-center px-5">
          Start by making predictions for the future and they will show up here
        </div>
      </div>
      <Link href={HOME_PATH}>
        <motion.button
          className="w-[85%] mt-5 py-3 rounded-full bg-[#212121] text-white font-bold text-lg transition-all active:scale-95"
        >
          {isUser ? "Make your first Prediction" : "Come back later"}
        </motion.button>
      </Link>
    </div>
  );
};

export const UserPredictionSkelleton = ({ index }) => (
  <motion.div
    className="flex flex-col p-4 bg-[#1B1B1E] rounded-lg my-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
  >
    <div className="flex flex-row items-center justify-between mb-2">
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="h-[55px] w-[55px] rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[19px] w-[70%]" />
          <Skeleton className="h-[14px] w-[55%]" />
        </div>
      </div>
    </div>
    <div className="flex flex-row items-center justify-between mt-2">
      <Skeleton className="h-[35px] w-[50%]" />
      <Skeleton className="h-[25px] rounded-full w-[52%]" />
    </div>
  </motion.div>
);

export const UserLpSkelleton = ({ index }) => (
  <motion.div
    className="flex flex-col p-4 bg-[#171717] w-[90vw] rounded-2xl my-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
  >
    <div className="flex flex-row items-center justify-between mb-2">
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <AltSkeleton className="h-[19px] w-[70%]" />
          <AltSkeleton className="h-[14px] w-[55%]" />
        </div>
        <AltSkeleton className="h-[50px] w-[55px]" />
      </div>
    </div>
    <div className="flex flex-row items-center justify-between mt-2">
      <AltSkeleton className="h-[35px] w-[50%]" />
      <AltSkeleton className="h-[25px] w-[22%]" />
    </div>
  </motion.div>
);

export const NewPlaceholderLp = ({ isUser }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full p-2 mt-2 mx-auto">
      {[...Array(2)].map((_, index) => (
        <UserLpSkelleton key={index} index={index} />
      ))}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.5) 50%, rgba(10, 10, 10, 0.7) 70%, #101010 100%)",
          height: "265px",
          width: "100vw",
          marginTop: "-270px",
        }}
      />
      <div className="flex flex-col items-center mt-10">
        <div className="text-white text-lg font-bold mb-2">
          No market boosted, yet
        </div>
        <div className="text-gray-400 text-sm text-center px-5">
          Boost a prediction to earn fees and points for making the market more
          efficient
        </div>
      </div>
      <Link href={HOME_PATH}>
        <motion.button
          className="w-[85%] mt-5 py-3 rounded-full bg-[#212121] text-white font-bold text-lg transition-all active:scale-95"
        >
          {isUser ? "Boost a market" : "Boost a market"}
        </motion.button>
      </Link>
    </div>
  );
};


const CommentSkeleton = ({ index }) => (
  <motion.div
    className="flex flex-col p-4 bg-[#101010] py-6 rounded-[15px] my-2"
    style={{ width: "92%", margin: "8px auto" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
  >
    <div className="flex flex-row items-center justify-between mb-2 w-full">
      <div className="flex flex-row justify-between items-center gap-3 w-full">
        <div className="flex flex-row items-center gap-2">
          <AltSkeleton className="h-[32px] w-[32px] !bg-[#212121] !rounded-full" />
          <AltSkeleton className="h-[18px] w-[95px] !bg-[#212121]" />
        </div>
        <AltSkeleton className="h-[17px] w-[55px] !bg-[#212121]" />
      </div>
    </div>
    <div className="flex flex-col gap-3 w-full mt-1">
      <AltSkeleton className="h-[14px] w-[78vw] !bg-[#212121]" />
      <AltSkeleton className="h-[14px] w-[75vw] !bg-[#212121]" />
      <AltSkeleton className="h-[14px] w-[65vw] !bg-[#212121]" />
    </div>
  </motion.div>
);

export const NewPlaceholderComment = ({ isUser, isPost, onOpen }) => (
  <div className="flex flex-col items-center w-full p-2 mt-2 mx-auto mb-32">
    <div className="text-white text-2xl self-start font-bold mb-2 ml-4">
      0 Comments
    </div>
    {[...Array(1)].map((_, index) => (
      <CommentSkeleton key={index} index={index} />
    ))}
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(7, 7, 7, 0) 0%, rgba(7, 7, 7, 0.95) 95%, #070707 100%)",
        height: "240px",
        width: "100%",
        marginTop: "-240px",
      }}
    />
    <div className="flex flex-col items-center mt-[-0.5rem]">
      <div className="text-white text-xl font-bold mb-1">No comments, yet</div>
      <div className="text-[lightgray] text-sm text-center px-5">
        Be the first to comment on this {isPost ? "post" : "prediction"} and the
        reply guys will follow
      </div>
    </div>
    <motion.button
      onClick={onOpen}
      className="w-[85%] mt-5 py-3 rounded-full bg-[#171717] text-white font-bold text-md"
      whileTap={{ scale: 0.95 }}
    >
      {isUser ? "Join the discussion" : "Join the discussion"}
    </motion.button>
  </div>
);
