// @ts-nocheck

import { supabase } from "../../supabaseClient";

const fetchMutualFollowers = async (userXId: string, userYId: string) => {
  const response = await supabase.raw(
    `
      SELECT DISTINCT u1.follower_id
      FROM user_follows u1
      JOIN user_follows u2 ON u1.follower_id = u2.following_id
      WHERE u1.following_id = ? AND u2.follower_id = ?
      LIMIT 3;
    `,
    [userXId, userYId]
  );

  if (response.error) {
    console.error("Error fetching mutual followers:", response.error.message);
    throw new Error(response.error.message);
  }

  return response.data; // This will contain the list of up to 3 users
};
import { useQuery } from "@tanstack/react-query";

export const useGetMutualFollowers = (userXId: string, userYId: string) => {
  return useQuery({
    queryKey: ["mutualFollowers", userXId, userYId],
    queryFn: () => fetchMutualFollowers(userXId, userYId),
    enabled: !!userXId && !!userYId, // This query will only run if both IDs are truthy
  });
};
