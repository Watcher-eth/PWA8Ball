//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";

const GET_MARKET_CHART_DATA = tgql(/* GraphQL */`
  query getMarketChartData($marketId: BigInt = "1") {
    prices(where: { marketId: $marketId }) {
      items {
        id
        marketId
        price
        timestamp
      }
    }
  }
`)

export function useGetMarketChartData(id: string) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_MARKET_CHART_DATA, {
    variables: { id },
  });

  return {
    data: data?.prices?.items ?? [],
    loading,
    error,
  };
}
