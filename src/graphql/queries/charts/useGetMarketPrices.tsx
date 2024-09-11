//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client"
import { tgql } from "@/__generated__"

const GET_MARKET_CHART_DATA = tgql(/* GraphQL */ `
  query getMarketPrices($marketId: BigInt) {
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

export function useGetMarketPrices(id: string) {
  const { data, loading, error } = useApolloQuery(GET_MARKET_CHART_DATA, {
    variables: { id },
  })

  return {
    data: data?.prices?.items ?? [],
    loading,
    error,
  }
}
