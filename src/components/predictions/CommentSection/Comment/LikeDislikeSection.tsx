import { useState } from "react"

import { Heart, Reply, ThumbsDown } from "lucide-react"
import { CommentReactionButton } from "./CommentReactionButton"

export function LikeDislikeSection() {
  const [temporaryLike, setTemporaryLike] = useState(false)
  const [temporaryDislike, setTemporaryDislike] = useState(false)
  const handleLikePress = () => {
    setTemporaryLike(!temporaryLike)
    setTemporaryDislike(false)
  }

  const handleDislikePress = () => {
    setTemporaryDislike(!temporaryDislike)
    setTemporaryLike(false)
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
        onClick={handleDislikePress}
        IconComponent={Reply}
        className={
          temporaryDislike
            ? " text-blue-500"
            : "text-[lightgray] hover:text-[white]"
        }
      />
    </div>
  )
}
