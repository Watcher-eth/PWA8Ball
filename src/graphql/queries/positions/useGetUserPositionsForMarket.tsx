import { tgql } from "@/__generated__"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { useQuery } from "@apollo/client"

const USER_POSITIONS_BY_MARKET = tgql(/* GraphQL */ `
  query UserPositionsByMarket($marketId: BigInt, $userAddress: String) {
    positions(where: { marketId: $marketId, userAddress: $userAddress }) {
      items {
        createdAt
        marketId
        option
        tokensOwned
      }
    }
  }
`)
export function useGetUserPositionsForMarket(
  userAddress?: string,
  marketId?: number
) {
  const { data, loading, error } = useQuery(USER_POSITIONS_BY_MARKET, {
    variables: {
      userAddress: getChecksummedAddress(userAddress!),
      marketId: marketId,
    },
  })

  const orders = data?.positions?.items ?? []

  return {
    data: orders,
    loading,
    error,
  }
}
