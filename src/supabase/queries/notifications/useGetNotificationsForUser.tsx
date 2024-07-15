// @ts-nocheck

import { supabase } from "../../supabaseClient";

export interface IComment {
  id: string;
  content: string;
  created_by: string;
  created_at: string;
}

export interface IUser {
  name: string;
  pfp: string;
}

export interface INotification {
  id: string;
  user_id: string;
  head: string;
  message: string;
  status: string;
  created_at: string;
  type: string;
  reference_id?: string;
  triggeruser: IUser;
  comment?: IComment;
}

const fetchNotificationsForUser = async (
  userId: string
): Promise<INotification[]> => {
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `
      id,
      user_id,
      head,
      message,
      status,
      created_at,
      type,
      reference_id,
      triggeruser,
      users:triggeruser (
        name,
        pfp
      ),
      comment:reference_id (
        id,
        content,
        created_by,
        created_at
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  console.log("Fetched notifications data:", data); // Debugging statement

  return data as INotification[];
};
import { useQuery } from "@tanstack/react-query";

export const useGetNotificationsForUser = (userId: string) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotificationsForUser(userId),
    enabled: !!userId, // Ensures the query only runs when a userId is provided
  });
};
