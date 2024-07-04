// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLeaderboardForTopic } from "@/lib/supabase/queries/leaderboard/fetchLeaderBoardForTopic";

const Leaderboard = ({ topicId }) => {
  const router = useRouter();

  const {
    data: topPredictors,
    error,
    isLoading,
  } = useGetLeaderboardForTopic(topicId);

  if (isLoading) {
    return (
      <div className="flex flex-col mt-[7px]">
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-between my-3">
            <span
              className="text-white text-[15px] font-[AeonikBold]"
            >
              Name
            </span>
            <span
              className="text-white text-[15px] font-[AeonikBold]"
            >
              At stake
            </span>
          </div>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between my-[10px]"
            >
              <div
                className="flex flex-row items-center"
              >
                <span className="text-white font-[AeonikBold]">
                  {index + 1}
                </span>
                <div className="mr-[18px] ml-[10px]">
                  <Skeleton className="w-30 h-30 rounded-full" />
                </div>
                <Skeleton className="h-17 w-40" />
              </div>
              <Skeleton className="h-14 w-25" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <span className="text-white">
        An error occurred: {error.message}
      </span>
    );
  }

  if (!topPredictors) {
    return (
      <div className="mt-2">
        <Skeleton className="w-full h-[600px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-[7px]">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-between my-3">
          <span className="text-white text-[15px] font-[AeonikBold]">Name</span>
          <span className="text-white text-[15px] font-[AeonikBold]">
            At stake
          </span>
        </div>
        {topPredictors.map((predictor, index) => (
          <Link href={`/profile?id=${predictor.user_id}`}>
            <div
              key={index}
              className="flex flex-row items-center justify-between my-[7px] cursor-pointer"
            >
              <div
                className="flex flex-row items-center"
              >
                <span className="text-white font-[AeonikBold]">
                  {index + 1}
                </span>
                <img
                  src={predictor.pfp}
                  alt="Profile"
                  className="size-[30px] rounded-[50%] mr-[20px] ml-[10px]"
                />
                <span
                  className="text-white font-[AeonikBold] text-[17px]"
                >
                  {predictor.name}
                </span>
              </div>
              <span
                className="text-[lightgray] font-[AeonikRegular] text-[15px]"
              >
                ${(predictor.total_amount / 1000000).toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const TopicLeaderboard = ({ image, name, topicId }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full p-[20px] pt-[75px] bg-[#101010] h-[100vh] relative">
      <img
        src={image}
        alt="Topic"
        className="absolute top-0 w-full h-[88px]"
        style={{ width: width}}
      />
      <div
        className="absolute top-0 w-full h-[88px] backdrop-blur-[20px]"
      />
      <div
        className="absolute top-0 w-full h-[88px]"
        style={{
          background:
            "linear-gradient(0deg, #101010 0%, rgba(10,10,10,0.9) 25%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.7) 75%, transparent 100%)",
        }}
      />
      <div
        className="w-full flex flex-row items-center justify-between mb-[10px] gap-[7]"
      >
        <div
          className="p-[6px] rounded-[20px] bg-[#1C1C1E] cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft color={"white"} strokeWidth={5} size={19} />
        </div>

        <span
          className={`
            text-white font-[AeonikBold] font-bold
            ${name.length < 22 ? "text-[20px]" : "text-[17px]"}
          `}
        >
          {name} Leaderboard
        </span>
        <img
          src={image}
          alt="Topic"
          className="size-[30px] rounded-[50%] overflow-hidden"
        />
      </div>

      <div className="overflow-y-scroll w-full">
        <Leaderboard topicId={topicId} />
      </div>
    </div>
  );
};
