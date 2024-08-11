

import { useQuery as useApolloQuery, gql } from "@apollo/client";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";

const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($userAddress: String) {
    orders(where: { userAddress: $userAddress }, limit: 1) {
      items {
        amount
        marketId
        option
        price
        timestamp
        tokensOwned
        market {
          question
          title
          id
          marketId
        }
      }
    }
  }
`;

export function useGetOrdersByUser(userAddress: string) {
  userAddress = getChecksummedAddress(
    "0x16491afff88e0f7fab9c9ea800d89a9c8bb871b6"
  );
  console.log(userAddress);

  const {
    data,
    loading,
    error
  } = useApolloQuery(GET_ORDERS_BY_USER, {
    variables: {
      userAddress: getChecksummedAddress(userAddress)
    },
    skip: !Boolean(userAddress),
  });
  console.log("orderData", {
    shown:!Boolean(userAddress),
    data,
    loading,
    error,
  });

  return {
    orders: data?.orders?.items,
    loading,
    error,
  };
}
