import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { tgql } from "@/__generated__";

export const GET_USER_BY_ID = gql`
  query getUserById($id: String = "") {
    user(id: $id) {
      externalAuthProviderUserId
      createdAt
      name
      pfp
      socials
      walletAddress
    }
  }
`;




export function useGetUserById(id: string) {
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
