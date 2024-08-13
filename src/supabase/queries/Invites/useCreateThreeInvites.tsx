// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const createInvites = async (userAddress: string) => {
  const invites = Array.from({ length: 3 }, () => ({
    created_by: userAddress,
  }));

  const { data, error } = await supabase.from("invites").insert(invites);

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateInvites = () => {
  return useMutation({
    mutationFn: createInvites,
    onError: (error: Error) => {
      console.error("Error creating invites:", error);
    },
    onSuccess: () => {
      console.log("Successfully created invites");
    },
  });
};
