import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const fetchUserInvites = async (userAddress: string) => {
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("created_by", userAddress);

  if (error) {
    console.error("Error fetching invites:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export function useGetUserInvites(userAddress: string) {
  return useQuery({
    queryKey: ["userInvites", userAddress],
    queryFn: () => fetchUserInvites(userAddress),
    enabled: !!userAddress,
  });
}
