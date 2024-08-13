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

  return data?.status === "used";
};

export function useCheckIfInviteUsed(inviteId: string) {
  return useQuery({
    queryKey: ["isInviteUsed", inviteId],
    queryFn: () => checkIfInviteUsed(inviteId),
    enabled: !!inviteId, // This query will only run if inviteId is truthy
    staleTime: 1000 * 60 * 5, // Optional: Adjust based on how frequently you expect invite statuses to change
  });
}
