// @ts-nocheck

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

const Leaderboard = ({ topicId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const topPredictors = []; // Mock data
  const error = null; // Mock error

  if (isLoading) {
    return (
      <div className="flex flex-col mt-2">
        <div className="flex flex-row justify-between items-center mb-2">
          <span className="text-white font-bold">Name</span>
          <span className="text-white font-bold">At stake</span>
        </div>
        {[1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="flex flex-row justify-between items-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-row items-center">
              <span className="text-white font-bold">{index + 1}</span>
              <div className="h-8 w-8 bg-gray-600 rounded-full ml-2"></div>
              <div className="h-4 w-20 bg-gray-600 ml-2 rounded"></div>
            </div>
            <div className="h-4 w-12 bg-gray-600 rounded"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <span className="text-white">An error occurred: {error.message}</span>
    );
  }

  if (topPredictors.length === 0) {
    return (
      <div className="mt-2">
        <div className="h-64 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row justify-between items-center mb-2">
        <span className="text-white font-bold">Name</span>
        <span className="text-white font-bold">At stake</span>
      </div>
      {topPredictors.map((predictor, index) => (
        <motion.div
          key={index}
          className="flex flex-row justify-between items-center mb-2"
          whileHover={{ scale: 1.02 }}
          onClick={() => router.push(`/profile/${predictor.user_id}`)}
        >
          <div className="flex flex-row items-center">
            <span className="text-white font-bold">{index + 1}</span>
            <img
              src={predictor.pfp}
              alt="Avatar"
              className="h-8 w-8 rounded-full ml-2"
            />
            <span className="text-white ml-2">{predictor.name}</span>
          </div>
          <span className="text-lightgray">
            {(predictor.total_amount / 1000000).toFixed(2)}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const TopicLeaderboard = ({ image, name, topicId }) => {
  const router = useRouter();
  const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return (
    <div className="flex flex-col w-full p-5 bg-[#101010]" style={{ height }}>
      <img
        src={image}
        alt="Topic Image"
        className="absolute top-0 w-full h-20 object-cover"
      />
      <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-transparent to-[#101010]"></div>
      <div className="flex flex-row justify-between items-center mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-gray-700"
        >
          <span className="text-white">←</span>
        </button>
        <h1 className="text-xl text-white font-bold">{name} Leaderboard</h1>
        <img src={image} alt="Topic Icon" className="h-8 w-8 rounded-full" />
      </div>
      <motion.div className="overflow-auto">
        <Leaderboard topicId={topicId} />
      </motion.div>
    </div>
  );
};

export default TopicLeaderboard;
