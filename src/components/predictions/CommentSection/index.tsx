// @ts-nocheck
import _ from "lodash"
import { useState } from "react";
import { useUserStore } from "@/lib/stores/UserStore";

import { BetComment } from "@/types/PostTypes";
import { IUserWithBet } from "@/supabase/types";
import { useGetAllCommentsForMarket } from "@/supabase/queries/useGetAllCommentsForMarket";

import { NewPlaceholderComment } from "@/components/common/placeholders/NewPlaceholders";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";

export function CommentSection({
  marketId,
  totalComments,
  users,
  isDesktop,
}: {
  marketId: string;
  totalComments: number;
  users: IUserWithBet[];
  isDesktop?: boolean;
}) {
  const { user } = useUserStore();

  const [optimisticComments, setOptimisticComments] = useState<BetComment[]>([])

  const {
    data: comments,
    error,
    isLoading,
    refetch, // Method to refetch the data
  } = useGetAllCommentsForMarket(
    marketId,
    user?.external_auth_provider_user_id
  );

  function findUserByExternalAuthId(externalAuthId: string) {
    return users?.find(
      (user) => user.external_auth_provider_user_id === externalAuthId
    );
  };

  const allComments = _.uniqBy(
    [...optimisticComments, ...(comments || [])],
    (comment) => comment.id
  );


  function addOptimisticComment(comment: BetComment) {
    setOptimisticComments([comment, ...optimisticComments]);
  }

  const handleComment = () => {};
  const setReply = () => {}
  if (allComments?.length < 1) {
    return (
      <NewPlaceholderComment isUser={true} isPost={false} onOpen={() => {}} />
    );
  }
  return (
    <div
      className={`
        flex flex-col
        ${isDesktop ? "px-3" : "p-5"}
        ${isDesktop ? "w-full" : "w-[96vw]"}
        pb-20`}
    >
      <p className="text-[21px] font-semibold  text-white mt-1 mb-2">
        {allComments.length} {allComments.length > 1 ? "comments" : "comment"}
      </p>
      <AddComment
        user={user}
        addOptimisticComment={addOptimisticComment}
      />
      <div>
        {allComments.map((item) => {
          const commentUser = findUserByExternalAuthId(item.created_by);

          return (
            <Comment
              key={item.id}
              {...item}
              setReply={setReply}
              handleComment={handleComment}
              user2={commentUser}
            />
          );
        })}
      </div>
    </div>
  );
};