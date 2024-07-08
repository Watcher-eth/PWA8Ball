// supabaseFunctions.js
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";



async function updateUSDCBalance({
  marketId,
  usdcBalance,
}: {
  marketId: number;
  usdcBalance: number; // New type and parameter for updating the USDC balance
}) {
  const { data, error } = await supabase
    .from("markets") // Assuming your table is named 'markets'
    .update({ USDC_Balance: usdcBalance }) // updating USDC_Balance
    .eq("id", marketId) // where marketId matches
    .single(); // Assuming you're updating a single row

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useUpdateUSDCBalance() {
  return useMutation({
    mutationFn: updateUSDCBalance,
  });
};
