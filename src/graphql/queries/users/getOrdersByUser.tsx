//@ts-nocheck

import { useQuery as useApolloQuery, gql } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";

const GET_ORDERS_BY_USER = gql`
  query UserOrders($userAddress: String) {
    orders(where: { userAddress: $userAddress }, limit: 1) {
      items {
        amount
        marketId
        option
        price
        timestamp
        tokensOwned
        market {
          marketDetail {
            image
            question
            title
            id
          }
          id
        }
      }
    }
  }
`;

export function useGetOrdersByUser(userAddress: string) {
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useApolloQuery(GET_ORDERS_BY_USER, {
    variables: { userAddress: getChecksummedAddress(userAddress) },
  });

  return {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  };
}
