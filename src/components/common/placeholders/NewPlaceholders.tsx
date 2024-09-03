// @ts-nocheck

import { motion } from "framer-motion";
import Link from "next/link";
import { HOME_PATH } from "@/utils/urls";
import { Skeleton, skeletonVariants } from "@/components/ui/Skeleton";
import { UserPredictionSkeleton as GeneralFeedSkeleton } from "@/components/profile/GeneralFeed/UserPredictionSkeleton";

import { AltSkeleton } from "@/components/ui/Skeleton";

export function NewPlaceholder({ isUser }) {
  return (
    <div className="flex flex-col items-center w-full px-5  mx-auto">
      {[...Array(3)].map((_, index) => (
        <GeneralFeedSkeleton index={index} />
      ))}
      <div
        className="w-full -mt-[105px]  h-[105px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.3) 50%,  #101010 100%)",
        }}
      />
      <div className="flex flex-col items-center mt-3">
        <div className="text-white text-lg font-bold mb-2">
          There's nothing here, yet
        </div>
        <div className="text-gray-400 text-sm text-center px-5">
          Start by making predictions for the future and they will show up here
        </div>
      </div>
      <Link href={HOME_PATH} className="w-[85%]">
        <button className="w-full mt-5 py-2 border-[0.1rem] border-[#202020] rounded-full bg-[#181818] text-white font-bold text-lg transition-all active:scale-95">
          {isUser ? "Make your first Prediction" : "Come back later"}
        </button>
      </Link>
    </div>
  );
}

export function NotificationsPlaceholder({ isUser }) {
  return (
    <div className="flex flex-col align-center items-center w-full p-2 mt-2  ">
      {[...Array(3)].map((_, index) => (
        <NotificationSkeleton index={index} />
      ))}

      <div className="flex flex-col items-center mt-5 self-center">
        <div className="text-white text-2xl font-bold mb-2">
          No notifications yet
        </div>
        <div className="text-[lightgray] text-sm text-center px-5">
          Start joining topics and follow other predictors to get notifications{" "}
        </div>
      </div>
      <Link href={HOME_PATH}>
        <motion.button className="w-[25vw] mt-5 py-3 rounded-full bg-[#090909] border-[0.1rem] border-[#171717] text-white font-bold text-lg transition-all active:scale-95">
          {isUser ? "Make your first Prediction" : "Come back later"}
        </motion.button>
      </Link>
    </div>
  );
}

export const UserPredictionSkeleton = ({ index }) => (
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
      <Skeleton className="h-[35px] w-1/2" />
      <Skeleton className="h-[25px] rounded-full w-[52%]" />
    </div>
  </motion.div>
);

export const UserLpSkeleton = ({ index }) => (
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
      <AltSkeleton className="h-[35px] w-1/2" />
      <AltSkeleton className="h-[25px] w-[22%]" />
    </div>
  </motion.div>
);

export const NewPlaceholderLp = ({ isUser }) => {
  return (
    <div className="flex flex-col items-center w-full p-2 mt-2 mx-auto">
      {[...Array(2)].map((_, index) => (
        <UserLpSkeleton key={index} index={index} />
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
      <Link href={HOME_PATH} className="w-full">
        <motion.button className="w-full mt-5 py-3 rounded-full bg-[#212121] text-white font-bold text-lg transition-all active:scale-95">
          {isUser ? "Boost a market" : "Boost a market"}
        </motion.button>
      </Link>
    </div>
  );
};

const CommentSkeleton = ({ index }) => (
  <motion.div
    className="flex flex-col p-4 bg-[#101010] py-6 rounded-[20px]  my-2"
    style={{ width: "99%", margin: "8px auto" }}
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
      <AltSkeleton className="h-[14px] w-[78vw] sm:w-[78%] !bg-[#212121]" />
      <AltSkeleton className="h-[14px] w-[75vw] sm:w-[75%] !bg-[#212121]" />
      <AltSkeleton className="h-[14px] w-[65vw] sm:w-[65%] !bg-[#212121]" />
    </div>
  </motion.div>
);

export const NewPlaceholderComment = ({ isUser, isPost, onOpen }) => (
  <div className="flex flex-col items-center w-full  mt-3 px-0 mb-32">
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

export const NotificationSkeleton = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex mx-6 items-center self-center w-full px-4 justify-between p-2 rounded-lg bg-[#080808]/[0.9] mb-2 "
  >
    <div className="flex items-center gap-2">
      <motion.div
        className="w-14 h-14 bg-[#212121] rounded-xl"
        variants={skeletonVariants}
        initial="initial"
        animate="pulse"
      />
      <div className="flex flex-col gap-2">
        <motion.div
          className="w-[15vw] h-[20px] bg-[#212121] rounded-xl"
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <motion.div
          className="w-[12vw] h-[17px] bg-[#212121] rounded-xl"
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
      </div>
    </div>
    <motion.div
      className="w-[18%] h-[35px] bg-[#252525] rounded-xl"
      variants={skeletonVariants}
      initial="initial"
      animate="pulse"
    />
  </motion.div>
);
