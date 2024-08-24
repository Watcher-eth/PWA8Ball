//@ts-nocheck

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USER_ORDER_COUNT = gql`
  query UserOrderCount($userAddress: String = "") {
    positions(where: { userAddress: $userAddress }) {
      items {
        marketId
        tokensOwned
      }
    }
  }
`;

export function useGetUserOrderCount(userAddress: string) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_USER_ORDER_COUNT, {
    variables: {
      userAddress: getChecksummedAddress(userAddress),
    },
  });

  const orders = data?.positions?.items ?? []

  return {
    data: {
      count: orders.length,
      orders: orders,
    },
    loading,
    error,
  };
}
