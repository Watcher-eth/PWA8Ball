import { useQuery } from "@apollo/client"
import { tgql } from "@/__generated__"


const SEARCH_MARKETS = tgql(/* GraphQL */ `
  query SearchMarkets($question_contains: String!) {
    markets(where: { question_contains: $question_contains }, limit: 10) {
      items {
        id
        title
        question
        outcomeOddsA
        outcomeA
        marketId
        topicId
      }
    }
  }
`)

export function useSearchMarkets(searchString: string) {
  const { data, loading, error, refetch } = useQuery(SEARCH_MARKETS, {
    variables: { question_contains: String(searchString) },
  })

  //TODO: Get Topic

  return {
    markets: data?.markets?.items,
    loading,
    error,
    refetch,
  }
}
