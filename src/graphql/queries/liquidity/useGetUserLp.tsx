import { tgql } from "@/__generated__"
import { useQuery } from "@apollo/client"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"

const GET_USER_LP = tgql(/* GraphQL */ `
  query getUserLp($userAddress: String!) {
    lpPositions(where: { userAddress: $userAddress }) {
      items {
        amountUsdc
        amountLp
        marketId
        createdAt
        market {
          liquidityTotal
          title
          question
        }
      }
    }
  }
`)

export function useGetUserLp(userAddress: string) {
  const { data, loading, error, refetch } = useQuery(GET_USER_LP, {
    variables: {
      userAddress: getChecksummedAddress(userAddress),
    },
    skip: !Boolean(userAddress),
  })

  return {
    data: data?.lpPositions?.items ?? [],
    loading,
    error,
    refetch,
  }
}
