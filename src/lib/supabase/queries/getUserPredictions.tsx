// useGetPredictionsForUser.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { IPrediction } from "@/types/BetTypes";

// Extending IPrediction to include market data
interface IPredictionWithMarket extends IPrediction {
  market: {
    id: number;
    title: string;
    question: string;
    image?: string;
  };
}

const fetchPredictionsForUser = async (
  userId: string
): Promise<IPredictionWithMarket[]> => {
  const { data, error } = await supabase
    .from<IPredictionWithMarket>("predictions")
    .select(
      `
        *,
        market:markets (
          id,
          title,
          question,
          image
        )
      `
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};

export const useGetPredictionsForUser = (userId: string) => {
  return useQuery({
    queryKey: ["userPredictions", userId],
    queryFn: () => fetchPredictionsForUser(userId),
    enabled: !!userId, // This query will only run if userId is truthy
  });
};
