// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
import { Comment } from "./Comment";
import { BetComment } from "@/types/PostTypes";
import { useGetAllCommentsForMarket } from "@/lib/supabase/queries/getComments";
import { IUserWithBet } from "@/lib/supabase/queries/markets/getUsersForMarket";
import { NewPlaceholderComment } from "@/components/Common/Placeholders/NewPlaceholders";


export const CommentSection = ({
  marketId,
  totalComments,
  optimisticComments,
  users,
  handleComment,
  setReply,
}: {
  marketId: string;
  totalComments: number;
  optimisticComments: BetComment[];
  users: IUserWithBet[];
  handleComment: () => void;
  setReply: (name: string) => void;
}) => {
  const { user } = useUserStore();

  const {
    data: comments,
    error,
    isLoading,
    refetch, // Method to refetch the data
  } = useGetAllCommentsForMarket(
    marketId,
    user?.external_auth_provider_user_id
  );

  const findUserByExternalAuthId = (externalAuthId: string) => {
    return users.find(
      (user) => user.external_auth_provider_user_id === externalAuthId
    );
  };

  const allComments = React.useMemo(() => {
    const commentIds = new Set();
    const combinedComments = [...optimisticComments, ...(comments || [])];
    return combinedComments.filter((comment) => {
      if (commentIds.has(comment.id)) {
        return false;
      } else {
        commentIds.add(comment.id);
        return true;
      }
    });
  }, [comments, optimisticComments]);

  if (allComments?.length < 1) {
    return (
      <NewPlaceholderComment isUser={true} isPost={false} onOpen={() => {}} />
    );
  }

  return (
    <div
      className="w-[96vw] flex flex-col p-5 pb-[78px]"
    >
      <p
        className="text-[21px] font-[Aeonik-Bold] text-white mt-1 -mb-2"
      >
        {allComments.length} {allComments.length > 1 ? "comments" : "comment"}
      </p>
      <div>
        {allComments.map((item) => {
          let commentUser;

          if (users?.length > 0)
            commentUser = findUserByExternalAuthId(item.created_by);

          return (
            <Comment
              key={item.id}
              {...item}
              setReply={() => {}}
              handleComment={() => {}}
              hasPosition={!!commentUser}
              user2={commentUser}
            />
          );
        })}
      </div>
    </div>
  );
};
