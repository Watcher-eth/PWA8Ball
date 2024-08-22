//@ts-nocheck

import { tgql } from "@/__generated__";
import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USERS_FOR_MARKET = tgql(/* GraphQL */`
  query getUsersForMarket($id: String!) {
    positions(limit: 1, where: { id: $id }) {
      items {
        marketId
        market {
          id
          question
          title
          outcomeOddsB
          outcomeOddsA
          outcomeB
          outcomeA
          initialProb
        }
        user {
          externalAuthProviderUserId
          name
          pfp
        }
      }
    }
  }
`)

export function useGetUsersForMarket(id: number) {
  const {
    data,
    loading,
    error,
  } = useApolloQuery(GET_USERS_FOR_MARKET, {
    variables: { id: BigInt(id) },
  });


  return {
    positions: data?.positions?.items ?? [],
    loading,
    error,
  };
}
