import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";

interface UnfollowUserData {
  followerId: string;
  followingId: string;
}

const unfollowUser = async (unfollowData: UnfollowUserData) => {
  const { followerId, followingId } = unfollowData;
  const { error } = await supabase
    .from("user_follows")
    .delete()
    .match({ follower_id: followerId, following_id: followingId });

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
