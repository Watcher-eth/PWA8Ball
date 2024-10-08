import { useQuery } from "@apollo/client"
import { tgql } from "@/__generated__"
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"

const GET_ALL_MARKETS = tgql(/* GraphQL */ `
  query AllMarkets {
    markets {
      items {
        marketId
        outcomeB
        outcomeA
        outcomeOddsB
        outcomeOddsA
        question
        title
        topicId
        usdcStake
      }
    }
  }
`)

export async function getAllMarkets(userId: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ALL_MARKETS,
  })
  return data?.markets?.items ?? []
}

export function useGetAllMarkets() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_MARKETS)

  return {
    markets: data?.markets?.items ?? [],
    loading,
    error,
    refetch,
  }
}
