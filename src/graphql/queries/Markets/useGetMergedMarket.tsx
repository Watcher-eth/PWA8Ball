import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useOnchainMarketQuery } from "./path/to/your/graphql/hooks";
import { useGetMarketById } from "./fetchMarketWithTopicSupabase";

interface IMarketWithOnchainData extends IMarketWithTopic {
  outcomeA: number;
  outcomeB: number;
  usdcStake: number;
  liquidityUSDC: number;
}

export const useGetMergedMarket = (marketId: string, userId: string) => {
  const {
    data: onchainData,
    loading: onchainLoading,
    error: onchainError,
  } = useOnchainMarketQuery(Number(marketId));
  const {
    data: supabaseData,
    loading: supabaseLoading,
    error: supabaseError,
  } = useGetMarketById(marketId, userId);

  const loading = onchainLoading || supabaseLoading;
  const error = onchainError || supabaseError;

  const mergedData =
    supabaseData && onchainData ? { ...supabaseData, ...onchainData } : null;

  return { data: mergedData, loading, error };
};
