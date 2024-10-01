import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/Skeleton"
import Link from "next/link"

import { useGetTopicsWithMembers } from "@/supabase/queries/topics/useGetTopicsWithMemberCount"

import { getTopicPath } from "@/utils/urls"

export function TrendingCommunities() {
  const { data: topics } = useGetTopicsWithMembers(["17", "18"])

  return (
    <div className=" flex flex-col w-full">
      <div className="text-[1.8rem] text-white font-semibold mb-7 space-x-2">
        Popular Communities
      </div>
      <div className="flex flex-row space-x-7">
        {topics?.map((topic, index) => {
          // @ts-ignore
          return <TrendingCommunityItem {...topic} key={index} />
        }) ??
          [1, 2].map((index) => (
            <div className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}>
              <Skeleton className=" rounded-lg w-1/2  h-[40vh]" />
            </div>
          ))}
      </div>
    </div>
  )
}

function TrendingCommunityItem({
  id,
  title,
  description,
  image,
}: {
  id: string
  title: string
  description: string
  image?: string
}) {
  return (
    <Link
      href={getTopicPath(id)}
      className="relative w-full hover:scale-[100.3%] active:scale-99 h-[29vw] rounded-md bg-black bg-opacity-75"
    >
      <img
        src={image}
        alt="Gallery Background"
        className="absolute inset-0 w-full rounded-md  h-[29vw] object-cover"
      />
      <div className="absolute inset-0 w-full h-[29vw]  rounded-md  bg-[#151515]/70" />

      <div className="relative z-10 flex flex-col lg:mt-8   items-center justify-center h-full text-white">
        <img
          src={image}
          alt="Topic image"
          className="inset-0 object-cover w-20 h-20 rounded-lg"
        />

        <h2 className="text-5xl font-[Aeonik-Bold] mb-6 mt-4">{title}</h2>

        <div className="flex justify-center space-x-3 px-3 lg:px-0 lg:mt-12">
          <div className="text-center flex flex-col items-center -space-y-0">
            <p className="text-lg font-[Aeonik-Bold]">Members</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <p className="text-2xl font-bold">33</p>
              <div className="flex -space-x-1">
                <img
                  src="creator-image-1.jpg"
                  alt="Creator 1"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <img
                  src="creator-image-2.jpg"
                  alt="Creator 2"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <img
                  src="creator-image-3.jpg"
                  alt="Creator 3"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>
          <div className="h-full py-1 w-px bg-white/20" />
          <div className="text-center flex flex-col items-center -space-y-0">
            <p className="text-lg font-[Aeonik-Bold]">Live Predictions</p>
            <div className="flex items-center mt-2 space-x-2 justify-cemterr">
              <p className="text-2xl font-bold ">8</p>
              <div className="relative flex items-center  ">
                <div className="w-3 h-3 bg-white rounded-full z-10"></div>
                <motion.div
                  className="absolute w-4 h-4 bg-white rounded-full"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="h-full py-1 w-px bg-white/20" />
          <div className="text-center flex flex-col items-center -space-y-0">
            <p className="text-lg font-[Aeonik-Bold]">Total Stake</p>
            <p className="text-2xl font-bold mt-2">$278,345.00</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
