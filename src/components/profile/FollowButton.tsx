// @ts-nocheck

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenBox, UserMinus, UserPlus, UserRoundPlus } from "lucide-react";
import { useFollowUser } from "@/supabase/mutations/follow/useFollowUser";
import { useUnfollowUser } from "@/supabase/mutations/follow/useUnfollowUser";
import { useUserStore } from "@/lib/stores/UserStore";
import { useCheckIfFollowing } from "@/supabase/queries/user/useCheckIfFollowing";


export const FollowButton = ({
  profileId,
  // isUser,
  setEdit,
  showToast,
}: {
  profileId: string;
  // isUser: boolean;
  setEdit: () => void;
  showToast?: () => void;
}) => {
  const { user } = useUserStore();
  const followerId = user?.external_auth_provider_user_id;
  const followingId = profileId;
  const { data: isFollowing2 } = useCheckIfFollowing(followerId!, followingId);

  const [isFollowing, setFollowing] = useState<boolean>(false);
  const [temporaryUnfollow, setTemporaryUnfollow] = useState<boolean>(false);

  const { mutate: followUser } = useFollowUser();
  const { mutate: unfollowUser } = useUnfollowUser();

  useEffect(() => {
    if (isFollowing2) {
      setFollowing(true);
    }
  }, [isFollowing2]);

  const handleFollow = () => {
    followUser({ followerId, followingId });
    setFollowing(true);
    showToast?.();
  };

  const handleUnfollow = () => {
    unfollowUser({ followerId, followingId });
    setFollowing(false);
    setTemporaryUnfollow(true);
  };

  const isUser = user?.external_auth_provider_user_id === profileId;
  if ((!isUser && !isFollowing && !isFollowing2) || temporaryUnfollow) {
    return (
      <FollowActionButton
        onClick={handleFollow}
        icon={<UserPlus color={"lightgray"} strokeWidth={3} height={15} />}
        label="Follow"
      />
    );
  }

  if ((!isUser && isFollowing) || (isFollowing2 && !temporaryUnfollow)) {
    return (
      <FollowActionButton
        onClick={handleUnfollow}
        label="Following"
      />
    );
  }

  if (isUser) {
    return (
      <FollowActionButton
        onClick={setEdit}
        icon={<PenBox color={"lightgray"} strokeWidth={3} height={14} />}
        label="Edit"
        className="!pl-1.5"
      />
    );
  }

  return null;
};


function FollowActionButton({
  label,
  icon,
  className,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={handleFollow}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex flex-row mt-2 px-3 bg-[#1B1B1E]
        rounded-2xl overflow-hidden items-center
        py-2 mb-2.5 ${className}
      `}
    >
      {icon}
      <div className="text-[14px] text-[lightgray] self-center font-semibold">
        {label}
      </div>
    </motion.button>
  );
}
