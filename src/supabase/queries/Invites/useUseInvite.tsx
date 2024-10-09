// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const useInvite = async (inviteId: string, userId: string) => {
  const { data, error } = await supabase
    .from("invites")
    .update({
      status: "used",
      used_by: userId,
      updated_at: new Date(),
    })
    .eq("id", inviteId)
    .eq("status", "unused");

  if (error) {
    console.error("Error using invite:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useUseInvite = () => {
  return useMutation({
    mutationFn: ({ inviteId, userId }: { inviteId: string; userId: string }) =>
      useInvite(inviteId, userId),
    onError: (error: Error) => {
      console.error("Error using invite:", error);
    },
    onSuccess: () => {
      console.log("Successfully used invite");
    },
  });
};
