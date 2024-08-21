//@ts-nocheck

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_LP_CHART_DATA = gql`
  query getLpPositionOriginalValueUSDC($userAddress: String!) {
    lpTrades(where: { userAddress: $userAddress }) {
      items {
        amountLp
        amountUsdc
        userAddress
      }
    }
  }
`;
export function useGetOriginalLpPrice(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_LP_CHART_DATA, {
    variables: { userAddress: getChecksummedAddress(userAddress) },
  });

  console.log("data", lpData);
  return {
    data: lpData?.lpTrades?.items || [],
    loading: lpLoading,
    error: lpError,
  };
}
