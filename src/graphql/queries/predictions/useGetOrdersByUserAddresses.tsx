//@ts-nocheck

import { gql } from "@/__generated__";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_ORDERS_BY_USER_ADDRESSES = gql(/* GraphQL */ `
  query FriendsOrders($userAddress_in: [String]!) {
    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {
      items {
        marketId
        option
        tokensOwned
        market {
          id
          initialProb
          marketId
          outcomeA
          outcomeB
          outcomeOddsA
          outcomeOddsB
          question
          title
          usdcStake
        }
        user {
          externalAuthProviderUserId
          name
          pfp
        }
      }
    }
  }
`);

export function useGetOrdersByUserAddresses(userAddresses: string[]) {
  const { data, loading, error } = useApolloQuery(
    GET_ORDERS_BY_USER_ADDRESSES,
    {
      variables: {
        userAddresses:
          userAddresses.length > 0
            ? userAddresses?.map(getChecksummedAddress)
            : ["0x870b7F3f229D08918d33F8b09766eaB412aBEebf"],
      },
    }
  );

  return {
    orders: data?.positions?.items ?? [],
    loading,
    error,
  };
}
