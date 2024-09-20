import { tgql } from "@/__generated__"
import { gql, useQuery as useApolloQuery } from "@apollo/client"

// Define the GraphQL query for getting a topic by ID
const GET_TOPIC_BY_ID = tgql(/* GraphQL */ `
  query getTopicById($id: BigInt!) {
    topic(id: $id) {
      creatorAddress
      description
      title
      id
    }
  }
`)

// Create the custom hook for fetching the topic by ID
export function useGetTopicById(id: number) {
  const { data, loading, error } = useApolloQuery(GET_TOPIC_BY_ID, {
    variables: { id: BigInt(id) },
  })

  return {
    topic: data?.topic ?? null,
    loading,
    error,
  }
}
