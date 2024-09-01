import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";
import { User } from "@/__generated__/graphql";
import { APOLLO_CLIENT } from "@/providers/GraphQlProvider";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
export const GET_USER_BY_ID = tgql(/* GraphQL */ `
  query getUserById($id: String = "") {
    user(id: $id) {
      name
      pfp
      id
      socials
      theme
      walletAddress
      updatedAt
      liquidityPoints
      rewardPoints
    }
  }
`);

export async function getUserById(userId: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_USER_BY_ID,
    variables: { id: getChecksummedAddress(userId) },
  });
  return data?.user as User;
}

export function useUserById(id: string) {
  const { data, loading, error, refetch } = useApolloQuery(GET_USER_BY_ID, {
    variables: { id: String(id) },
  });

  return {
    user: data?.user,
    loading,
    error,
    refetch,
  };
}
