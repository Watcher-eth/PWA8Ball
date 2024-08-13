//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_ONCHAIN_MARKET = gql`
  query getMarketById($id: BigInt) {
    market(id: $id) {
      id
      createdAt
      initialProb
      liquidityTotal
      outcomeA
      outcomeB
      outcome
      proposedAt
      question
      proposedOutcome
      title
      usdcStake
    }
  }
`;

export function useGetMarketById(id: number) {
  const {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  } = useApolloQuery(GET_ONCHAIN_MARKET, {
    variables: { id: BigInt(id) },
  });

  //TODO: Get Topic

  return {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  };
}
