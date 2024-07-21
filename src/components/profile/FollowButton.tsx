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
      <DisplayFollowButton
        onClick={handleFollow}
        IconComponent={UserPlus}
        label="Follow"
      />
    );
  }

  if ((!isUser && isFollowing) || (isFollowing2 && !temporaryUnfollow)) {
    return (
      <DisplayFollowButton
        onClick={handleUnfollow}
        IconComponent={UserMinus}
        label="Following"
        isDark={false}
      />
    );
  }

  if (isUser) {
    return (
      <DisplayFollowButton
        onClick={setEdit}
        IconComponent={PenBox}
        label="Edit"
      />
    );
  }

  return null;
};

function DisplayFollowButton({ onClick, IconComponent, label, isDark = true }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-row
        mt-2 mb-2.5 p-2 !px-3
        rounded-lg overflow-hidden items-center
        hover:scale-105 active:scale-95 transition-all
        ${isDark ? "bg-[#1B1B1E]" : "bg-white"}
      `}
    >
      {IconComponent && (
        <IconComponent
          color={isDark ? "lightgray" : "#1B1B1E"}
          strokeWidth={3}
          height={15}
        />
      )}
      <div
        className={`
        text-[14px] font-bold
        ${isDark ? "text-[lightgray]" : "text-[#1B1B1E]"} self-center`}
      >
        {label}
      </div>
    </button>
  );
}
