import { useWriteUserRegistryCreateUser } from "@/lib/onchain/generated"
import { Address } from "viem"


export function useCreateUser() {
  const {
    writeContractAsync: createUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useWriteUserRegistryCreateUser()

  async function handleCreateUser({
    walletAddress,
    externalAuthProviderUserId,
    name,
    pfp = "",
    socials = "{}",
    theme = "",
    metadata = "",
  }: {
    walletAddress: Address
    externalAuthProviderUserId: string
    name: string
    pfp?: string
    socials?: string
    theme?: string
    metadata?: string
  }) {
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
