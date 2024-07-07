// @ts-nocheck
import { motion } from "framer-motion";
import { useGetTopPredictors } from "@/lib/supabase/queries/leaderboard/useGetTopPredictors";
import Link from "next/link";
import { getProfilePath } from "@/utils/urls";

import { AltSkeleton } from "@/components/ui/Skeleton";



export const Leaderboard: React.FC = () => {
  const { data: topPredictors, error, isLoading } = useGetTopPredictors();

  if (error) {
    return (
      <p className="text-white">
        An error occurred: {error.message}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col mt-2"
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between my-1.5">
          <h2 className="text-white text-[15px] font-bold">Name</h2>
          <h2 className="text-white text-[15px] font-bold">At stake</h2>
        </div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          topPredictors?.map((predictor, index) => (
            <PredictorInfo key={index} {...predictor} index={index} />
          ))
        )}
      </div>
    </motion.div>
  );
};

function PredictorInfo({user_id, name, pfp, total_amount, index}: {
  user_id: string,
  name: string,
  pfp: string,
  total_amount: number,
  index: number
}) {
  return (
    <Link href={getProfilePath(user_id)}>
      <motion.button
        className="flex flex-row items-center justify-between my-1.5"
      >
        <div className="flex flex-row items-center">
          <p className="text-white font-bold">{index + 1}</p>
          <img
            src={pfp}
            alt="Profile"
            className="size-[30px] rounded-full object-cover ml-2.5 mr-3"
          />
          <p className="text-white text-[17px] font-semibold">
            {name}
          </p>
        </div>
        <p className="text-[lightgray] text-[15px] font-medium">
          ${(total_amount / 1000000).toFixed(2)}
        </p>
      </motion.button>
    </Link>
  )
}


const LoadingSkeleton = () => {
  return ( [1, 2, 3, 4].map((index) => (
    <motion.div
      key={index}
      className="flex flex-row items-center justify-between my-1.25"
    >
      <div className="flex flex-row items-center">
        <span className="text-white font-bold">{index + 1}</span>
        <div className="mx-3 ml-2.5">
          <AltSkeleton className="h-7.5 w-7.5 !rounded-full !bg-gray-900" />
        </div>
        <AltSkeleton className="h-4.25 w-10 !bg-gray-900" />
      </div>
      <AltSkeleton className="h-3.5 w-6.25 bg-gray-900"/>
    </motion.div>
  )))
};


