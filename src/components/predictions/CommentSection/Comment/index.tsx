// @ts-nocheck
import { motion } from "framer-motion"

import type { BetComment } from "@/types/PostTypes"
import type { User } from "@/types/UserTypes"

import { useDeleteComment } from "@/supabase/mutations/comments/useDeleteComment"

import { CommentHeader } from "./CommentHeader"
import { LikeDislikeSection } from "./LikeDislikeSection"
import { useGetUserPositionsForMarket } from "@/graphql/queries/positions/useGetUserPositionsForMarket"

export interface Outcome {
  name: string
  value: number
}

export function Comment({
  id,
  user,
  user2,
  created_at,
  content,
  name,
  date,
  isDesktop,
  marketId,
  setReply,
  handleComment,
  options,
}: BetComment & {
  created_at: string
  setReply: (name: string) => void
  handleComment: () => void
  user2: User
  isDesktop?: boolean
  marketId?: number
  options: Outcome[]
}) {
  const { mutate: deleteComment } = useDeleteComment()

  const handleDelete = () => {
    deleteComment(id, {
      onSuccess: (data) => {
        console.log("Deletion successful, deleted data:", data)
      },
      onError: (error) => {
        console.error("Failed to delete comment:", error)
      },
    })
  }

  const { data: userOwns } = useGetUserPositionsForMarket(
    user?.walletAddress,
    marketId
  )
  const filteredUserOwns =
    userOwns?.filter((item) => item.tokensOwned > 0) || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full pt-5"
    >
      <CommentHeader
        userOwns={filteredUserOwns}
        options={options}
        user={user}
        user2={user2}
        created_at={created_at}
      />
      <p className=" ml-[3.8rem] -mt-6 font-[300]   text-white text-base ">
        {content}
      </p>
      <div className="flex flex-row items-center justify-between mb-1.5 ">
        <button
          onClick={() => {
            console.log("setting reply", user?.name ?? name)
            setReply(user?.name ?? name)
            handleComment()
          }}
          className={`
            text-sm text-white/60 mt-1  ml-[3.8rem] hover:text-white/80   rounded-full
            ring-1 ring-transparent  hover:scale-101
            bg-none border-none cursor-pointer
          `}
        >
          Reply
        </button>
        <LikeDislikeSection
          setReply={setReply}
          handleComment={handleComment}
          user={user}
          name={name}
        />
      </div>
      {!isDesktop && (
        <div className="w-full self-center h-0 border-b border-[#212121] mt-3 z-1" />
      )}
    </motion.div>
  )
}
