// @ts-nocheck

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ThumbsDown, UserCircle2Icon, UserIcon } from "lucide-react";

import type { BetComment } from "@/types/PostTypes";
import type { User } from "@/types/UserTypes";
import { timeAgo } from "@/utils/datetime/timeAgo";
import { parseOption } from "@/utils/predictions/parseOption";
import { getProfilePath } from "@/utils/urls";
import { useDeleteComment } from "@/supabase/mutations/comments/useDeleteComment";

import { CommentHeader } from "./CommentHeader";

interface CommentProps extends BetComment {
  setReply: (name: string) => void;
  handleComment: () => void;
  user2: User;
}

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
}: CommentProps) {
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
        <LikeDislikeSection/>

      </div>
      <div className="w-full self-center h-0 border-b border-white/20 mt-3 z-20" />
    </motion.div>
  );
}


function LikeDislikeSection() {
  const [temporaryLike, setTemporaryLike] = useState(false);
  const [temporaryDislike, setTemporaryDislike] = useState(false);
  const handleLikePress = () => {
    setTemporaryLike(!temporaryLike);
    setTemporaryDislike(false);
  };

  const handleDislikePress = () => {
    setTemporaryDislike(!temporaryDislike);
    setTemporaryLike(false);
  };

  return (
    <div className="flex flex-row items-center space-x-2.5">
      <CommentReactionButton
        onClick={handleLikePress}
        IconComponent={Heart}
        className={
          temporaryLike
            ? "text-[#e32636] fill-[#e32636]"
            : "text-white hover:text-[#e32636]"
        }
      />
      <CommentReactionButton
        onClick={handleDislikePress}
        IconComponent={ThumbsDown}
        className={
          temporaryDislike
            ? "text-[#FF6700] fill-[#FF6700]"
            : "text-white hover:text-[#FF6700]"
        }
      />
    </div>
  );
}


function CommentReactionButton({
  onClick,
  IconComponent,
  className,
}: {
  onClick: () => void,
  IconComponent: React.FC
  className: string
}) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-none border-none cursor-pointer
        flex items-center
      `}
    >
      <IconComponent
        size={19}
        strokeWidth={3}
        className={`
          transition-all duration-75
          ${className}
        `}
      />
    </button>
  );
}
