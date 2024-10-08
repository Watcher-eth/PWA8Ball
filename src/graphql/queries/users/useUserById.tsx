import { useQuery } from "@apollo/client"
import { tgql } from "@/__generated__"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { User } from "@/__generated__/graphql"
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"

const GET_USER_BY_ID = tgql(/* GraphQL */ `
  query getUserById($id: String!) {
    user(id: $id) {
      name
      pfp
      id
      externalAuthProviderUserId
      createdAt
      isRegistered
      theme
      updatedAt
      walletAddress
    }
  }
`)

export async function getUserById(userId: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_USER_BY_ID,
    variables: { id: getChecksummedAddress(userId) },
  })
  return data?.user as User
}

export function useGetUserById(id: string) {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: getChecksummedAddress(id) },
  })
  return {
    user: data?.user,
    loading,
    error,
    refetch,
  }
}
