//@ts-nocheck

import { gql, useQuery as useApolloQuery } from "@apollo/client";

const GET_USERS_FOR_MARKET = gql`
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
`;

export function useGetUsersForMarket(id: number) {
  const {
    data: marketUsers,
    loading: marketUsersLoading,
    error: marketUsersError,
  } = useApolloQuery(GET_USERS_FOR_MARKET, {
    variables: { id: BigInt(id) },
  });


  return {
    data: marketUsers.positions.items,
    loading: marketUsersLoading,
    error: marketUsersError,
  };
}
