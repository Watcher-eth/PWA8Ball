//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($sender: String!) {
    orders(where: { sender: $sender }) {
      items {
        amount
        marketId
        option
        price
        timestamp
        tokensOwned
      }
    }
  }
`;

const fetchMarketDetails = async (marketIds) => {
  const { data, error } = await supabase
    .from("markets")
    .select("id, title, question, image, options")
    .in("id", marketIds);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useGetOrdersByUser(sender: string) {
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useApolloQuery(GET_ORDERS_BY_USER, {
    variables: { sender },
  });

  const marketIds =
    orderData?.orders?.items?.map((order) => order.marketId) || [];

  const {
    data: marketData,
    isLoading: marketLoading,
    error: marketError,
  } = useReactQuery({
    queryKey: ["UserMarketOrders", marketIds],
    queryFn: () => fetchMarketDetails(marketIds),
    enabled: marketIds.length > 0, // This query will only run if marketIds array is not empty
  });

  const combinedData =
    orderData?.orders?.items.map((order) => ({
      ...order,
      market: marketData?.find((market) => market.id === order.marketId),
    })) || [];

  return {
    data: combinedData,
    loading: orderLoading || marketLoading,
    error: orderError || marketError,
  };
}
