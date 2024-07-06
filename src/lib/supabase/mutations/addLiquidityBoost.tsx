// @ts-nocheck

import { supabase } from "@/lib/supabase/supabaseClient";

interface UserBoost {
  user_id: string;
  market_id: number;
  amount_added: number;
}

export async function addLiquidityBoost(newBoost: UserBoost): Promise<UserBoost> {
  const { data, error } = await supabase
    .from<UserBoost>("user_boosts")
    .insert([newBoost])
    .single(); // Ensures that you're dealing with just one record (the newly created one)

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
