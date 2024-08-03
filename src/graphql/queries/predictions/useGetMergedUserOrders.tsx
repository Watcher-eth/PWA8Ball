import { useGetMarketsWithTopicsByIds } from "../markets/useGetMarketsWithTopicsByIds";
import { useGetUserOrders } from "./useGetUserOrders";


export const useMergedOrdersData = (userAddress: string) => {
  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useGetUserOrders(userAddress);

  const marketIds = ordersData?.map((order) => order.marketId) || [];
  const { data: marketsData, error: marketsError } =
    useGetMarketsWithTopicsByIds(marketIds);

  const loading = ordersLoading;
  const error = ordersError || marketsError;

  const mergedData = ordersData?.map((order) => {
    const marketData = marketsData?.find(
      (market) => market.id === order.marketId
    );
    return {
      ...order,
      ...marketData,
    };
  });

  return { data: mergedData, loading, error };
};
