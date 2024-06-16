// useCreatePrediction.ts
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { NewPrediction } from "@/types/BetTypes";

export const createPrediction = async (
  predictionData: NewPrediction
): Promise<NewPrediction> => {
  const { data, error } = await supabase
    .from<NewPrediction>("predictions") // Adjust the table name to "predictions"
    .insert([predictionData])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreatePrediction = () => {
  return useMutation({
    mutationFn: createPrediction,
  });
};
