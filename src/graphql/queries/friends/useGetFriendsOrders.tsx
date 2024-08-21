// Yeah im not touching this file with a 10 meter pole till monke knows what its trying 2 do

import { useQuery } from "@tanstack/react-query";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";
import { gql, useQuery as useApolloQuery } from "@apollo/client";
import { supabase } from "@/supabase/supabaseClient";


// GraphQL query to fetch orders by user addresses
const GET_ORDERS_BY_USER_ADDRESSES = gql`
  query FriendsOrders($userAddress_in: [String]!) {
    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {
      items {
        marketId
        option
        tokensOwned
        market {
          id
          initialProb
          marketId
          outcomeA
          outcomeB
          outcomeOddsA
          outcomeOddsB
          question
          title
          usdcStake
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

// Function to fetch the IDs of users that a specific user follows
const fetchFollowingIds = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from("user_follows")
    .select("following_id")
    .eq("follower_id", userId);

  if (error) {
    console.error("Error fetching following IDs:", error.message);
    throw new Error(error.message);
  }

  return data.map((row) => row.following_id);
};

// Hook to combine fetching following IDs and querying orders by those IDs
export const useGetFriendsOrders = (userId: string) => {
  return useQuery({
    queryKey: ["followingOrders", userId],
    queryFn: async () => {
      // First, fetch the following IDs
      const followingIds = await fetchFollowingIds(userId);

      if (followingIds.length === 0) {
        return []; // Return an empty array if no following IDs
      }

      // Then, fetch the orders by the following IDs
      // WTF is this shit
      const { data, error } = useApolloQuery(GET_ORDERS_BY_USER_ADDRESSES, {
        variables: {
          userAddress_in: followingIds.map(getChecksummedAddress),
        },
      });

      if (error) {
        console.error("Error fetching orders:", error.message);
        throw new Error(error.message);
      }

      return data?.positions?.items ?? [];
    },
    enabled: !!userId, // This query will only run if userId is truthy
    staleTime: 1000 * 60 * 5, // Optional: Adjust based on how frequently you expect data to change
  });
};
