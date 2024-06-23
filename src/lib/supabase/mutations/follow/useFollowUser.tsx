// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

interface FollowUserData {
  followerId: string;
  followingId: string;
}

const followUser = async (followData: FollowUserData) => {
  const { followerId, followingId } = followData;
  const { data, error } = await supabase
    .from("user_follows")
    .insert([{ follower_id: followerId, following_id: followingId }])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useFollowUser = () => {
  return useMutation({
    mutationFn: followUser,
    onError: (error: Error) => {
      console.error("Error following user:", error);
    },
    onSuccess: () => {
      console.log("Successfully followed user");
    },
  });
};
