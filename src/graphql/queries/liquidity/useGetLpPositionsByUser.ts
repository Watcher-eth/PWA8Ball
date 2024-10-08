
import { tgql } from "@/__generated__"
import { useQuery } from "@apollo/client"

const GET_LP_CHART_DATA = tgql(/* GraphQL */ `
  query getLpPositionsData($userAddress: String!) {
    lpPositionPrices(where: { userAddress: $userAddress }) {
      items {
        amountLp
        amountUsdc
        marketId
        id
        timestamp
        userAddress
      }
    }
  }
`)

export function useGetLpPositionsByUser(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useQuery(GET_LP_CHART_DATA, {
    variables: { userAddress },
  })

  return {
    data: lpData?.lpPositionPrices?.items || [],
    loading: lpLoading,
    error: lpError,
  }
}
