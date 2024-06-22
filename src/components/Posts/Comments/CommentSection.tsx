import React from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
import Comment from "./Comment";
import { BetComment } from "@/types/PostTypes";
import { useGetAllCommentsForMarket } from "@/lib/supabase/queries/getComments";
import { IUserWithBet } from "@/lib/supabase/queries/markets/getUsersForMarket";
import { NewPlaceholderComment } from "@/components/Common/Placeholders/NewPlaceholders";

interface CommentSectionProps {
  handleComment: () => void;
  setReply: (name: string) => void;
  totalComments: number;
  optimisticComments: BetComment[];
  marketId: string;
  users: IUserWithBet[];
}

const CommentSection: React.FC<CommentSectionProps> = (
  props: CommentSectionProps
) => {
  const {
    data: comments,
    error,
    isLoading,
    refetch,
  } = useGetAllCommentsForMarket(Number(props?.marketId));
  const { user } = useUserStore();

  const findUserByExternalAuthId = (externalAuthId: string) => {
    return props.users.find(
      (user) => user.external_auth_provider_user_id === externalAuthId
    );
  };

  const allComments = React.useMemo(() => {
    const commentIds = new Set();
    const combinedComments = [
      ...props?.optimisticComments,
      ...(comments || []),
    ];
    return combinedComments.filter((comment) => {
      if (commentIds.has(comment.id)) {
        return false;
      } else {
        commentIds.add(comment.id);
        return true;
      }
    });
  }, [comments, props?.optimisticComments]);

  if (allComments?.length < 1) {
    return (
      <NewPlaceholderComment isUser={true} isPost={false} onOpen={() => {}} />
    );
  }

  return (
    <div
      style={{
        width: "96vw",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        paddingBottom: 78,
      }}
    >
      <p
        style={{
          fontSize: 21,
          fontFamily: "Aeonik-Bold",
          color: "white",
          marginTop: 4,
          marginBottom: -8,
        }}
      >
        {allComments.length} {allComments.length > 1 ? "comments" : "comment"}
      </p>
      <div>
        {allComments.map((item) => {
          let commentUser;

          if (props?.users?.length > 0)
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

export default CommentSection;
