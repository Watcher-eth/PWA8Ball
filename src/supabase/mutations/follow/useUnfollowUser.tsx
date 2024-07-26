// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";


async function unfollowUser({
  followerId,
  followingId
}: {
  followerId: string;
  followingId: string;
}) {
  const { error } = await supabase
    .from("user_follows")
    .match({ follower_id: followerId, following_id: followingId })
    .delete()

  if (error) throw new Error(error.message);
};

export const useUnfollowUser = () => {
  return useMutation({
    mutationFn: unfollowUser,
    onError: (error: Error) => {
      console.error("Error unfollowing user:", error);
    },
    onSuccess: () => {
      console.log("Successfully unfollowed user");
    },
  });
};
