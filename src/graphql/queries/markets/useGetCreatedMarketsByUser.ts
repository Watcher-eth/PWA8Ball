import { useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider";

const GET_CREATED_MARKETS_BY_USER = tgql(/* GraphQL */ `
  query CreatedMarketsByUserAddress($userAddress: String!) {
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

export async function getCreatedMarketsByUser(userAddress: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_CREATED_MARKETS_BY_USER,
    variables: { userAddress: String(userAddress) },
  });
  return data?.markets?.items;
}

export function useGetCreatedMarketsByUser(userAddress: string) {
  const { data, loading, error, refetch } = useApolloQuery(
    GET_CREATED_MARKETS_BY_USER,
    {
      variables: { userAddress: String(userAddress) },
    }
  );

  //TODO: Get Topic

  return {
    market: data?.markets?.items,
    loading,
    error,
    refetch,
  };
}
