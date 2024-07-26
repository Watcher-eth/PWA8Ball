// @ts-nocheck
import _ from "lodash"

import { useUserStore } from "@/lib/stores/UserStore";
import { Comment } from "./Comment";
import { BetComment } from "@/types/PostTypes";
import { useGetAllCommentsForMarket } from "@/supabase/queries/useGetAllCommentsForMarket";
import { IUserWithBet } from "@/supabase/types";
import { NewPlaceholderComment } from "@/components/common/Placeholders/NewPlaceholders";
import { AddComment } from "./AddComment";

export const CommentSection = ({
  marketId,
  totalComments,
  optimisticComments,
  users,
  isDesktop,
  handleComment,
  setReply,
}: {
  marketId: string;
  totalComments: number;
  optimisticComments: BetComment[];
  users: IUserWithBet[];
  handleComment: () => void;
  isDesktop?: boolean;
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
    return users?.find(
      (user) => user.external_auth_provider_user_id === externalAuthId
    );
  };

  const allComments = _.uniqBy(
    [...optimisticComments, ...(comments || [])],
    (comment) => comment.id
  );

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
      <AddComment user={user} addOptimisticComment={handleComment} />
      <div>
        {allComments.map((item) => {
          const commentUser = findUserByExternalAuthId(item.created_by);

          return (
            <Comment
              key={item.id}
              {...item}
              setReply={() => {}}
              handleComment={() => {}}
              user2={commentUser}
            />
          );
        })}
      </div>
    </div>
  );
};
