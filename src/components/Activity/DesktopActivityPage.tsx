// @ts-nocheck
import React from "react";

import { Share, Share2 } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { motion } from "framer-motion";
export const DesktopUserSideProfile: React.FC = () => {
  const { user } = useUserStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[90vh] w-[55vw] p-6 bg-[#080808] pl-2 pr-10 flex flex-col text-white">
      <div className="flex flex-col  mb-6">
        <img
          src={user.pfp}
          alt={user.name}
          className="rounded-full w-24 h-24 mb-4"
        />
        <h1 className="text-[1.8rem] font-bold">{user.name}</h1>
        <p className="text-lg">@{user.name}</p>
      </div>
      <div className=" mb-8 mr-4">
        <div className="flex justify-between text-lg mb-10">
          <div className="flex flex-col">
            <p className="font-semibold">Rank</p>
            <p className="text-[1.45rem] font-semibold text-[lightgray]">
              #1276{user.rank}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Cred</p>
            <p className="text-[1.45rem] font-semibold text-[lightgray]">
              {user.cred}345 $Cred
            </p>
          </div>
        </div>
        <div className="mb-6">
          <p className="font-semibold">Predictions made</p>
          <p className="text-[1.45rem] font-semibold text-[lightgray]">
            {user.predictionsMade}15 Predictions
          </p>
        </div>
        <div>
          <p className="font-semibold">Correct Predictions</p>
          <p className="text-[1.45rem] font-semibold text-[lightgray]">
            {user.correctPredictions}4 Correct
          </p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="flex items-center justify-center px-5 py-3 bg-[#121212] font-semibold rounded-full mt-auto"
      >
        <Share className="w-5 h-5 mr-2" strokeWidth={3} size={20} />
        Share your score
      </motion.button>
    </div>
  );
};
