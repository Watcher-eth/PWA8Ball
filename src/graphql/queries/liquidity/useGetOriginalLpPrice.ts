//@ts-nocheck

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { tgql } from "@/__generated__";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_LP_CHART_DATA = tgql(/* GraphQL */`
  query getLpPositionOriginalValueUSDC($userAddress: String!) {
    lpTrades(where: { userAddress: $userAddress }) {
      items {
        amountLp
        amountUsdc
        userAddress
      }
    }
  }
`)

export function useGetOriginalLpPrice(userAddress: string) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_LP_CHART_DATA, {
    variables: { userAddress: getChecksummedAddress(userAddress) },
  });

  console.log("data");
  return {
    data: data?.lpTrades?.items ?? [],
    loading: lpLoading,
    error: lpError,
  };
}
