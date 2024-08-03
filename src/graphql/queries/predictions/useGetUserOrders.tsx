import { gql, useQuery as useApolloQuery } from "@apollo/client";

const ORDERS_QUERY = gql`
  query Orders($userAddress: String!) {
    orders(where: { sender: { _eq: $userAddress } }) {
      id
      sender
      amount
      price
      option
      tokensOwned
      marketId
      onchainMarket {
        initialProb
      }
    }
  }
`;

export function useGetUserOrders(userAddress: string) {
  const { data, loading, error } = useApolloQuery(ORDERS_QUERY, {
    variables: { userAddress },
  });

  return { data: data?.orders, loading, error };
}
