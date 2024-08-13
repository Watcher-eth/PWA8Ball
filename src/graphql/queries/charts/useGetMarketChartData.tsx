//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_MARKET_CHART_DATA = gql`
  query getMarketChartData($id: String!) {
    prices(where: { id: $id }) {
      items {
        outcome
        price
        timestamp
        marketId
      }
    }
  }
`;

export function useGetMarketChartData(id: string) {
  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
  } = useApolloQuery(GET_MARKET_CHART_DATA, {
    variables: { id },
  });

  return {
    data: chartData?.prices?.items || [],
    loading: chartLoading,
    error: chartError,
  };
}
