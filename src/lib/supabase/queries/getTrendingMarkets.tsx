import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { IMarket } from "../types";
import { rpcClient } from "@/lib/onchain/Viem";
import {
  EightBallAddress,
  EightballV1ABI,
} from "@/lib/onchain/contracts/Eightball";
export interface IMarketWithTopicDetails extends IMarket {
  // Extend your IMarket interface with additional properties that your function returns
  usdcStake: number;
  liquidityUSDC: number;
  outcomeA: number;
  outcomeB: number;
  topic_id: string; // Assuming these are returned by your SQL function
  topic_title: string;
  topic_description: string;
  topic_image: string;
}

const fetchTrendingMarkets = async (): Promise<IMarketWithTopicDetails[]> => {
  const { data, error } = await supabase.rpc("get_trending_markets");

  if (error) {
    console.error("Fetch Trending Markets Error:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useGetTrendingMarkets = () => {
  return useQuery({
    queryKey: ["trendingMarkets"],
    queryFn: fetchTrendingMarkets,
    enabled: true, // This query will run by default
  });
};
