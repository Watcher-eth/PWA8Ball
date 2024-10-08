import { tgql } from "@/__generated__";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider";
import { useQuery } from "@apollo/client";

const GET_ALL_MARKETS = tgql(/* GraphQL */ `
  query getMarketsForTopic($id: BigInt) {
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
`);

export async function getAllMarketsForTopicId(id: number) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ALL_MARKETS,
    variables: { id },
  });
  return data?.markets?.items;
}

export function useGetAllMarketsForTopic(id: number) {
  const { data, loading, error } = useQuery(GET_ALL_MARKETS, {
    variables: { id: BigInt(id) },
  });

  console.log("markets", data);
  return {
    marketsForTopic: data?.markets?.items ?? [],
    loading,
    error,
  };
}
