import { supabase } from "@/supabase/supabaseClient";
import { useMutation } from "@tanstack/react-query";

export interface NewComment {
  market_id: number;
  content: string;
  created_by: string;
  created_at?: Date;
  topic_id: string;
  parent_id?: string | null; // New field to handle replies (null for regular comments)
  likes?: any; // Define the structure if you have a specific format
}

export interface IComment {
  id: string;
  market_id: number;
  content: string;
  created_by: string;
  created_at: Date;
  likes: any; // Adjust according to your schema
  parent_id?: string | null; // New field to handle replies
}

export async function createComment(newComment: NewComment): Promise<IComment> {
  const { data, error } = await supabase
    .from("comments")
    .insert([newComment])
    .single(); // Ensures that you're dealing with just one comment (the newly created one)

  if (error) {
    throw new Error(error.message);
  }

  // If the new comment is a reply, add a notification for the user being replied to
  if (newComment.parent_id) {
    const { data: parentCommentData, error: parentCommentError } =
      await supabase
        .from("comments")
        .select("created_by")
        .eq("id", newComment.parent_id)
        .single();

    if (parentCommentError) {
      throw new Error(parentCommentError.message);
    }

    const notification = {
      user_id: parentCommentData.created_by,
      head: "replied to you",
      message: newComment.content,
      status: "unread",
      created_at: new Date(),
      type: "reply",
    };

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert([notification]);

    if (notificationError) {
      throw new Error(notificationError.message);
    }
  }

  return data;
}

// useCreateComment.ts

export const useCreateComment = () => {
  return useMutation<IComment, Error, NewComment>({
    mutationFn: createComment,
    onError: (error) => {
      console.log("Error Adding Comment", error);
    },
    onSuccess: (data) => {
      console.log("Comment added successfully", data);
    },
  });
};
