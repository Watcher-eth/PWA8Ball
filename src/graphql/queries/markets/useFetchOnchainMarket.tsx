import { gql, useQuery as useGraphQLQuery } from "@apollo/client";

const ONCHAIN_MARKET_QUERY = gql`
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
`;

export function useOnchainMarketQuery(id: number) {
  const { data, loading, error } = useGraphQLQuery(ONCHAIN_MARKET_QUERY, {
    variables: { id },
  });

  return { data: data?.onchainMarkets, loading, error };
}
