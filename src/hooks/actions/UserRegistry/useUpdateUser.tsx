import { Address } from "viem"

import { useWriteUserRegistryUpdateUser } from "@/lib/onchain/generated"

export function useUpdateUser() {
  const {
    writeContractAsync: updateUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useWriteUserRegistryUpdateUser()

  async function handleUpdateUser({
    walletAddress,
    externalAuthProviderUserId,
    name,
    pfp = "",
    socials = "{}",
    theme = "",
    metadata = "",
    createdAt,
  }: {
    walletAddress: Address
    externalAuthProviderUserId: string
    name: string
    pfp?: string
    socials?: string
    theme?: string
    metadata?: string
    createdAt: number
  }) {
    const updatedAt = BigInt(Date.now())

    const updatedUserData = {
      createdAt: BigInt(createdAt),
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
