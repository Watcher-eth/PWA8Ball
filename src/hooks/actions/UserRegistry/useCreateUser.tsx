import { useWriteUserRegistryCreateUser } from "@/lib/onchain/generated"
import { Address } from "viem"

interface CreateUserParams {
  walletAddress: Address
  externalAuthProviderUserId: string
  name: string
  pfp?: string
  socials?: string
  theme?: string
  metadata?: string
}

export const useCreateUser = () => {
  const {
    writeContractAsync: createUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useWriteUserRegistryCreateUser()

  const handleCreateUser = async ({
    walletAddress,
    externalAuthProviderUserId,
    name,
    pfp = "",
    socials = "{}",
    theme = "",
    metadata = "",
  }: CreateUserParams) => {
    const createdAt = BigInt(Date.now())
    const updatedAt = createdAt

    const userData = {
      createdAt,
      updatedAt,
      id: walletAddress,
      externalAuthProviderUserId,
      name,
      pfp,
      socials,
      theme,
      metadata,
    }

    try {
      const res = await createUser({ args: [walletAddress, userData] })
      console.log("res", res)
    } catch (err) {
      console.error("Error creating user:", err)
    }
  }

  return {
    handleCreateUser,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
