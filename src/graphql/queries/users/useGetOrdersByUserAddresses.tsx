//@ts-nocheck

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_ORDERS_BY_USER_ADDRESSES = gql`
  query UserOrders(
    $userAddresses: [String!]
  ) {
    orders(where: { userAddress_in: $userAddresses }, limit: 1) {
      items {
        amount
        marketId
        option
        price
        timestamp
        tokensOwned
        market {
          id
          marketId
          question
          title
        }
        user {
          name
          pfp
          externalAuthProviderUserId
        }
      }
    }
  }
`;

export function useGetOrdersByUserAddresses(userAddresses: string[]) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_ORDERS_BY_USER_ADDRESSES, {
    variables: {
      userAddresses:
        userAddresses.length > 0
          ? userAddresses?.map(getChecksummedAddress)
          : ["0x870b7F3f229D08918d33F8b09766eaB412aBEebf"]
    },
  });

  return {
    orders: data?.orders?.items ?? [],
    loading,
    error,
  };
}
