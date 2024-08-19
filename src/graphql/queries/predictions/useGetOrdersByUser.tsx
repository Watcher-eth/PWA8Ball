import { useQuery as useApolloQuery } from "@apollo/client";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { gql } from "@/__generated__";

const GET_ORDERS_BY_USER = gql(/* GraphQL */ `
  query GetOrdersByUser($userAddress: String) {
    positions(where: { userAddress: $userAddress }, limit: 1) {
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

export function useGetOrdersByUser(userAddress: string) {
  const { data, loading, error } = useApolloQuery(GET_ORDERS_BY_USER, {
    variables: {
      userAddress: getChecksummedAddress(userAddress),
    },
    skip: !Boolean(userAddress),
  });

  console.log("orderData", {
    shown: !Boolean(userAddress),
    data,
    loading,
    error,
  });

  return {
    orders: data?.positions?.items,
    loading,
    error,
  };
}
