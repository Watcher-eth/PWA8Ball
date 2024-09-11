//@ts-nocheck
import { tgql } from "@/__generated__"
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"
import { gql, useQuery as useApolloQuery } from "@apollo/client"

const GET_ALL_MARKETS = tgql(/* GraphQL */ `
  query getMarketsForTopic($id: Int) {
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
`)

export async function getAllMarketsForTopicId(id: Number) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ALL_MARKETS,
    variables: { id: Number(id) },
  })
  return data?.markets?.items
}

export function useGetAllMarketsForTopic(id: number) {
  const { data, loading, error } = useApolloQuery(GET_ALL_MARKETS, {
    variables: { id: id },
  })

  return {
    marketsForTopic: data?.markets?.items ?? [],
    loading,
    error,
  }
}
