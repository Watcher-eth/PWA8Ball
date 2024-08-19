//@ts-nocheck

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_USER_ORDER_COUNT = gql(/* GraphQL */ `
  query UserOrderCount($userAddress: String = "") {
    positions(where: { userAddress: $userAddress }) {
      items {
        marketId
        tokensOwned
      }
    }
  }
`);

export function useGetUserOrderCount(userAddress: string) {
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useApolloQuery(GET_USER_ORDER_COUNT, {
    variables: {
      userAddress: getChecksummedAddress(userAddress),
    },
  });

  const orderCount = orderData?.positions?.items.length || 0;

  return {
    data: {
      count: orderCount,
      orders: orderData?.positions?.items || [],
    },
    loading: orderLoading,
    error: orderError,
  };
}
