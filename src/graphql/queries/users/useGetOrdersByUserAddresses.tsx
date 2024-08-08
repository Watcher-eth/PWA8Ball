//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_ORDERS_BY_USER_ADDRESSES = gql`
  query UserOrders(
    $userAddress: [String!] = ["0x870b7F3f229D08918d33F8b09766eaB412aBEebf"]
  ) {
    orders(where: { userAddress_in: $userAddress }, limit: 1) {
      items {
        amount
        marketId
        option
        price
        timestamp
        tokensOwned
        market {
          marketDetail {
            image
            question
            title
            id
          }
          id
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
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useApolloQuery(GET_ORDERS_BY_USER_ADDRESSES, {
    variables: { userAddress: userAddresses },
  });

  return {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  };
}
