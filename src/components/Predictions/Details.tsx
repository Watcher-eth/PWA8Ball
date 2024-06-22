import React from "react";
import { Gift, Users, Rocket, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { parseAndFormatDate } from "@/lib/utils/extractEndDate"; // Ensure you have this utility function
import { useModalStore } from "@/lib/stores/ModalStore";
import BoostModal from "../Modals/BoostMarket.tsx";
import { useRouter } from "next/navigation";

const BetDetails = ({
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
}) => {
  const { day, month, year, fullMonth, fullDay } = parseAndFormatDate(endDate);
  const router = useRouter();
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

      <BoostModal image={image} id={id}>
        <BoostMarket Boost={3} handleBoost={handleBoost} />
      </BoostModal>

      <motion.div
        style={{ borderRadius: 12 }}
        className="flex flex-row w-[90vw] mt-3 items-center border border-[#212121] rounded-md p-2 justify-between"
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          router.push({
            pathname: `/t/${topicId}`,
            query: {
              id: topicId,
              name: topic,
              description: question,
              image: icon,
              topic,
              members,
            },
          })
        }
      >
        <Link
          href={{
            pathname: `/t/${topicId}`,
            query: {
              id: topicId,
              name: topic,
              description: question,
              image: icon,
              topic,
              members,
            },
          }}
        >
          <div className="flex flex-row items-center">
            {icon ? (
              <img
                src={icon}
                alt={topic}
                style={{ borderRadius: 6 }}
                className="h-12 w-12 object-cover	 rounded-md overflow-hidden mr-2"
              />
            ) : (
              <div className="h-12 w-12 rounded-md bg-gray-200 mr-2" />
            )}
            <div className="flex flex-col space-y-[-0.1rem]">
              <span className="text-sm font-bold text-gray-400">/{topic}</span>
              <div className="flex flex-row items-center">
                <Users color="white" size={17} strokeWidth={3.2} />
                <span className="text-lg font-bold text-white ml-1">
                  {members} {members > 1 ? "Members" : "Member"}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <motion.div
          className={`flex items-center justify-center px-5 py-2 border  border-[#212121] rounded-md ${
            joined ? "bg-white" : "bg-transparent"
          }`}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            router.push({
              pathname: `/t/${topicId}`,
              query: {
                id: topicId,
                name: topic,
                description: question,
                image: icon,
                topic,
                members,
              },
            })
          }
          style={{ borderRadius: 20 }}
        >
          <Link
            href={{
              pathname: `/t/${topicId}`,
              query: {
                id: topicId,
                name: topic,
                description: question,
                image: icon,
                topic,
                members,
              },
            }}
          >
            <span
              className={`text-md font-bold ${
                joined ? "text-gray-200" : "text-white"
              }`}
            >
              {joined ? "Joined" : "Join"}
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

const BoostMarket = ({ Boost, handleBoost }) => {
  return (
    <motion.div
      style={{ borderRadius: 12 }}
      className="flex flex-row w-[90vw] items-center p-2 border border-[#212121]   mt-3 justify-between"
      whileTap={{ scale: 0.95 }}
      onClick={handleBoost}
    >
      <Rocket className="ml-2 " size={30} color="white" />
      <div className="flex flex-col ml-[-28px] space-y-[-0.1rem] items-start">
        <span className="text-lg font-bold text-white">Boost this market</span>
        <span className="text-sm text-white">Earn fees & $Cred</span>
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

export default BetDetails;
