// @ts-nocheck
import { supabase } from "@/supabase/supabaseClient";

async function updateLiquidityPoints(userId: string, pointsToAdd: number) {
  // Fetch current liquidity points
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("liquiditypoints")
    .eq("external_auth_provider_user_id", userId)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const currentLiquidityPoints = user?.liquiditypoints || 0;
  const newLiquidityPoints = currentLiquidityPoints + pointsToAdd;

  // Update the liquidity points
  const { data, error: updateError } = await supabase
    .from("users")
    .update({ liquiditypoints: newLiquidityPoints })
    .match({ external_auth_provider_user_id: userId })
    .single();

  if (updateError) {
    throw new Error(updateError.message);
  }

  return data;
};


export const useUpdateLiquidityPoints = () => {
  return { updateLiquidityPoints };
};
