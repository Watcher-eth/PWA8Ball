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
    variables: {
      userAddress: userAddress,
    },
    skip: !Boolean(userAddress),
  });

  return {
    data: lpData?.lpPositions?.items ?? [],
    loading: lpLoading,
    error: lpError,
    refetch,
  };
}
