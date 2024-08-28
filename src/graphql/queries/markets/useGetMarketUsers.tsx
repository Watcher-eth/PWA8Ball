import { tgql } from "@/__generated__";
import { useQuery as useApolloQuery } from "@apollo/client";

const GET_MARKET_USERS = tgql(/* GraphQL */`
  query MarketUsers($marketId: BigInt!) {
    positions(where: { marketId: $marketId }) {
      items {
        option
        tokensOwned
        updatedAt
        userAddress
        user {
          name
          pfp
          externalAuthProviderUserId
          walletAddress
        }
      }
    }
  }
`);

export function useGetMarketUsers(marketId: string) {
  const {
    data: marketUsersData,
    loading: marketUsersLoading,
    error: marketUsersError,
    refetch,
  } = useApolloQuery(GET_MARKET_USERS, {
    variables: { marketId: marketId },
  });

  return {
    data: marketUsersData?.positions?.items,
    refetch,
  };
}
