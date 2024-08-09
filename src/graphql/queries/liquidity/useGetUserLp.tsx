//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USER_LP = gql`
  query UserLp($userAddress: String) {
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
    enabled: Boolean(userAddress),
  });
  console.log("lpData", lpData);

  return {
    data: lpData?.items ?? [],
    loading: lpLoading,
    error: lpError,
  };
}
