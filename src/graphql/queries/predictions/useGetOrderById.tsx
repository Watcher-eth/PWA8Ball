import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_ORDER_BY_ID = gql`
  query OrderById($id: String!) {
    position(id: $id) {
      marketId
      option
      tokensOwned
      userAddress
      market {
        title
        question
        usdcStake
        outcomeA
        outcomeB
        outcomeOddsA
        outcomeOddsB
      }
    }
  }
`;

export function useGetOrderById(id: string) {
  const { data, loading, error } = useQuery(GET_ORDER_BY_ID, {
    variables: { id },
  });

  return {
    data,
    loading,
    error,
  };
}
