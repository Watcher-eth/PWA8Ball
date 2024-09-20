//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client"

const GET_ALL_MARKETS = gql`
  query getMarketsForTopic($id: BigInt) {
    markets(where: { topicId: $id }) {
      items {
        outcome
        marketId
        outcomeA
        outcomeB
        outcomeOddsA
        outcomeOddsB
        title
        question
        topicId
      }
    }
  }
`

export function useGetAllMarketsForTopic(id: number) {
  const { data, loading, error } = useApolloQuery(GET_ALL_MARKETS, {
    variables: { id: BigInt(id) },
  })

  console.log("markets", data)
  return {
    marketsForTopic: data?.markets?.items ?? [],
    loading,
    error,
  }
}
