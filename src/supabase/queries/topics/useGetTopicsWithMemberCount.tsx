import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { toast } from "sonner";

interface ITopicWithMembers {
  id: string;
  title: string;
  description: string;
  image: string | null;
  members_count: number;
}

export async function fetchTopicsWithMembers(
  ids: string[]
): Promise<ITopicWithMembers[]> {
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("topics")
    .select(
      ` id,
        title,
        description,
        image
      `
    )
    .in("id", ids);

  if (error) {
    toast.error(error.message);
    return [];
  }

  return data as ITopicWithMembers[];
}

export const useGetTopicsWithMembers = (ids: string[]) => {
  return useQuery({
    queryKey: ["topicsWithMembers", ids],
    queryFn: () => fetchTopicsWithMembers(ids),
    enabled: ids.length > 0,
  });
};
