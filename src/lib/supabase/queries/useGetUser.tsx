// useGetUser.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import { IUser } from "@/lib/supabase/types";

const fetchUser = async (userId: string): Promise<IUser> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("external_auth_provider_user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export function useGetUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
};
