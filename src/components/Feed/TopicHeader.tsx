// @ts-nocheck

import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const testTopics = [
  "🔥 Trending",
  "🇺🇸 2024 US Elections",
  "🎤 Taylor Swift",
  "📱 TikTok",
  "🏜️ Dune",
  "📈 Gamestop",
  "🎬 Oscars 2024",
  "🥊 Jake Paul",
  "🎮 GTA 6",
  "⚽ UEFA European Cup",
];

export const TopicHeader = ({ setSelectedTopic, selectedTopic, isDesktop }) => {
  const handleTopicPress = (item) => {
    if (selectedTopic === item) {
      setSelectedTopic("🔥 Trending");
    } else {
      setSelectedTopic(item);
    }
  };

  return (
    <div
      style={{ background: isDesktop === true ? "#080808" : "#101010" }}
      className="flex flex-col w-full pt-4 pb-4 pl-0"
    >
      <Marquee speed={40} gradient={false}>
        <div className="flex flex-row">
          {testTopics.slice(0, testTopics.length / 2).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 * (index + 1) }}
            >
              <button
                onClick={() => handleTopicPress(item)}
                className={`px-4 py-2 text-base font-semibold rounded-full mr-4 ${
                  selectedTopic === item
                    ? "bg-white text-[#1B1B1E]"
                    : "bg-[#1B1B1E] text-white"
                }`}
              >
                {item}
              </button>
            </motion.div>
          ))}
        </div>
      </Marquee>
      <Marquee speed={20} gradient={false} className="mt-3">
        <div className="flex flex-row">
          {testTopics.slice(testTopics.length / 2).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 * (index + 1) }}
            >
              <button
                onClick={() => handleTopicPress(item)}
                className={`px-4 py-2 text-base font-semibold rounded-full mr-4 ${
                  selectedTopic === item
                    ? "bg-white text-[#1B1B1E]"
                    : "bg-[#1B1B1E] text-white"
                }`}
              >
                {item}
              </button>
            </motion.div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};
