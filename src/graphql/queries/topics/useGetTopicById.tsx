import { tgql } from "@/__generated__"
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"
import { useQuery } from "@apollo/client"

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

export async function getTopicById(id: number) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_TOPIC_BY_ID,
    variables: { id: BigInt(id) },
  })
  return data?.topic
}

// Create the custom hook for fetching the topic by ID
export function useGetTopicById(id: number) {
  const { data, loading, error } = useQuery(GET_TOPIC_BY_ID, {
    variables: { id: BigInt(id) },
  })

  return {
    topic: data?.topic ?? null,
    loading,
    error,
  }
}
