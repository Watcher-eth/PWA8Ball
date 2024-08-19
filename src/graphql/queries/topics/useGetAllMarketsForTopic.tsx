//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_ALL_MARKETS = gql`
  query getMarketsForTopic($id: Int) {
    markets(where: { topicId: $id }) {
      items {
        outcome
        marketId
        outcomeA
        outcomeB
        outcomeOddsA
        outcomeOddsB
        title
        question
        topicId
      }
    }
  }
`;

export function useGetAllMarketsForTopic(id: number) {
  const {
    data: marketsData,
    loading: marketsLoading,
    error: marketsError,
  } = useApolloQuery(GET_ALL_MARKETS, {
    variables: { id: id },
  });

  return {
    data: marketsData,
    loading: marketsLoading,
    error: marketsError,
  };
}
