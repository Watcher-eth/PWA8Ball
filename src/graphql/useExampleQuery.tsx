import { useQuery } from "@apollo/client"
import { gql } from "@/__generated__/gql";

const EXAMPLE_MARKET_QUERY = gql(/* GraphQL */`
  query OnchainMarkets($id: BigInt!) {
    onchainMarkets(id: $id) {
      id
      outcomeA
      outcomeB
      usdcStake
      liquidityUSDC
      resolved
      outcome
      proposedOutcome
      initialProb
      createdAt
      updatedAt
      resolvedAt
      proposedAt
    }
  }
`)

export function useExampleQuery() {
  const { data, loading, error } = useQuery(EXAMPLE_MARKET_QUERY, {
    variables: { id: 1 },
  });
  return data?.onchainMarkets;
}