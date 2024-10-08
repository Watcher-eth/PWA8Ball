import { useQuery } from "@apollo/client"
import { tgql } from "@/__generated__"

const SEARCH_USERS_QUERY = tgql(/* GraphQL */ `
  query SearchUsers($name_contains: String!) {
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
  const { data, loading, error, refetch } = useQuery(SEARCH_USERS_QUERY, {
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
