// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabaseClient"; // Import your Supabase client

interface UpdateMarketOutcomeArgs {
  marketId: number;
  isResolved: boolean;
  outcome: string | null;
}

const updateMarketOutcome = async ({
  marketId,
  isResolved,
  outcome,
}: UpdateMarketOutcomeArgs) => {
  const { data, error } = await supabase
    .from("markets") // Assuming your table is named 'markets'
    .update({ isResolved, outcome }) // fields to update
    .eq("id", marketId) // where marketId matches
    .single(); // Assuming you're updating a single row

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUpdateMarketOutcome = () => {
  return useMutation({
    mutationFn: updateMarketOutcome,
  });
};
