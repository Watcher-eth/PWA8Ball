// @ts-nocheck

import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { Users } from "lucide-react";
import Link from "next/link";

export const BetBigView = ({
  marketId,
  title,
  question,
  image,
  topic,
  option1,
  option2,
}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      style={{ borderRadius: 20 }}
    >
      <motion.div
        style={{ borderRadius: 12 }}
        className="flex flex-col w-full mx-auto my-2 relative cursor-pointer"
        onClick={() =>
          router.push({
            pathname: "/[id]",
            query: {
              id: marketId,
              name: title,
              description: question,
              icon: "icon",
              image,
              topic,
            },
          })
        }
      >
        <img
          src={image}
          alt="Market Image"
          style={{ borderRadius: 12 }}
          className="w-full h-[30vh] rounded-lg object-cover"
        />
        <div
          className="absolute top-[22.5vh] w-full h-16 bg-gradient-to-t from-black via-[rgba(7, 7, 7, 0.9)] to-transparent rounded-b-lg"
          style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
        ></div>
        <div className="absolute top-3 right-3 flex items-center bg-white px-2 pr-1 p-1 rounded-lg z-10">
          <span className="text-[#212121] font-bold text-12 mr-0">223</span>
          <Users className="text-[#212121]" strokeWidth={3.5} height={13} />
        </div>
        <h2 className="text-[1.8rem] text-white font-bold mt-[-3.1rem] ml-2 z-10 font-[Aeonik-Bold]">
          {title}
        </h2>
        <p className="text-[1rem] text-white mt-2 ml-1 mb-[-0.1rem] z-10 leading-[1.2]">
          {question}
        </p>
        {option1.image ? (
          <PollingComponentImage
            yesValue={option1}
            noValue={option2}
            option1={option1.name}
            option2={option2.name}
          />
        ) : (
          <PollingComponent
            yesValue={option1.amount}
            noValue={option2.amount}
            option1={option1.name}
            option2={option2.name}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export const BetSmallView = ({
  marketId,
  title,
  question,
  image,
  topic,
  option1,
  option2,
}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex no-scrollbar mb-2 mt-[-0.48rem] flex-row p-2 py-2 bg-[#141414] rounded-lg w-[101%] mx-0 ml-[-0.15rem] my-0 items-center"
        onClick={() =>
          router.push({
            pathname: "/[id]",
            query: {
              id: marketId,
              name: title,
              description: question,
              icon: "icon",
              image,
              topic,
            },
          })
        }
        style={{ borderRadius: 15 }}
      >
        <img
          src={image}
          style={{ borderRadius: 10 }}
          alt="Market Image"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex flex-col ml-2 gap-1">
          <span className="text-lightgray text-sm">Trending Today</span>
          <p
            style={{ lineClamp: 2 }}
            className="text-white line-clamp-2 text-lg font-bold "
          >
            {question}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const PollingComponent = ({ yesValue, noValue, option1, option2 }) => {
  const total = yesValue + noValue;
  const yesPercentage = (yesValue / total) * 100;
  const noPercentage = (noValue / total) * 100;

  return (
    <div className="flex no-scrollbar items-center p-2 my-1 ml-[-0.1rem] w-[90vw]">
      <motion.div
        className="flex items-center h-10 justify-center bg-red-600 rounded-l-lg p-2 text-white font-bold"
        style={{
          width: `${noPercentage}vw`,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          fontSize: 13,
        }}
      >
        {noPercentage.toFixed(0)}% {option1}
      </motion.div>
      <div className="w-[0.35em] bg-white h-12 mx-[0.3rem] rounded-full"></div>
      <motion.div
        className="flex items-center h-10 justify-center bg-blue-600 rounded-r-lg p-2 text-white font-bold"
        style={{
          width: `${yesPercentage}vw`,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          fontSize: 13,
        }}
      >
        {option2} {yesPercentage.toFixed(0)}%
      </motion.div>
    </div>
  );
};

const MAX_LENGTH = 11;

export const PollingComponentImage = ({
  yesValue,
  noValue,
  option1,
  option2,
}) => {
  const total = yesValue.amount + noValue.amount;
  const yesPercentage = (yesValue.amount / total) * 100;
  const noPercentage = (noValue.amount / total) * 100;

  return (
    <div className="flex items-center p-2 my-1">
      <motion.div
        className="flex items-center h-10 justify-between bg-red-600 rounded-l-lg p-2 text-white font-bold"
        style={{
          width: `${noPercentage}%`,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          fontSize: 13,
        }}
      >
        <span>
          {noPercentage.toFixed(0)}%{" "}
          {noValue.name.length > MAX_LENGTH
            ? `${noValue.name.slice(0, MAX_LENGTH)}`
            : noValue.name}
        </span>
        <img
          style={{ borderRadius: 6 }}
          src={noValue.image}
          alt="option"
          className="size-8 rounded-md object-cover ml-2"
        />
      </motion.div>
      <div className="w-1 bg-white h-12 mx-1 rounded-full"></div>
      <motion.div
        className="flex items-center h-10 justify-between bg-blue-600 rounded-r-lg p-2 text-white font-bold"
        style={{
          width: `${yesPercentage}%`,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          fontSize: 13,
        }}
      >
        <img
          src={yesValue.image}
          style={{ borderRadius: 6 }}
          alt="option"
          className="size-8 rounded-md object-cover mr-2"
        />
        <span>
          {yesValue.name.length > MAX_LENGTH
            ? `${yesValue.name.slice(0, MAX_LENGTH)}`
            : yesValue.name}{" "}
          {yesPercentage.toFixed(0)}%
        </span>
      </motion.div>
    </div>
  );
};
