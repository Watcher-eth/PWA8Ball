//@ts-nocheck
import { tgql } from "@/__generated__";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_LP_CHART_DATA = tgql(/* GraphQL */`
  query getLpPositionsData($userAddress: String!) {
    lpPositionPrices(where: { userAddress: $userAddress }) {
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
`)

export function useGetLpPositionsByUser(userAddress: string) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_LP_CHART_DATA, {
    variables: { userAddress },
  });

  return {
    lpPositionsData: data?.lpPositionPrices?.items ?? [],
    loading,
    error,
  };
}
