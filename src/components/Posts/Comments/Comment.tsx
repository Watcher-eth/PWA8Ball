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
  const [temporaryLike, setTemporaryLike] = useState(false);
  const [temporaryDislike, setTemporaryDislike] = useState(false);
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
  const handleLikePress = () => {
    setTemporaryLike(!temporaryLike);
    setTemporaryDislike(false);
  };

  const handleDislikePress = () => {
    setTemporaryDislike(!temporaryDislike);
    setTemporaryLike(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full"
    >
      <div className="flex flex-row w-full items-center justify-between mt-5">
        <Link
          className="cursor-pointer"
          href={getProfilePath(user2?.external_auth_provider_user_id)}
        >
          <div className="flex flex-row items-center">
            <UserPfpIcon pfp={user?.pfp} />
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <p className="text-[16.5px]  text-white">{user?.name}</p>
                {user2 && (
                  <p
                    className={`
                      text-[12px] font-[Aeonik-Bold] text-white
                      px-1.5 py-px rounded-[10px] overflow-hidden ml-1.5
                      ${
                        parseOption(user2?.option) === "No"
                          ? "bg-[#FF0050]"
                          : "bg-[#0050FF]"
                      }
                    `}
                  >
                    ${(user2?.amount / 10 ** 6).toFixed(2)}{" "}
                    {parseOption(user2?.option)}
                  </p>
                )}
              </div>

              <p className="text-[14.5px] text-[lightgray] mt-0">
                Replied {timeAgo(created_at ?? created_at)}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <p className="my-2 text-base text-white">{content}</p>
      <div className="flex flex-row items-center justify-between mb-1.5">
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
        <div className="flex flex-row items-center">
          <button
            onClick={handleLikePress}
            className={`
              bg-none border-none cursor-pointer
              flex items-center mr-2.5
            `}
          >
            <Heart
              size={19}
              strokeWidth={3}
              className={`
                transition-all duration-75
                ${
                  temporaryLike
                    ? "text-[#e32636] fill-[#e32636]"
                    : "text-white hover:text-[#e32636]"
                }
              `}
            />
          </button>
          <button
            onClick={handleDislikePress}
            className={`
              bg-none border-none cursor-pointer
              flex items-center
            `}
          >
            <ThumbsDown
              size={19}
              strokeWidth={3}
              className={`
                transition-all duration-75
                ${
                  temporaryDislike
                    ? "text-[#FF6700] fill-[#FF6700]"
                    : "text-white hover:text-[#FF6700]"
                }
              `}
            />
          </button>
        </div>
      </div>
      <div className="w-[calc(100%+48px)] self-center h-[0.35px] bg-[#303030] mt-3 mb-px z-20" />
    </motion.div>
  );
}


function UserPfpIcon({ pfp }: { pfp?: string }) {
  if (pfp?.length > 0) {
    return (
      <img
        src={pfp}
        alt="profile"
        className="size-12 rounded-[50%] overflow-hidden object-cover mr-1.5"
      />
    );
  } else {
    return (
      <UserCircle2Icon size={48} className="mr-1.5"/>
    );
  }

}