import { tgql } from "@/__generated__"
import { useQuery as useApolloQuery } from "@apollo/client"
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"

const GET_MARKET_USERS_QUERY = tgql(/* GraphQL */ `
  query MarketUsers($marketId: BigInt!) {
    positions(where: { marketId: $marketId }) {
      items {
        option
        tokensOwned
        updatedAt
        userAddress
        user {
          id
          name
          pfp
          externalAuthProviderUserId
          walletAddress
        }
      }
    }
  }
`)

export async function getUsersByMarketId(marketId: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_MARKET_USERS_QUERY,
    variables: { marketId: String(marketId) },
  })
  return data?.positions?.items?.map((i) => i.user) ?? []
}

export function useUsersByMarketId(marketId: string) {
  const { data, refetch } = useApolloQuery(GET_MARKET_USERS_QUERY, {
    variables: { marketId: marketId },
  })

  return {
    data: data?.positions?.items,
    refetch,
  }
}
