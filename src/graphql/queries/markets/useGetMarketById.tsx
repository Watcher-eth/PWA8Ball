//@ts-nocheck

import { gql } from "@/__generated__";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_ONCHAIN_MARKET = gql(/* GraphQL */ `
  query getMarketById($id: BigInt!) {
    market(id: $id) {
      id
      createdAt
      initialProb
      liquidityTotal
      outcomeA
      outcomeB
      outcomeOddsA
      outcomeOddsB
      outcome
      proposedAt
      question
      proposedOutcome
      title
      usdcStake
      topicId
    }
  }
`);

export function useGetMarketById(id: string) {
  const {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  } = useApolloQuery(GET_ONCHAIN_MARKET, {
    variables: { id: String(id) },
  });

  //TODO: Get Topic

  return {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  };
}
