// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ThumbsDown } from "lucide-react";
import { useRouter } from "next/router";
import { BetComment } from "@/types/PostTypes";
import { timeAgo } from "@/utils/datetime/timeAgo";
import { parseOption } from "@/utils/predictions/parseOption";
import { useDeleteComment } from "@/supabase/mutations/comments/useDeleteComment";
import Link from "next/link";

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
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Link
          href={`/profile?id=${props.user2?.external_auth_provider_user_id}`}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={props?.user?.pfp}
              alt="profile"
              style={{
                height: 49,
                width: 49,
                objectFit: "cover",
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: 6,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 16.5,
                    color: "white",
                    fontFamily: "Aeonik-Bold",
                  }}
                >
                  {props?.user?.name}
                </p>
                {props?.hasPosition === true && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "white",
                      fontFamily: "Aeonik-Bold",
                      padding: "1px 6px",
                      backgroundColor:
                        parseOption(props?.user2?.option) === "No"
                          ? "#FF0050"
                          : "#0050FF",
                      borderRadius: 10,
                      overflow: "hidden",
                      marginLeft: 7,
                    }}
                  >
                    ${(props?.user2?.amount / 10 ** 6).toFixed(2)}{" "}
                    {parseOption(props?.user2?.option)}
                  </p>
                )}
              </div>

              <p
                style={{
                  fontSize: 14.5,
                  marginTop: 2,
                  color: "lightgray",
                }}
              >
                Replied{" "}
                {timeAgo(props.created_at ? props.created_at : props.date)}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <p
        style={{
          marginTop: 8,
          marginBottom: 8,
          fontSize: 17,
          color: "white",
        }}
      >
        {props.content}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <button
          onClick={() => {
            props.setReply(props.user ? props.user.name : props.name);
            props.handleComment();
          }}
          style={{
            fontSize: 15,
            color: "#DDDDDD",
            fontFamily: "Aeonik-Bold",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reply
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <button
            onClick={handleLikePress}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginRight: 10,
            }}
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
        style={{
          width: "110%",
          alignSelf: "center",
          height: 0.35,
          backgroundColor: "#303030",
          marginTop: 7,
          marginBottom: 1,
          zIndex: 20,
        }}
      />
    </motion.div>
  );
};
