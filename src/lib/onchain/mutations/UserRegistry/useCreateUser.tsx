import { useMutation } from "@tanstack/react-query"
import { Address, getContract } from "viem"
import { SmartAccountClient } from "permissionless"
import { UserRegistryAbi, UserRegistryAddress } from "../../generated"

interface CreateUserParams {
  walletAddress: Address
  externalAuthProviderUserId: string
  name: string
  pfp?: string
  socials?: string
  theme?: string
  metadata?: string
  client: SmartAccountClient
}
async function createUser(props: CreateUserParams) {
  if (!props) {
    throw new Error("All fields must be provided")
  }
  try {
    const createdAt = BigInt(Date.now())
    const updatedAt = createdAt

    const userData = {
      createdAt,
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

    // Initialize the market
    const hash = await contract.write.createUser(
      [props.walletAddress, userData],
      {}
    )
    console.log("hash", hash)
  } catch (error) {
    console.error("Error creating user", error)
    throw error // Rethrow the error after logging it
  }
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (variables, data) => {},
    onError: (error) => {
      console.error("Error creating user", error)
    },
  })
}
