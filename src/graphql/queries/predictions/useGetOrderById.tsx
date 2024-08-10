import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_ORDER_BY_ID = gql`
  query OrderById($id: String!) {
    order(id: $id) {
      amount
      marketId
      market {
        outcomeA
        outcomeB
        marketId
        marketDetail {
          image
          question
          title
        }
      }
      price
      option
      timestamp
      tokensOwned
      user {
        name
        pfp
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
