import { tgql } from "@/__generated__"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { useQuery } from "@apollo/client"

const GET_LP_CHART_DATA = tgql(/* GraphQL */ `
  query getLpPositionOriginalValueUSDC($userAddress: String!) {
    lpTrades(where: { userAddress: $userAddress }) {
      items {
        amountLp
        amountUsdc
        userAddress
      }
    }
  }
`)

export function useGetOriginalLpPrice(userAddress: string) {
  const { data, loading, error } = useQuery(GET_LP_CHART_DATA, {
    variables: {
      userAddress: getChecksummedAddress(userAddress!),
    },
  })

  return {
    data: data?.lpTrades?.items ?? [],
    loading: loading,
    error: error,
  }
}
