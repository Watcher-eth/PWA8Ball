//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabaseClient";

const GET_LP_BY_USER = gql`
  query GetLpByUser($userAddress: String!) {
    lps(where: { userAddress: { _eq: $userAddress } }) {
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

const fetchMarketDetails = async (marketIds) => {
  const { data, error } = await supabase
    .from("markets")
    .select("id, title, question, image, options")
    .in("id", marketIds);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useGetLpByUser(userAddress: string) {
  const {
    data: lpData,
    loading: lpLoading,
    error: lpError,
  } = useApolloQuery(GET_LP_BY_USER, {
    variables: { userAddress },
  });

  const marketIds = lpData?.lps?.items?.map((lp) => lp.marketId) || [];

  const {
    data: marketData,
    isLoading: marketLoading,
    error: marketError,
  } = useReactQuery({
    queryKey: ["UserLpMarkets", marketIds],
    queryFn: () => fetchMarketDetails(marketIds),
    enabled: marketIds.length > 0, // This query will only run if marketIds array is not empty
  });

  const combinedData =
    lpData?.lps?.items.map((lp) => ({
      ...lp,
      market: marketData?.find((market) => market.id === lp.marketId),
    })) || [];

  return {
    data: combinedData,
    loading: lpLoading || marketLoading,
    error: lpError || marketError,
  };
}
