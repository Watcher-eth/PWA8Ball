// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { IComment } from "../useCreateComment";

async function deleteComment(commentId: string): Promise<IComment[] | null> {
  const { data, error } = await supabase
    .from("comments")
    .match({ id: commentId })
    .delete()


  if (error) {
    throw new Error(error.message);
  }
  return data; 
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
