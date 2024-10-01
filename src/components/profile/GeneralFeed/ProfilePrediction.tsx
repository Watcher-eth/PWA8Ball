// @ts-nocheck

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/Skeleton"

export function ProfilePrediction({
  image,
  question,
  amount,
  title,
  index,
  rightContent,
}: {
  image: string
  question: string
  amount: number
  title: string
  index: number
  rightContent?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-center justify-between p-2 py-1.5  rounded-[0.85rem] bg-[#161616]  w-[90vw]"
    >
      <div className="flex items-center gap-2">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-14 w-14 object-cover rounded-[0.5rem]"
          />
        ) : (
          <Skeleton className="w-14 h-14 rounded-lg" />
        )}
        <div className="flex flex-col items-start space-y-0">
          <p className="text-white text-base font-semibold">{title}</p>
          <p style={{lineHeight: 1.2}} className="text-white/80 text-[0.9rem] font-[300] text-start max-w-[55vw] line-clamp-2">
            {question}
          </p>
        </div>
      </div>
      {rightContent}
    </motion.div>
  )
}
