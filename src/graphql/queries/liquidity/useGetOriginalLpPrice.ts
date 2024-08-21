//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_LP_CHART_DATA = gql`
  query getLpPositionOriginalValueUSDC($userAddress: String!, $marketId: BigInt!) {
    lpTrades(where: { userAddress: $userAddress, marketId: $marketId }) {
      items {
        amountLp
        amountUsdc
        userAddress
      }
    }
  }
`;
export function useGetOriginalLpPrice(userAddress: string, marketId: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_LP_CHART_DATA, {
    variables: { userAddress, marketId },
  });

  return {
    data: lpData?.lpPositionValues?.items || [],
    loading: lpLoading,
    error: lpError,
  };
}
