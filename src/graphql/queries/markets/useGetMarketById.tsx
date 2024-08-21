//@ts-nocheck

import { useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__/gql";

const GET_ONCHAIN_MARKET = tgql(/* GraphQL */`
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
    data,
    loading,
    error,
  } = useApolloQuery(GET_ONCHAIN_MARKET, {
    variables: { id: String(id) },
  });

  //TODO: Get Topic

  return {
    data,
    loading,
    error,
  };
}
