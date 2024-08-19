// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const checkIfInviteUsed = async (inviteId: string) => {
  const { data, error } = await supabase
    .from("invites")
    .select("status")
    .eq("id", inviteId)
    .single();

  if (error) {
    console.error("Error checking if invite is used:", error.message);
    throw new Error(error.message);
  }

  return data?.status === "unused";
};

export function useCheckIfInviteUsed(inviteId: string) {
  return useQuery({
    queryKey: ["isInviteUsed", inviteId],
    queryFn: () => checkIfInviteUsed(inviteId),
    enabled: !!inviteId, // This query will only run if inviteId is truthy
  });
}
