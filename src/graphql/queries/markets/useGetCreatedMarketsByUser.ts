import { useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider";

const GET_CREATED_MARKETS_BY_USER = tgql(/* GraphQL */ `
  query CreatedMarkesByUserAddress($userAddress: String!) {
    markets(where: { userAddress: $userAddress }) {
      items {
        createdAt
        id
        initialProb
        outcomeA
        outcomeB
        outcomeOddsA
        outcomeOddsB
        question
        proposedOutcome
        resolved
        title
        topicId
      }
    }
  }
`);

export async function getCreatedMarketsByUser(id: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_CREATED_MARKETS_BY_USER,
    variables: { id: String(id) },
  });
  return data?.market;
}

export function useGetMarketById(id: string) {
  const { data, loading, error, refetch } = useApolloQuery(
    GET_CREATED_MARKETS_BY_USER,
    {
      variables: { id: String(id) },
    }
  );

  //TODO: Get Topic

  return {
    market: data?.market,
    loading,
    error,
    refetch,
  };
}
