// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

async function fetchNotificationsForUser(userId: string) {
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



export function useGetNotificationsForUser(userId: string) {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotificationsForUser(userId),
    enabled: !!userId, // Ensures the query only runs when a userId is provided
  });
};
