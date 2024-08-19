//@ts-nocheck

import { gql } from "@/__generated__";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_ALL_MARKETS = gql(/* GraphQL */ `
  query AllMarkets {
    markets {
      items {
        marketId
        outcomeB
        outcomeA
        outcomeOddsB
        outcomeOddsA
        question
        title
        topicId
        usdcStake
      }
    }
  }
`);

export function useGetAllMarkets() {
  const {
    data: marketsData,
    loading: marketsLoading,
    error: marketsError,
  } = useApolloQuery(GET_ALL_MARKETS);

  return {
    data: marketsData,
    loading: marketsLoading,
    error: marketsError,
  };
}
