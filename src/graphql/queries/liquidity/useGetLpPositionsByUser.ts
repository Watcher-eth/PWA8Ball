//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_LP_POSITION_VALUES = gql`
  query MyQuery2($userAddress: String = "") {
    lpPositionValues(where: { userAddress: $userAddress }) {
      items {
        id
        marketId
        userAddress
        timestamp
        value
      }
    }
  }
`;

export function useGetLpPositionsByUser(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_LP_POSITION_VALUES, {
    variables: { userAddress },
  });

  return {
    data: lpData?.lpPositionValues?.items || [],
    loading: lpLoading,
    error: lpError,
  };
}
