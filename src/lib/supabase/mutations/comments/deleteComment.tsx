// @ts-nocheck

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

// useDeleteComment.ts
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../supabaseClient";
import { IComment } from "../addComment";
export const useDeleteComment = () => {
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
