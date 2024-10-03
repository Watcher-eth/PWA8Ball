import { useState } from "react"

import { Heart, Reply, ThumbsDown } from "lucide-react"
import { CommentReactionButton } from "./CommentReactionButton"

export function LikeDislikeSection({
  setReply,
  handleComment,
  user,
  name,
}: {
  setReply: (name: string) => void
  handleComment: () => void
  user: any
  name: string
}) {
  const [temporaryLike, setTemporaryLike] = useState(false)
  const [temporaryDislike, setTemporaryDislike] = useState(false)
  const handleLikePress = () => {
    setTemporaryLike(!temporaryLike)
    setTemporaryDislike(false)
  }

  const handleReplyPress = () => {
    setTemporaryDislike(!temporaryDislike)
    setTemporaryLike(false)
    setReply(user?.name ?? name)
    handleComment()
  }

  return (
    <div className="flex flex-row items-center space-x-2.5">
      <CommentReactionButton
        onClick={handleLikePress}
        IconComponent={Heart}
        className={
          temporaryLike
            ? "text-[#e32636] hover:scale-102 active:scale-99 fill-[#e32636]"
            : "text-[lightgray] hover:scale-104 active:scale-99 hover:text-[#FF474D]/50 hover:fill-[#FF474D]/60"
        }
      />
      <CommentReactionButton
        onClick={handleReplyPress}
        IconComponent={Reply}
        className={
          temporaryDislike
            ? " text-white hover:scale-101 active:scale-99 shadow-md "
            : "text-[lightgray] hover:scale-101 active:scale-99 hover:text-[white]"
        }
      />
    </div>
  )
}
