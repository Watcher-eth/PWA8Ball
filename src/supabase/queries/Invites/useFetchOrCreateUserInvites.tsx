import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/supabase/supabaseClient"

const fetchUserInvites = async (userAddress: string) => {
  const { data, error } = await supabase
    .from("invites")
    .select("*")
    .eq("created_by", userAddress)

  if (error) {
    console.error("Error fetching invites:", error.message)
    throw new Error(error.message)
  }

  return data
}

const createInvites = async (userAddress: string) => {
  const invites = Array.from({ length: 3 }, () => ({
    created_by: userAddress,
  }))

  const { data, error } = await supabase.from("invites").insert(invites)

  if (error) {
    console.error("Error creating invites:", error.message)
    throw new Error(error.message)
  }

  return data
}

export function useFetchOrCreateUserInvites(userAddress?: string) {
  const { mutateAsync: createInvitesMutation } = useMutation({
    mutationFn: createInvites,
    onError: (error: Error) => {
      console.error("Error creating invites:", error)
    },
    onSuccess: () => {
      console.log("Successfully created invites")
    },
  })

  return useQuery({
    queryKey: ["userInvites", userAddress],
    queryFn: async () => {
      if (!userAddress) {
        return []
      }
      const invites = await fetchUserInvites(userAddress)
      if (invites && invites.length > 0) {
        return invites
      } else {
        const newInvites = await createInvitesMutation(userAddress)

        return newInvites
      }
    },
    enabled: !!userAddress, // Ensure the query only runs when userAddress is provided
  })
}
