// @ts-nocheck
import { useUpsertUser } from "@/graphql/queries/users/useUpsertUser";
import { GRAPH_ENDPOINT_DEV_URL } from "@/providers/GraphQlProvider";
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

  const { upsertUser } = useUpsertUser();

  const response = await fetch(`${GRAPH_ENDPOINT_DEV_URL}/user/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: serialize({ id: userAddress, liquiditypoints: newLiquidityPoints }), //JSON.stringify(userData),
  });

  

  if (updateError) {
    throw new Error(updateError.message);
  }

  return data;
}

export const useUpdateLiquidityPoints = () => {
  return { updateLiquidityPoints };
};
