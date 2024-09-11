import { useQuery as useApolloQuery } from "@apollo/client"
import { tgql } from "@/__generated__"

const SEARCH_USERS = tgql(/* GraphQL */ `
  query searchUsers($name_contains: String!) {
    users(where: { name_contains: $name_contains }) {
      items {
        name
        pfp
        id
        walletAddress
      }
    }
  }
`)

export function useSearchUsers(searchString: string) {
  const { data, loading, error, refetch } = useApolloQuery(SEARCH_USERS, {
    variables: { name_contains: String(searchString) },
  })

  //TODO: Get Topic

  return {
    users: data?.users?.items,
    loading,
    error,
    refetch,
  }
}
