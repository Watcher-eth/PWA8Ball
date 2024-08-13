//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USER_ORDER_COUNT = gql`
  query UserOrderCount($userAddress: String = "") {
    positions(where: { userAddress: $userAddress }) {
      items {
        marketId
        amount
      }
    }
  }
`;

export function useGetUserOrderCount(userAddress: string) {
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useApolloQuery(GET_USER_ORDER_COUNT, {
    variables: { userAddress },
  });

  const orderCount = orderData?.orders?.items.length || 0;

  return {
    data: {
      count: orderCount,
      orders: orderData?.orders?.items || [],
    },
    loading: orderLoading,
    error: orderError,
  };
}
