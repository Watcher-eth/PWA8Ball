// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { NewMarket } from "@/supabase/types";
import {
  EightBallStorageAddress,
  EightballStorageV1ABI,
} from "../contracts/EightballStorage";
import { rpcClient } from "@/lib/onchain/rpcClient";

export const createMarket = async (
  marketData: Omit<NewMarket, "id" | "pair" | "options">
): Promise<NewMarket> => {
  // Fetch currentPairId
  const currentPairId = await rpcClient.readContract({
    address: EightBallStorageAddress,
    abi: EightballStorageV1ABI,
    functionName: "currentPairId",
  });

  console.log("currentPair", currentPairId - 1n);

  // Fetch marketPair using currentPairId
  const marketPair = await rpcClient.readContract({
    address: EightBallStorageAddress,
    abi: EightballStorageV1ABI,
    args: [currentPairId - 1n],
    functionName: "getMarketPair",
  });

  // Prepare the market data for insertion
  const newMarketData: NewMarket = {
    ...marketData,
    id: Number(currentPairId) - 1,
    pair: marketPair.liquidityPool,
    options: marketData.options.map((option, index) => ({
      name: option,
      address: index === 0 ? marketPair.yesToken : marketPair.noToken,
    })),
  };

  // Insert the market data into Supabase
  const { data, error } = await supabase
    .from<NewMarket>("markets")
    .insert([newMarketData])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateMarket = () => {
  return useMutation({
    mutationFn: createMarket,
    onError: (error) => {
      console.log("Error Create Market", error);
    },
  });
};
