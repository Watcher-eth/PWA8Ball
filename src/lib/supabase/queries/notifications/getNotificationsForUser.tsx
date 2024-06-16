import { supabase } from "../../supabaseClient";

const fetchNotificationsForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // Assuming you might want the newest notifications first

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

import { useQuery } from "@tanstack/react-query";

export const useGetNotificationsForUser = (userId: string) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotificationsForUser(userId),
    enabled: !!userId, // Ensures the query only runs when a userId is provided
  });
};
