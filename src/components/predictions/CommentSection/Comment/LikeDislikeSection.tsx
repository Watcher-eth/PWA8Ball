import { useState } from "react"

import { Heart, Reply, ThumbsDown } from "lucide-react"
import { CommentReactionButton } from "./CommentReactionButton"

export function LikeDislikeSection(props: {
  setReply: (name: string) => void
  handleComment: () => void
  user: any
  name: string
}) {
  const { setReply, handleComment, user, name } = props
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
            ? "text-[#e32636] fill-[#e32636]"
            : "text-[lightgray] hover:fill-[lightgray]"
        }
      />
      <CommentReactionButton
        onClick={handleReplyPress}
        IconComponent={Reply}
        className={
          temporaryDislike
            ? " text-white shadow-md "
            : "text-[lightgray] hover:text-[white]"
        }
      />
    </div>
  )
}
