// @ts-nocheck
import { motion } from "framer-motion";

import type { BetComment } from "@/types/PostTypes";
import type { User } from "@/types/UserTypes";

import { useDeleteComment } from "@/supabase/mutations/comments/useDeleteComment";

import { CommentHeader } from "./CommentHeader";
import { LikeDislikeSection } from "./LikeDislikeSection";


export function Comment({
  id,
  user,
  user2,
  created_at,
  content,
  name,
  date,
  setReply,
  handleComment,
}: BetComment & {
  created_at: string
  setReply: (name: string) => void
  handleComment: () => void
  user2: User
}) {
  const { mutate: deleteComment } = useDeleteComment();

  const handleDelete = () => {
    deleteComment(id, {
      onSuccess: (data) => {
        console.log("Deletion successful, deleted data:", data);
      },
      onError: (error) => {
        console.error("Failed to delete comment:", error);
      },
    });
  };
  console.log("date", created_at, date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full pt-5"
    >
      <CommentHeader user={user} user2={user2} created_at={created_at} />
      <p className="my-2 text-base text-white ml-12">{content}</p>
      <div className="flex flex-row items-center justify-between mb-1.5 ml-10">
        <button
          onClick={() => {
            setReply(user?.name ?? name);
            handleComment();
          }}
          className={`
            text-xs text-white/60 hover:text-white/80 py-1 px-2 rounded-full
            ring-1 ring-transparent hover:ring-white/10 active:ring-white/20
            bg-none border-none cursor-pointer
          `}
        >
          Reply
        </button>
        <LikeDislikeSection />
      </div>
      <div className="w-full self-center h-0 border-b border-white/20 mt-3 z-20" />
    </motion.div>
  );
}
