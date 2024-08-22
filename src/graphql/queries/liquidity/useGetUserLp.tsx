//@ts-nocheck

import { useQuery as useApolloQuery, gql } from "@apollo/client";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { tgql } from "@/__generated__";

const GET_USER_LP = tgql(/* GraphQL */`
  query getUserLp($userAddress: String!) {
    lpPositions(where: { userAddress: $userAddress }) {
      items {
        amountLp
        amountUsdc
        marketId
        createdAt
        updatedAt
        market {
          liquidityTotal
          title
          question
        }
      }
    }
  }
`)

export function useGetUserLp(userAddress: string) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_USER_LP, {
    variables: { userAddress: getChecksummedAddress(userAddress) },
    skip: !Boolean(userAddress),
  });
  // console.log(
  //   getChecksummedAddress("0x9fefd0bb2d175b039c8c72c55eea11bc66452591")
  // );
  console.log("lpData", data);

  return {
    lpPositions: data?.lpPositions?.items ?? [],
    loading,
    error,
  };
}
