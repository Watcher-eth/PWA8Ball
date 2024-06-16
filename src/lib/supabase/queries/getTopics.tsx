// useGetAllTopics.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { ITopic } from "../types";

const fetchAllTopics = async (): Promise<ITopic[]> => {
  const { data, error } = await supabase.from<ITopic>("topics").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const useGetAllTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: fetchAllTopics,
  });
};
