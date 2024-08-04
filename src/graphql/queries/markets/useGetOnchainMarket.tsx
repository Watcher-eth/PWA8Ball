import { gql, useQuery as useGraphQLQuery } from "@apollo/client";

const ONCHAIN_MARKET_QUERY = gql`
  query OnchainMarket($id: BigInt!) {
    onchainMarket(id: $id) {
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

export function useGetOnchainMarket(id: number) {
  const { data, loading, error } = useGraphQLQuery(ONCHAIN_MARKET_QUERY, {
    variables: { id },
  });

  return { data: data?.onchainMarket, loading, error };
}
