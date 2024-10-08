import { useQuery } from "@apollo/client"
import { tgql } from "@/__generated__"

const GET_MARKET_CHART_DATA = tgql(/* GraphQL */ `
  query GetMarketPrices($marketId: BigInt) {
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

export function useGetMarketPrices(marketId: string) {
  const { data, loading, error } = useQuery(GET_MARKET_CHART_DATA, {
    variables: { marketId: marketId },
  })
  // console.log("data", data)

  return {
    data: data?.prices?.items ?? [],
    loading,
    error,
  }
}
