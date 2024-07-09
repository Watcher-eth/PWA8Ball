// @ts-nocheck

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ThumbsDown } from "lucide-react";

import { BetComment } from "@/types/PostTypes";
import { timeAgo } from "@/utils/datetime/timeAgo";
import { parseOption } from "@/utils/predictions/parseOption";
import { getProfilePath } from "@/utils/urls";
import { useDeleteComment } from "@/supabase/mutations/comments/useDeleteComment";



interface CommentProps extends BetComment {
  setReply: (name: string) => void;
  handleComment: () => void;
  hasPosition: boolean;
  user2: any; // Define the proper type for user2 if possible
}

export const Comment: React.FC<CommentProps> = (props) => {
  const { mutate: deleteComment } = useDeleteComment();
  const [temporaryLike, setTemporaryLike] = useState(false);
  const [temporaryDislike, setTemporaryDislike] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    deleteComment(props.id, {
      onSuccess: (data) => {
        console.log("Deletion successful, deleted data:", data);
      },
      onError: (error) => {
        console.error("Failed to delete comment:", error);
      },
    });
  };

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
      <div
        className="flex flex-row w-full items-center justify-between mt-5"
      >
        <Link
          className="cursor-pointer"
          href={getProfilePath(props.user2?.external_auth_provider_user_id)}
        >
          <div className="flex flex-row items-center">
            <img
              src={props?.user?.pfp}
              alt="profile"
              className="size-12 rounded-[50%] overflow-hidden object-cover mr-1.5"
            />
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <p className="text-[16.5px] font-[Aeonik-Bold] text-white">
                  {props?.user?.name}
                </p>
                {props?.hasPosition === true && (
                  <p
                    className={`
                      text-[12px] font-[Aeonik-Bold] text-white
                      px-1.5 py-px rounded-[10px] overflow-hidden ml-1.5
                      ${
                        parseOption(props?.user2?.option) === "No"
                          ? "bg-[#FF0050]"
                          : "bg-[#0050FF]"
                      }
                    `}
                  >
                    ${(props?.user2?.amount / 10 ** 6).toFixed(2)}{" "}
                    {parseOption(props?.user2?.option)}
                  </p>
                )}
              </div>

              <p className="text-[14.5px] text-lightgray mt-2">
                Replied{" "}
                {timeAgo(props.created_at ? props.created_at : props.date)}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <p className="my-2 text-[17px] text-white">
        {props.content}
      </p>
      <div className="flex flex-row items-center justify-between mb-2">
        <button
          onClick={() => {
            props.setReply(props.user ? props.user.name : props.name);
            props.handleComment();
          }}
          className={`
            text-[15px] font-[Aeonik-Bold] text-[#DDDDDD]
            bg-none border-none cursor-pointer
          `}
        >
          Reply
        </button>
        <div
          className="flex flex-row items-center mb-1.5"
        >
          <button
            onClick={handleLikePress}
            className={`
              bg-none border-none cursor-pointer
              flex items-center mr-2.5
            `}
          >
            <Heart
              fill={temporaryLike ? "#e32636" : "transparent"}
              color={temporaryLike ? "#e32636" : "white"}
              size={19}
              strokeWidth={3}
            />
          </button>
          <button
            onClick={handleDislikePress}
            className={`
              bg-none border-none cursor-pointer
              flex items-center
            `}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ThumbsDown
              fill={temporaryDislike ? "#FF6700" : "transparent"}
              color={temporaryDislike ? "#FF6700" : "white"}
              size={19}
              strokeWidth={3}
            />
          </button>
        </div>
      </div>
      <div
        className="w-[110%] self-center h-[0.35px] bg-[#303030] mt-1.5 mb-px z-20"
      />
    </motion.div>
  );
};
