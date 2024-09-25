import { useMutation } from "@tanstack/react-query"
import { Address, getContract } from "viem"
import { SmartAccountClient } from "permissionless"
import { UserRegistryAbi, UserRegistryAddress } from "../../generated"

interface UpdateUserParams {
  walletAddress: Address
  externalAuthProviderUserId: string
  name: string
  pfp?: string
  socials?: string
  theme?: string
  metadata?: string
  client: SmartAccountClient
}

async function updateUser(props: UpdateUserParams) {
  if (!props) {
    throw new Error("All fields must be provided")
  }
  try {
    const updatedAt = BigInt(Date.now())

    const updatedUserData = {
      updatedAt,
      id: props.walletAddress,
      externalAuthProviderUserId: props.externalAuthProviderUserId,
      name: props.name,
      pfp: props.pfp ? props.pfp : "",
      socials: props.socials ? props?.socials : "{}",
      theme: props.theme ? props?.theme : "",
      metadata: props.metadata ? props.metadata : "",
    }

    const contract = getContract({
      abi: UserRegistryAbi,
      address: UserRegistryAddress[84532],
      client: { public: props.client, wallet: props.client },
    })

    const hash = await contract.write.updateUser(
      [props.walletAddress, updatedUserData],
      {}
    )
    console.log("User updated, transaction hash:", hash)
  } catch (error) {
    console.error("Error updating user", error)
    throw error
  }
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, variables) => {
      console.log("User successfully updated:", data)
    },
    onError: (error) => {
      console.error("Error updating user:", error)
    },
  })
}
