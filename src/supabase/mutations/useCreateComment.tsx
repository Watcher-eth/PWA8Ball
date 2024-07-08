// @ts-nocheck
import { useMutation } from "@tanstack/react-query";

import { supabase } from "@/supabase/supabaseClient";
export interface NewComment {
  market_id: number;
  content: string;
  created_by: string;
  created_at?: Date;
  topic_id: string;
  likes?: any; // Define the structure if you have a specific format
}

export interface IComment {
  market_id: number;
  content: string;
  created_by: string;
  created_at: Date;
  likes: any; // Again, adjust according to your schema
}


const createComment = async (newComment: NewComment): Promise<IComment> => {
  const { data, error } = await supabase
    .from<
    IComment>("comments")
    .insert([newComment])
    .single(); // Ensures that you're dealing with just one comment (the newly created one)

  if (error) {
    throw new Error(error.message);
  }
  return data;
};



export const useCreateComment = () => {
  return useMutation<IComment, Error, NewComment>({
    mutationFn: createComment,
    onError: (error) => {
      console.log("Error Add Comment", error);
    },
  });
};
