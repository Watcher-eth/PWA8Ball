// Yeah im not touching this file with a 10 meter pole till monke knows what its trying 2 do

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { gql, useQuery as useApolloQuery } from "@apollo/client"
import { tgql } from "@/__generated__"
import { supabase } from "@/supabase/supabaseClient"
import { useEffect, useState } from "react"

// GraphQL query to fetch orders by user addresses
const GET_ORDERS_BY_USER_ADDRESSES = tgql(/* GraphQL */ `
  query FriendsOrdersByUser($userAddressArr: [String]!) {
    positions(where: { userAddress_in: $userAddressArr }, limit: 15) {
      items {
        marketId
        option
        tokensOwned
        createdAt
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
          walletAddress
        }
      }
    }
  }
`)

// Function to fetch the IDs of users that a specific user follows
async function fetchFollowingIds(userId: string) {
  const { data, error } = await supabase
    .from("user_follows")
    .select("following_id")
    .eq("follower_id", userId)
  console.log("ids", userId, data)
  if (error) {
    console.error("Error fetching following IDs:", error.message)
    throw new Error(error.message)
  }

  return data?.map((row) => row.following_id) ?? []
}

export const useGetFriendsPositions = (userId: string) => {
  const [followingIds, setFollowingIds] = useState([])
  async function getAndSetFollowingIds() {
    const arr = await fetchFollowingIds(userId)
    setFollowingIds(arr as any)
  }
  useEffect(() => {
    getAndSetFollowingIds()
  }, [userId])
  const { data, error, loading, refetch } = useApolloQuery(
    GET_ORDERS_BY_USER_ADDRESSES,
    {
      variables: {
        userAddressArr: followingIds.map(getChecksummedAddress),
      },
    }
  )
  console.log("data", data?.positions?.items)
  return { data: data?.positions?.items, error, loading, refetch } ?? []
}
