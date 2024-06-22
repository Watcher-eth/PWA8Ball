import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

const UserPredictions = ({
  index,
  image,
  question,
  amount,
  title,
  option,
  optional,
  onOpenBottomSheet,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-center justify-between p-2 py-1 rounded-xl bg-[#171717] w-[90vw] m-1"
      onClick={onOpenBottomSheet}
    >
      <div className="flex items-center gap-2">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-14 object-cover w-14 rounded-[0.5rem]"
          />
        ) : (
          <Skeleton className="w-14 h-14 rounded-lg" />
        )}
        <div className="flex flex-col ">
          <p
            className="text-white text-md font-bold"
            style={{ fontFamily: "Aeonik-Bold" }}
          >
            {title}
          </p>
          <p className="text-gray-200 text-sm line-clamp-2">{question}</p>
        </div>
      </div>
      <div
        className={`${option === "No" ? "px-3" : "px-2"} py-1 rounded-full ${
          optional === 1 ? "bg-[#0050FF]" : "bg-[#FF0050]"
        }`}
      >
        <p className="text-white font-bold">
          {option.length < 8 ? option : option.substring(0, 3)}
        </p>
      </div>
    </motion.div>
  );
};

export const UserPredictionSkeleton = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex items-center justify-between p-2 rounded-lg bg-[#1B1B1E] my-2"
  >
    <div className="flex items-center gap-2">
      <Skeleton className="w-14 h-14 rounded-lg" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[80%] h-[19px]" />
        <Skeleton className="w-[80%] h-[14px]" />
      </div>
    </div>
    <Skeleton className="w-[38%] h-[30px] rounded-lg" />
  </motion.div>
);

export const CreatedPrediction = ({
  index,
  image,
  question,
  amount,
  title,
  onOpenBottomSheet,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-center justify-between p-2 py-1 rounded-xl bg-[#171717] my-1 w-[90vw]"
      onClick={onOpenBottomSheet}
    >
      <div className="flex items-center gap-2">
        <img src={image} alt={title} className="h-14 w-14 rounded-[0.5rem]" />
        <div className="flex flex-col max-w-[69%]">
          <p
            className="text-white text-md font-bold"
            style={{ fontFamily: "Aeonik-Bold" }}
          >
            {title}
          </p>
          <p
            className="text-gray-400 text-sm line-clamp-2 "
            style={{ fontFamily: "Aeonik-Bold" }}
          >
            {question}
          </p>
        </div>
      </div>
      <div className="absolute right-8 p-1.5 rounded-full bg-[#5ACE5A]">
        <Plus fill={"white"} color={"white"} size={15} strokeWidth={6.5} />
      </div>
    </motion.div>
  );
};

export default UserPredictions;
