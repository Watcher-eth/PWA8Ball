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
      <motion.button
        onClick={handleFollow}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 8,
          paddingRight: 12,
          paddingLeft: 12,
          backgroundColor: "#1B1B1E",
          borderRadius: 15,
          overflow: "hidden",
          alignItems: "center",
          padding: 7,
          marginBottom: 10,
        }}
      >
        <UserPlus color={"lightgray"} strokeWidth={3} height={15} />
        <div
          style={{
            fontSize: 14,
            color: "lightgray",
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          Follow
        </div>
      </motion.button>
    );
  }

  if ((!isUser && isFollowing) || (isFollowing2 && !temporaryUnfollow)) {
    return (
      <motion.button
        onClick={handleUnfollow}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 8,
          paddingRight: 12,
          paddingLeft: 12,
          backgroundColor: "white",
          borderRadius: 15,
          overflow: "hidden",
          alignItems: "center",
          padding: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#1B1B1E",
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          Following
        </div>
      </motion.button>
    );
  }

  if (isUser) {
    return (
      <motion.button
        onClick={setEdit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 8,
          paddingRight: 12,
          backgroundColor: "#1B1B1E",
          borderRadius: 15,
          overflow: "hidden",
          alignItems: "center",
          padding: 8,
          paddingLeft: 6,
          marginBottom: 10,
        }}
      >
        <PenBox color={"lightgray"} strokeWidth={3} height={14} />
        <div
          style={{
            fontSize: 14,
            color: "lightgray",
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          Edit
        </div>
      </motion.button>
    );
  }

  return null;
};
