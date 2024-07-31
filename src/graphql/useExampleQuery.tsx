import { gql, useQuery } from "@apollo/client"


const EXAMPLE_MARKET_QUERY = gql`
  query OnchainMarketsQuery($id: BigInt!) {
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
`;

export function useExampleQuery() {
  const { data, loading, error } = useQuery(EXAMPLE_MARKET_QUERY);
  return data?.onchainMarkets;
}