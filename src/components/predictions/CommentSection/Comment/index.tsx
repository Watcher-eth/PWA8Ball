import { motion } from "framer-motion";
import type { BetComment } from "@/types/PostTypes";
import { useDeleteComment } from "@/supabase/mutations/comments/useDeleteComment";
import { CommentHeader } from "./CommentHeader";
import { LikeDislikeSection } from "./LikeDislikeSection";
import { useGetUserPositionsForMarket } from "@/graphql/queries/positions/useGetUserPositionsForMarket";
import { User } from "@/__generated__/graphql";

export interface Outcome {
  name: string;
  value: number;
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
  firstReply,
  replies,
}: BetComment & {
  created_at: string;
  setReply: (name: string) => void;
  handleComment: () => void;
  user2: User;
  isDesktop?: boolean;
  marketId?: number;
  options: Outcome[];
  firstReply?: BetComment; // New prop for the first reply
  replies: any[];
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

  const { data: userOwns } = useGetUserPositionsForMarket(
    user?.walletAddress,
    marketId
  );

  const { data: replierOwns } = useGetUserPositionsForMarket(
    firstReply?.created_by,
    marketId
  );

  const filteredUserOwns =
    userOwns?.filter((item) => item.tokensOwned > 0) || [];

  const filteredReplyUserOwns =
    replierOwns?.filter((item) => item.tokensOwned > 0) || [];

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
      <p className=" ml-[3.8rem] -mt-6 font-[300] text-white text-base ">
        {content}
      </p>
      <div className="flex flex-row items-center justify-between mb-1.5 ">
        <button
          onClick={() => {
            console.log("setting reply", user?.name ?? name);
            setReply(user?.name ?? name);
            handleComment();
          }}
          className={`
            text-sm text-white/60 mt-1 ml-[3.8rem] hover:text-white/80 rounded-full
            ring-1 ring-transparent hover:scale-101
            bg-none border-none cursor-pointer
          `}
        >
          {replies.length < 1
            ? "Reply"
            : `${replies.length} ${replies.length < 1 ? "Replies" : "Reply"}`}
        </button>
        <LikeDislikeSection
          setReply={setReply}
          handleComment={handleComment}
          user={user}
          name={name}
        />
      </div>

      {firstReply && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col w-9/10 mt-5 mb-3 md:my-4 pt-0 border-l border-[#212121] pl-6 md:pl-8 ml-0.5  md:ml-[3.8rem]"
        >
          <CommentHeader
            userOwns={filteredReplyUserOwns}
            options={options}
            user={firstReply.user}
            user2={firstReply.user2}
            created_at={firstReply.created_at} //
          />
          <p className="ml-[3.8rem] -mt-6 font-[300] text-white text-base ">
            {firstReply.content}
          </p>
          <div className="flex flex-row items-center justify-between mb-1.5 ">
            <button
              onClick={() => {
                setReply(firstReply.user?.name ?? firstReply.name);
                handleComment();
              }}
              className={`
              text-sm text-white/60 mt-1 ml-[3.8rem] hover:text-white/80 rounded-full
              ring-1 ring-transparent hover:scale-101
              bg-none border-none cursor-pointer
            `}
            >
              Reply
            </button>
            <LikeDislikeSection
              setReply={setReply}
              handleComment={handleComment}
              user={firstReply.user}
              name={firstReply.name}
            />
          </div>

          {/* Show link to see all replies */}
          {replies.length > 1 && (
            <div
              className="text-sm text-white/60 hover:text-white/80 rounded-full
               hover:scale-[100.1%] bg-none border-none cursor-pointer my-1.5"
            >
              See all {replies.length} replies
            </div>
          )}
        </motion.div>
      )}

      {!isDesktop && (
        <div className="w-full self-center h-0 border-[0.1px] border-[#171717] mt-3 z-0" />
      )}
    </motion.div>
  );
}
