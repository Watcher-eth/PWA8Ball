import { useGetMarketDetailsById } from "./useGetMarketDetailsById";
import { useGetOnchainMarket } from "./useGetOnchainMarket";

export const useMergedMarketData = (marketId: string) => {
  const {
    data: marketDetails,
    isLoading: marketDetailsLoading,
    error: marketDetailsError,
  } = useGetMarketDetailsById(marketId);

  const {
    data: onchainMarket,
    loading: onchainMarketLoading,
    error: onchainMarketError,
  } = useGetOnchainMarket(parseInt(marketId));

  const mergedData =
    marketDetails && onchainMarket ? { ...marketDetails, onchainMarket } : null;

  return {
    data: mergedData,
    loading: marketDetailsLoading || onchainMarketLoading,
    error: marketDetailsError || onchainMarketError,
  };
};
