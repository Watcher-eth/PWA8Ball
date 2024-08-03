import { useQuery  } from "@apollo/client";
import { gql } from "@/__generated__/gql";

const ORDERS_QUERY = gql(/* GraphQL */`
  query Orders($userAddress: String!) {
    orders(where: { sender: $userAddress }) {
      items {
        id
        marketId
        market {
          initialProb
        }
        sender
        amount
        price
        option
        timestamp
        tokensOwned
      }
    }
  }
`);

export function useGetUserOrders(userAddress: string) {
  const { data, loading, error } = useQuery(ORDERS_QUERY, {
    variables: { userAddress },
  });

  return { data: data?.orders?.items, loading, error };
}
