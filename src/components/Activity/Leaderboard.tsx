// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useGetTopPredictors } from "@/lib/supabase/queries/leaderboard/fetchTopUsersByPredictionAmount";
import Link from "next/link";

export const Leaderboard: React.FC = () => {
  const { data: topPredictors, error, isLoading } = useGetTopPredictors();
  const router = useRouter();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <p style={{ color: "white" }}>An error occurred: {error.message}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: "flex", flexDirection: "column", marginTop: "7px" }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "7px 0",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            Name
          </h2>
          <h2
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            At stake
          </h2>
        </div>
        {topPredictors?.map((predictor, index) => (
          <Link href={`/profile/${predictor.user_id}`}>
            <motion.button
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "5px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "white", fontWeight: 700 }}>{index + 1}</p>
                <img
                  src={predictor.pfp}
                  alt="Profile"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "15px",
                    margin: "0 12px 0 10px",
                    objectFit: "cover",
                  }}
                />
                <p
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "17px",
                  }}
                >
                  {predictor.name}
                </p>
              </div>
              <p
                style={{
                  color: "lightgray",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                ${(predictor.total_amount / 1000000).toFixed(2)}
              </p>
            </motion.button>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};


export const skeletonVariants = {
  initial: { opacity: 1 },
  pulse: {
    opacity: 0.4,
    transition: {
      duration: 0.8,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

const LoadingSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col mt-2.5"
  >
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between my-1.5">
        <span className="text-white font-bold text-sm">Name</span>
        <span className="text-white font-bold text-sm">At stake</span>
      </div>
      {[1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="flex flex-row items-center justify-between my-1.25"
        >
          <div className="flex flex-row items-center">
            <span className="text-white font-bold">{index + 1}</span>
            <div className="mx-3 ml-2.5">
              <motion.div
                className="h-7.5 w-7.5 rounded-full bg-gray-900"
                variants={skeletonVariants}
                initial="initial"
                animate="pulse"
              />
            </div>
            <motion.div
              className="h-4.25 w-10 bg-gray-900 rounded-xl"
              variants={skeletonVariants}
              initial="initial"
              animate="pulse"
            />
          </div>
          <motion.div
            className="h-3.5 w-6.25 bg-gray-900 rounded-xl"
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
        </motion.div>
      ))}
    </div>
  </motion.div>
);
