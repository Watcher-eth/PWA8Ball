//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_ONCHAIN_MARKET = gql`
  query getMarketById($id: BigInt = "") {
    onchainMarket(id: $id) {
      id
      initialProb
      liquidityTotalSupply
      liquidityUSDC
      marketId
      outcomeA
      outcomeB
      proposedAt
      resolvedAt
      updatedAt
      usdcStake
      marketDetail {
        image
        question
        title
        topicId
      }
    }
  }
`;

export function useGetMarketById(id: string) {
  const {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  } = useApolloQuery(GET_ONCHAIN_MARKET, {
    variables: { id },
  });

  //TODO: Get Topic

  return {
    data: marketData,
    loading: marketLoading,
    error: marketError,
  };
}
