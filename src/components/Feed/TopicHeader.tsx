// @ts-nocheck
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { TEST_TOPICS } from "@/constants/testData";



export const TopicHeader = ({ setSelectedTopic, selectedTopic, isDesktop }) => {

  return (
    <div
      className={`
        flex flex-col w-full py-4
        ${isDesktop === true ? "bg-[#080808]" : "bg-[#101010]"}
      `}
    >
      <Marquee speed={40} gradient={false}>
        <div className="flex flex-row">
          {TEST_TOPICS.slice(0, TEST_TOPICS.length / 2).map((item, index) => (
            <TopicButton
              key={index}
              item={item}
              index={index}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          ))}
        </div>
      </Marquee>
      <Marquee speed={20} gradient={false} className="mt-3">
        <div className="flex flex-row">
          {TEST_TOPICS.slice(TEST_TOPICS.length / 2).map((item, index) => (
            <TopicButton
              key={index}
              item={item}
              index={index}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};


function TopicButton({ item, index, selectedTopic, setSelectedTopic }) {
  function onTopicPress() {
    if (selectedTopic === item) {
      setSelectedTopic("🔥 Trending");
    } else {
      setSelectedTopic(item);
    }
  }

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 * (index + 1) }}
    >
      <button
        onClick={onTopicPress}
        className={`px-4 py-2 text-base font-semibold rounded-full mr-4
        border-[0.5px] border-transparent
        ${
          selectedTopic === item
            ? "bg-white hover:bg-white/90 active:bg-white/80 text-[#1B1B1E]"
            : `
              bg-[#1B1B1E]/70 hover:bg-[#1B1B1E]/90 active:bg-[#1B1B1E]/100 text-white
               border-white/5 hover:border-white/10 active:border-white/20
              `
        }
        `}
      >
        {item}
      </button>
    </motion.div>
  );
}