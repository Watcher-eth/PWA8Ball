import { useQuery } from "@apollo/client"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { tgql } from "@/__generated__"

export const GET_POSITIONS_BY_WALLET = tgql(/* GraphQL */ `
  query getPositionsByWallet($userAddress: String!) {
    positions(where: { userAddress: $userAddress }, limit: 15) {
      items {
        marketId
        option
        tokensOwned
        market {
          id
          initialProb
          marketId
          outcomeA
          outcomeB
          outcomeOddsA
          outcomeOddsB
          question
          title
          usdcStake
          outcome
          resolved
        }
        user {
          externalAuthProviderUserId
          name
          pfp
        }
      }
    }
  }
`)

export function useGetPositionsByWallet(userAddress: string) {
  const { data, loading, error, refetch } = useQuery(GET_POSITIONS_BY_WALLET, {
    variables: {
      userAddress: getChecksummedAddress(userAddress),
    },
  })
  return {
    orders: data?.positions?.items,
    loading,
    error,
    refetch,
  }
}
