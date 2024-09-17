// @ts-nocheck
import React from "react"

import { Share, Share2 } from "lucide-react"
import { useUserStore } from "@/lib/stores/UserStore"
import { motion } from "framer-motion"
export const DesktopUserSideProfile: React.FC = () => {
  const { user } = useUserStore()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-[90vh] w-full p-12 bg-[#121212] flex flex-col text-white">
      <div className="flex flex-col mb-6">
        <img
          src={user.pfp}
          alt={user.name}
          className="rounded-full size-24 mb-4"
        />
        <h1 className="text-[1.8rem] font-bold">{user.name}</h1>
        <p className="text-lg">@{user.name}</p>
      </div>
      <div className=" mb-8 mr-4">
        <div className="flex justify-between text-lg mb-10">
          <InfoParaStack
            className="flex flex-col"
            label="Rank"
            content={`#1276${user.rank}`}
          />
          <InfoParaStack
            className="flex flex-col"
            label="Cred"
            content={`${user.cred}345 $Cred`}
          />
        </div>
        <InfoParaStack
          className="mb-6"
          label="Predictions made"
          content={`${user.predictionsMade} Predictions`}
        />
        <InfoParaStack
          label="Correct Predictions"
          content={`${user.correctPredictions} Correct`}
        />
      </div>
      <motion.button className="hover:scale-102 flex items-center self-center w-full justify-center px-5 py-3 bg-[#151515] font-semibold rounded-full mt-auto">
        <Share className="w-5 h-5 mr-2" strokeWidth={3} size={20} />
        Share your score
      </motion.button>
    </div>
  )
}

function InfoParaStack({
  label,
  content,
  className = "",
}: {
  label: string
  content: string
  className?: string
}) {
  return (
    <div className={className}>
      <p className="font-semibold">{label}</p>
      <p className="text-[1.45rem] font-semibold text-[lightgray]">{content}</p>
    </div>
  )
}
