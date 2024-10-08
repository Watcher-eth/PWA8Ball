import { tgql } from "@/__generated__"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { useQuery } from "@apollo/client"

export const GET_POSITION_BY_USER_ADDRESSES = tgql(/* GraphQL */ `
  query FriendsOrders($userAddresses: [String]!) {
    positions(where: { userAddress_in: $userAddresses }, limit: 1) {
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

export function useGetPositionsByUserAddresses(userAddresses: string[]) {
  const { data, loading, error } = useQuery(GET_POSITION_BY_USER_ADDRESSES, {
    variables: {
      userAddresses:
        userAddresses.length > 0
          ? userAddresses?.map(getChecksummedAddress)
          : ["0x870b7F3f229D08918d33F8b09766eaB412aBEebf"],
    },
  })

  return {
    orders: data?.positions?.items ?? [],
    loading,
    error,
  }
}
