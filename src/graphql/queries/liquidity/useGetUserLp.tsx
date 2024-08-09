//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";


const GET_USER_LP = gql`
  query UserLp($userAddress: String) {
    lps(where: { userAddress: $userAddress }) {
      items {
        amount
        id
        lpAmount
        userAddress
        marketId
        timestamp
        market {

          liquidityTotalSupply
          liquidityUSDC
        }
      }
    }
  }
`;

export function useGetUserLp(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_USER_LP, {
    variables: { userAddress: getChecksummedAddress(userAddress) },
    enabled: Boolean(userAddress),
  });
  // console.log(
  //   getChecksummedAddress("0x9fefd0bb2d175b039c8c72c55eea11bc66452591")
  // );
  console.log("lpData", lpData);

  return {
    data: lpData?.items ?? [],
    loading: lpLoading,
    error: lpError,
  };
}
