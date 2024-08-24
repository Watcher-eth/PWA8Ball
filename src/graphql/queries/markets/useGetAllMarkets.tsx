import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";

const GET_ALL_MARKETS = tgql(/* GraphQL */ `
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
  const { data, loading, error, refetch } = useApolloQuery(GET_ALL_MARKETS);

  return {
    markets: data?.markets?.items ?? [],
    error,
    refetch,
  };
}
