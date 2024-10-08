

import { tgql } from "@/__generated__"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { useQuery } from "@apollo/client"

const GET_USER_POSITION_COUNT = tgql(/* GraphQL */ `
  query UserOrderCount($userAddress: String) {
    positions(where: { userAddress: $userAddress }) {
      items {
        marketId
        tokensOwned
      }
    }
  }
`)

export function useGetUserPositionsCount(userAddress?: string) {
  const { data, loading, error } = useQuery(GET_USER_POSITION_COUNT, {
    variables: {
      userAddress: getChecksummedAddress(userAddress!),
    },
  })

  const orders = data?.positions?.items ?? []

  return {
    data: {
      count: orders.length,
      orders: orders,
    },
    loading,
    error,
  }
}
