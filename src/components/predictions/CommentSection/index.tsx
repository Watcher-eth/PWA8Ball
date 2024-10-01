// @ts-nocheck
import _ from "lodash"
import { useRef, useState } from "react"
import { useUserStore } from "@/lib/stores/UserStore"

import { BetComment } from "@/types/PostTypes"
import { IUserWithBet } from "@/supabase/types"

import { NewPlaceholderComment } from "@/components/common/placeholders/NewPlaceholders"
import { AddComment } from "./AddComment"
import { Comment, Outcome } from "./Comment"
import { useGetAllCommentsForMarket } from "@/supabase/queries/comments/getCommentsForMarket"
import { ArrowUpDown, ChevronDown } from "lucide-react"

export function findUserByExternalAuthId(externalAuthId: string, users) {
  if (users)
    return users?.find(
      (user) => user.external_auth_provider_user_id === externalAuthId
    )
}

export function CommentSection({
  marketId,
  totalComments,
  users,
  isDesktop,
  topic_id,
  options,
}: {
  marketId: string
  totalComments: number
  users: IUserWithBet[]
  isDesktop?: boolean
  topic_id: string
  options: Outcome[]
}) {
  const { user } = useUserStore()

  const [optimisticComments, setOptimisticComments] = useState<BetComment[]>([])
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const {
    data: comments,
    error,
    isLoading,
    refetch,
  } = useGetAllCommentsForMarket(Number(marketId), user?.walletAddress)

  const allComments = _.uniqBy(
    [...optimisticComments, ...(comments || [])],
    (comment) => comment.id
  )

  function addOptimisticComment(comment: BetComment) {
    setOptimisticComments([comment, ...optimisticComments])
  }

  const handleComment = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const setReply = (name: string) => {
    setReplyTo(name)
    handleComment()
  }

  return (
    <div
      className={`
        flex flex-col
        ${isDesktop ? "px-0" : "p-5"}
        ${isDesktop ? "w-full" : "w-full"}
        pb-20`}
    >
      <div className="flex flex-row items-center justify-between">
        <p className="text-lg flex items-center font-semibold  text-white mt-1 mb-2">
          <p>Comments</p>
          <p className="px-3 ml-1.5 text-[14px] font-medium -mb-[0.1rem] rounded-full border border-[#212121]">
            {" "}
            {allComments.length}{" "}
          </p>
        </p>
        <div className="flex flex-row items-center gap-1.5 -mb-0.5">
          <ArrowUpDown color="gray" strokeWidth={2.5} size={17} />
          <div className="text-[gray] text-base font-medium">Most recent</div>
          <ChevronDown color="gray" strokeWidth={2} size={17} />
        </div>
      </div>
      <AddComment
        id={marketId}
        topic_id={topic_id}
        user={user}
        inputRef={inputRef}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        addOptimisticComment={addOptimisticComment}
      />
      <div className="-mt-2 -mb-1.5">
        {allComments.length > 0 ? (
          allComments.map((item) => {
            const commentUser = findUserByExternalAuthId(item.created_by, users)

            return (
              <Comment
                options={options}
                key={item.id}
                {...item}
                marketId={marketId}
                setReply={setReply}
                isDesktop={isDesktop}
                handleComment={handleComment}
                user2={commentUser}
              />
            )
          })
        ) : (
          <NewPlaceholderComment
            isUser={true}
            isPost={false}
            onOpen={() => {}}
          />
        )}
      </div>
    </div>
  )
}
