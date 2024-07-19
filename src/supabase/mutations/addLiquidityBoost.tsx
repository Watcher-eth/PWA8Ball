// @ts-nocheck
import { supabase } from "@/supabase/supabaseClient";
import { useUpdateLiquidityPoints } from "./user/useUpdateUserLiquidityPoints";

interface UserBoost {
  user_id: string;
  market_id: number;
  amount_added: number;
}

export async function addLiquidityBoost(
  newBoost: UserBoost
): Promise<UserBoost> {
  const { updateLiquidityPoints } = useUpdateLiquidityPoints();

  const { data: boostData, error: boostError } = await supabase
    .from<UserBoost>("user_boosts")
    .insert([newBoost])
    .single();

  if (boostError) {
    throw new Error(boostError.message);
  }

  const pointsToAdd = (newBoost.amount_added / 10 ** 6) * 2;

  await updateLiquidityPoints(newBoost.user_id, pointsToAdd);

  return boostData;
}
