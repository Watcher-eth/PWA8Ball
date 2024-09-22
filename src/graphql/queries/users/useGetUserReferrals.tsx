import { tgql } from "@/__generated__"
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { gql, useQuery as useApolloQuery } from "@apollo/client"
import { Address } from "viem"

// Define the GraphQL query for getting a topic by ID
const GET_USER_REFERRALS = tgql(/* GraphQL */ `
  query getUserReferrals($referrerAddress: String!) {
    referrals(where: { referrerAddress: $referrerAddress }) {
      items {
        feeAmount
        id
        marketId
        referrerAddress
        timestamp
        market {
          question
          title
        }
      }
    }
  }
`)

export async function getUserReferrals(referrerAddress: Address) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_USER_REFERRALS,
    variables: { referrerAddress: getChecksummedAddress(referrerAddress) },
  })
  return data?.referrals?.items
}

export function useGetUserReferrals(referrerAddress: Address) {
  const { data, loading, error } = useApolloQuery(GET_USER_REFERRALS, {
    variables: { referrerAddress: getChecksummedAddress(referrerAddress) },
  })
  return {
    referrals: data?.referrals?.items ?? null,
    loading,
    error,
  }
}
