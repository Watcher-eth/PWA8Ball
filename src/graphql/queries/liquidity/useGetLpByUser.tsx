//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const GET_LP_BY_USER = gql`
  query GetLpByUser($userAddress: String!) {
    lps(where: { userAddress: $userAddress }) {
      items {
        amount
        id
        lpAmount
        marketId
        timestamp
        userAddress
      }
    }
  }
`;

export function useGetLpByUser(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_LP_BY_USER, {
    variables: { userAddress },
  });

  const marketIds = lpData?.lps?.items?.map((lp) => lp.marketId) || [];

  const { data: marketsData, error: marketsError } =
    useGetMarketsWithTopicsByIds(marketIds);

  const mergedData = lpData?.map((lpPosition) => {
    const marketData = marketsData?.find(
      (market) => market.id === lpPosition.marketId
    );
    return {
      ...lpPosition,
      ...marketData,
    };
  });

  return {
    data: combinedData,
    loading: lpLoading || marketLoading,
    error: lpError || marketError,
  };
}
