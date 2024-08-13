// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const useInvite = async (inviteId: string) => {
  const { data, error } = await supabase
    .from("invites")
    .update({ status: "used", updated_at: new Date().toISOString() })
    .eq("id", inviteId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useUseInvite = () => {
  return useMutation({
    mutationFn: useInvite,
    onError: (error: Error) => {
      console.error("Error using invite:", error);
    },
    onSuccess: () => {
      console.log("Successfully used invite");
    },
  });
};
