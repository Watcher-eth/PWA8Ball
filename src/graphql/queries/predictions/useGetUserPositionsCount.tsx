//@ts-nocheck

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USER_POSITION_COUNT = gql`
  query UserOrderCount($userAddress: String = "") {
    positions(where: { userAddress: $userAddress }) {
      items {
        marketId
        tokensOwned
      }
    }
  }
`;

export function useGetUserPositionsCount(userAddress: string) {
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
