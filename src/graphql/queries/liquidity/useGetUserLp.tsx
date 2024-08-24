//@ts-nocheck

import { useQuery as useApolloQuery, gql } from "@apollo/client";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";

const GET_USER_LP = gql`
  query getUserLp($userAddress: String!) {
    lpPositions(where: { userAddress: $userAddress }) {
      items {
        amountUsdc
        amountLp
        marketId
        createdAt
        market {
          liquidityTotal
          title
          question
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
    refetch,
  } = useApolloQuery(GET_USER_LP, {
    variables: { userAddress: getChecksummedAddress(userAddress) },
    skip: !Boolean(userAddress),
  });
  // console.log(
  //   getChecksummedAddress("0x9fefd0bb2d175b039c8c72c55eea11bc66452591")
  // );

  return {
    data: lpData?.lpPositions?.items ?? [],
    loading: lpLoading,
    error: lpError,
    refetch,
  };
}
