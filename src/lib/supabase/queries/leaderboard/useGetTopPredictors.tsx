// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";

const fetchTopPredictors = async () => {
  const { data, error } = await supabase.rpc("fetch_top_predictors");

  if (error) {
    console.log(error.message);
  }
  return data;
};

export function useGetTopPredictors() {
  return useQuery({
    queryKey: ["topPredictors"],
    queryFn: fetchTopPredictors,
    staleTime: 5 * 60 * 1000, // Adjust based on how often you expect this data to change
  });
};
