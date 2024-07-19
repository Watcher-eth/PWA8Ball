// @ts-nocheck
import { supabase } from "@/supabase/supabaseClient";
import { useUpdateLiquidityPoints } from "@/hooks/useUpdateLiquidityPoints";

interface User {
  liquiditypoints: number;
}

interface Prediction {
  id: string;
  user_id: string;
  market_id: number;
  amount: number;
  option: string;
  multiplier: number;
}

interface ManagePredictionResult {
  prediction: Prediction;
  updatedUser: User;
}

export const useUserPrediction = () => {
  const { updateLiquidityPoints } = useUpdateLiquidityPoints();

  const managePrediction = async (
    userId: string,
    marketId: number,
    amount: number,
    option: string,
    multiplier: number = 2.2
  ): Promise<ManagePredictionResult> => {
    try {
      const { data: prediction, error: predictionError } = await supabase
        .from("predictions")
        .insert({
          user_id: userId,
          market_id: marketId,
          amount,
          option,
          multiplier,
        })
        .single();

      if (predictionError) {
        throw new Error(predictionError.message);
      }

      const pointsToAdd = (amount / 10 ** 6) * 2;

      const updatedUser = await updateLiquidityPoints(userId, pointsToAdd);

      return { prediction, updatedUser };
    } catch (error) {
      throw error;
    }
  };

  return { managePrediction };
};
