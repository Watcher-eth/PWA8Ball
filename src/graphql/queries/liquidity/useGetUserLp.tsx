//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USER_LP = gql`
  query UserLp($userAddress) {
    lps(where: { userAddress: $userAddress }) {
      items {
        amount
        id
        lpAmount
        userAddress
        marketId
        timestamp
        market {
          marketDetail {
            image
            title
            question
          }
          liquidityTotalSupply
          liquidityUSDC
        }
      }
    }
  }
`;

export function useGetUserLp(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_USER_LP, {
    variables: { userAddress },
  });

  return {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  };
}
