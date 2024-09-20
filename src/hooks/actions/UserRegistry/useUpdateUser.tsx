import { useWriteUserRegistryUpdateUser } from "@/lib/onchain/generated"

interface UpdateUserParams {
  walletAddress: `0x${string}`
  externalAuthProviderUserId: string
  name: string
  pfp?: string
  socials?: string
  theme?: string
  metadata?: string
}

export const useUpdateUser = () => {
  const {
    writeContractAsync: updateUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useWriteUserRegistryUpdateUser()

  const handleUpdateUser = async ({
    walletAddress,
    externalAuthProviderUserId,
    name,
    pfp = "",
    socials = "{}",
    theme = "",
    metadata = "",
  }: UpdateUserParams) => {
    const updatedAt = BigInt(Date.now())

    const updatedUserData = {
      createdAt: BigInt(0),
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
      await updateUser({ args: [walletAddress, updatedUserData] })
    } catch (err) {
      console.error("Error updating user:", err)
    }
  }

  return {
    handleUpdateUser,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
