
import { useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider"

const GET_ONCHAIN_MARKET = tgql(/* GraphQL */ `
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

export async function getMarketById(id: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ONCHAIN_MARKET,
    variables: { id: String(id) },
  });
  return (
    data?.market
  )
}

export function useGetMarketById(id: string) {
  const { data, loading, error, refetch } = useApolloQuery(GET_ONCHAIN_MARKET, {
    variables: { id: String(id) },
  });

  //TODO: Get Topic

  return {
    market: data?.market,
    loading,
    error,
    refetch,
  };
}
