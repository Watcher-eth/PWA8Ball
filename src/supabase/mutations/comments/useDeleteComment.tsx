// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IComment } from "../useCreateComment";

const deleteComment = async (commentId: string): Promise<IComment[] | null> => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .match({ id: commentId });

  if (error) {
    throw new Error(error.message);
  }
  return data; // Now returning data or null, consistent with Supabase's response
};


export function useDeleteComment() {
  return useMutation<IComment[] | null, Error, string>({
    mutationFn: deleteComment,
    onError: (error) => {
      console.log("Error Deleting Comment", error);
    },
    onSuccess: (data) => {
      console.log("Comment deleted successfully", data);
    },
  });
};
