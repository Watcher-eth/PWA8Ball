//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_LP_CHART_DATA = gql`
  query getLpPositionsData($userAddress: String!) {
    lpPositionInfos(where: { userAddress: $userAddress }) {
      items {
        amountLp
        amountUsdc
        marketId
        id
        timestamp
        userAddress
      }
    }
  }
`;
export function useGetLpPositionsByUser(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_LP_CHART_DATA, {
    variables: { userAddress },
  });

  return {
    data: lpData?.lpPositionValues?.items || [],
    loading: lpLoading,
    error: lpError,
  };
}
