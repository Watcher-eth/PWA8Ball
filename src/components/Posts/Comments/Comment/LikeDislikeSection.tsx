import { useState } from "react";

import { Heart, ThumbsDown } from "lucide-react";


export function LikeDislikeSection() {
  const [temporaryLike, setTemporaryLike] = useState(false);
  const [temporaryDislike, setTemporaryDislike] = useState(false);
  const handleLikePress = () => {
    setTemporaryLike(!temporaryLike);
    setTemporaryDislike(false);
  };

  const handleDislikePress = () => {
    setTemporaryDislike(!temporaryDislike);
    setTemporaryLike(false);
  };

  return (
    <div className="flex flex-row items-center space-x-2.5">
      <CommentReactionButton
        onClick={handleLikePress}
        IconComponent={Heart}
        className={
          temporaryLike
            ? "text-[#e32636] fill-[#e32636]"
            : "text-white hover:text-[#e32636]"
        }
      />
      <CommentReactionButton
        onClick={handleDislikePress}
        IconComponent={ThumbsDown}
        className={
          temporaryDislike
            ? "text-[#FF6700] fill-[#FF6700]"
            : "text-white hover:text-[#FF6700]"
        }
      />
    </div>
  );
}

function CommentReactionButton({
  onClick,
  IconComponent,
  className,
}: {
  onClick: () => void;
  IconComponent: React.FC<any>;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-none border-none cursor-pointer
        flex items-center
      `}
    >
      <IconComponent
        size={19}
        strokeWidth={3}
        className={`
          transition-all duration-75
          ${className}
        `}
      />
    </button>
  );
}
