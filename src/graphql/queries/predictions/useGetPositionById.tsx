import { tgql } from "@/__generated__";
import { useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_POSITION_BY_ID = tgql(/* GraphQL */ `
  query OrderById($id: String!) {
    position(id: $id) {
      marketId
      option
      tokensOwned
      userAddress
      market {
        title
        question
        usdcStake
        outcomeA
        outcomeB
        outcomeOddsA
        outcomeOddsB
      }
      user {
        name
        pfp
      }
    }
  }
`);

export function useGetPositionById(id: string) {
  const { data, loading, error } = useQuery(GET_POSITION_BY_ID, {
    variables: { id },
  });

  return {
    position: data?.position,
    loading,
    error,
  };
}
