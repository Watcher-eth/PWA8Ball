// @ts-nocheck

import React, { useState } from "react";
import { Gift, Users, Rocket, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BoostModal } from "../Modals/BoostModal";
import { useGetLPForUser } from "@/supabase/queries/user/useGetLPForUser";
import { useUserStore } from "@/lib/stores/UserStore.tsx";
import { BoostExplainerModal } from "../Modals/Tutorials/BoostExplainerModal";
import { getTopicPath } from "@/utils/urls/index.ts";
import { parseAndFormatDate } from "@/utils/datetime/extractEndDate";
import { DesktopBoostModal } from "../Modals/BoostModal/DesktopBoostModal";

export const BetDetails = ({
  endDate,
  multiplier,
  topic,
  icon,
  topicId,
  question,
  members,
  joined,
  handleBoost,
  image,
  id,
  isDesktop,
}) => {
  const { user } = useUserStore();
  const { day, month, year, fullMonth, fullDay } = parseAndFormatDate(endDate);
  const {
    data: positions,
    isLoading,
    refetch,
  } = useGetLPForUser(user?.walletaddress);
  const [isOpen, setIsOpen] = useState(false);
  console.log("details2", image);
  function handleBooster() {
    if (positions?.length < 1) {
      setIsOpen(true);
    }
    console.log("s", positions?.length < 1);
    if (positions?.length >= 1) {
      handleBoost();
    }
  }

  const linkArgs = {
    pathname: getTopicPath(topicId),
    query: {
      id: topicId,
      name: topic,
      description: question,
      image: icon,
      topic,
      members,
    },
  };

  return (
    <div className="flex flex-col w-full p-4 pb-2 mb-2">
      <div className="flex flex-row w-full items-center">
        <div
          style={{ borderRadius: 8 }}
          className="flex flex-col p-2.5 space-y-[-0.2rem] w-14 h-14 rounded-lg bg-[#131313] items-center mr-3 justify-center"
        >
          <span className="text-xs font-bold text-[#FF0050]">{month}</span>
          <span className="text-3xl font-bold mt-[-2] text-white">{day}</span>
        </div>
        <div className="flex flex-col space-y-[-0.1rem]">
          <span className="text-sm font-bold text-gray-200">End Date</span>
          <span className="text-lg font-bold text-white">
            {fullDay} {fullMonth}, {year}
          </span>
        </div>
      </div>
      <div className="flex flex-row w-full mt-3 items-center">
        <div
          style={{ borderRadius: 8 }}
          className="flex flex-col p-2.5 rounded-md bg-[#131313] items-center mr-3"
        >
          <Gift color="white" strokeWidth={2.5} size={34} />
        </div>
        <div className="flex flex-col space-y-[-0.1rem]">
          <span className="text-sm font-bold text-gray-200">Rewards</span>
          <span className="text-lg font-bold text-white">
            {multiplier.toFixed(1)}x $Cred Bonus
          </span>
        </div>
      </div>
      {isDesktop ? (
        <DesktopBoostModal image={image} id={id}>
          <BoostMarket
            isDesktop={isDesktop}
            Boost={3}
            handleBoost={handleBooster}
          />
        </DesktopBoostModal>
      ) : (
        <BoostModal image={image} id={id}>
          <BoostMarket
            isDesktop={isDesktop}
            Boost={3}
            handleBoost={handleBooster}
          />
        </BoostModal>
      )}
      <Link href={linkArgs}>
        <motion.div
          style={{ borderRadius: 12, width: isDesktop ? "100%" : "90vw" }}
          className="flex flex-row  mt-3 items-center border border-[#212121] rounded-md p-2 justify-between"
          whileTap={{ scale: 0.95 }}
        >
          <Link href={linkArgs}>
            <div className="flex flex-row items-center">
              {icon ? (
                <img
                  src={icon}
                  alt={topic}
                  style={{ borderRadius: 6 }}
                  className="size-12 object-cover	 rounded-md overflow-hidden mr-2"
                />
              ) : (
                <div className="size-12 rounded-md bg-gray-200 mr-2" />
              )}
              <div className="flex flex-col space-y-[-0.1rem]">
                <span className="text-sm font-bold text-gray-400">
                  /{topic}
                </span>
                <div className="flex flex-row items-center">
                  <Users color="white" size={17} strokeWidth={3.2} />
                  <span className="text-lg font-bold text-white ml-1">
                    {members} {members > 1 ? "Members" : "Member"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={linkArgs}>
            <motion.div
              className={`flex items-center justify-center px-5 py-2 border  border-[#212121] rounded-md ${
                joined ? "bg-white" : "bg-transparent"
              }`}
              whileTap={{ scale: 0.95 }}
              style={{ borderRadius: 20 }}
            >
              <Link href={linkArgs}>
                <span
                  className={`text-md font-bold ${
                    joined ? "text-gray-200" : "text-white"
                  }`}
                >
                  {joined ? "Joined" : "Join"}
                </span>
              </Link>
            </motion.div>
          </Link>
        </motion.div>
      </Link>
      <BoostExplainerModal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        setOpen={handleBoost}
      />
    </div>
  );
};

const BoostMarket = ({ Boost, handleBoost, isDesktop }) => {
  return (
    <motion.div
      style={{ borderRadius: 12, width: isDesktop ? "100%" : "90vw" }}
      className="flex flex-row  items-center p-2 border border-[#212121]   mt-3 justify-between"
      whileTap={{ scale: 0.95 }}
      onClick={handleBoost}
    >
      <div className="flex flex-row space-x-4 items-center">
        <Rocket className="ml-2 " size={30} color="white" />
        <div className="flex flex-col ml-[-28px] space-y-[-0.1rem] items-start">
          <span className="text-lg font-bold text-white">
            Boost this market
          </span>
          <span className="text-sm text-white">Earn fees & $Cred</span>
        </div>
      </div>
      <motion.div
        style={{ borderRadius: 20 }}
        className="flex items-center justify-center px-4 py-2 border border-[#212121] rounded-md"
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-md font-bold text-white">Boost</span>
      </motion.div>
    </motion.div>
  );
};
