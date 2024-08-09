import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";

const ORDERS_QUERY = gql(/* GraphQL */ `
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
    variables: { userAddress: getChecksummedAddress(userAddress) },
  });

  return { data: data?.orders?.items, loading, error };
}
