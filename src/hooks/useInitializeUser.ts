// @ts-nocheck

import { useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useAccount } from "wagmi"
import { v5 as uuidv5 } from "uuid"
import { useUserStore } from "@/lib/stores/UserStore"
import { useSmartAccount } from "@/lib/onchain/SmartAccount"

import { useUpsertUser } from "@/graphql/queries/users/useUpsertUser"
import { getUserById } from "@/graphql/queries/users/useUserById"

import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress"
import { useGetTotalFollowers } from "@/supabase/queries/user/useGetTotalFollowers"
import { useGetTotalFollowing } from "@/supabase/queries/user/getTotalFollowing"

const NAMESPACE = "10e62626-6a5d-45ef-96d8-02682a9977a7" // Define a static namespace for generating UUIDs
const DEFAULT_PFP =
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQalRrZ3DhpviKTK_4Mn_uCvClxYNP5QntBI2GluPXMX77Ps3A6"

export function useInitializeUser() {
  const { ready, authenticated, user: privyUser } = usePrivy()
  const { user, setUser, setWalletType } = useUserStore()
  const { smartAccountAddress, smartAccountClient } = useSmartAccount()
  const { address: eoaAddress, isConnected } = useAccount()
  const { upsertUser } = useUpsertUser()
  const { data: followersCount } = useGetTotalFollowers(user?.walletAddress)
  const { data: followingCount } = useGetTotalFollowing(user?.walletAddress)

  console.log("addyy", smartAccountAddress, smartAccountClient)

  async function fetchUser() {
    if (ready && authenticated && privyUser && !eoaAddress) {
      const dbUser = await getUserById(smartAccountAddress)
      console.log("privyUser", privyUser, dbUser, smartAccountAddress)

      if (privyUser) {
        setUser({
          walletType: "smartwallet",
        })
      }
      if (dbUser) {
        console.log({ dbUser })
        setUser({
          ...dbUser,
          pfp: dbUser?.pfp ? dbUser?.pfp : DEFAULT_PFP,
          walletType: "smartwallet",
          totalFollowers: followersCount,
          totalFollowing: followingCount,
        })
      } else if (smartAccountAddress && user?.walletType !== "eoa") {
        const update = {
          id: smartAccountAddress,
          walletAddress: smartAccountAddress,
          name: user?.name,
          pfp: user?.pfp,
          socials: user?.socials,
          externalAuthProviderUserId: privyUser?.id,
          updatedAt: BigInt(Math.floor(Date.now() / 1000)),
          createdAt: BigInt(Math.floor(Date.now() / 1000)),
          totalFollowers: followersCount,
          totalFollowing: followingCount,
        }

        const newUser = await upsertUser(update)

        newUser.pfp = DEFAULT_PFP

        setUser({
          ...update,
          walletType: "smartwallet",
        })
      }
    } else if (isConnected && eoaAddress) {
      // Handle EOA user
      const eoaUUID = uuidv5(eoaAddress, NAMESPACE)
      const dbUser = await getUserById(eoaAddress)

      if (dbUser) {
        setUser({
          ...dbUser,
          name: dbUser?.name ? dbUser?.name : "Anon",
          pfp: dbUser?.pfp ? dbUser?.pfp : DEFAULT_PFP,
          walletType: "eoa",
          totalFollowers: followersCount,
          totalFollowing: followingCount,
        })
      } else {
        const update = {
          id: getChecksummedAddress(eoaAddress),
          walletAddress: getChecksummedAddress(eoaAddress),
          name: user?.name,
          pfp: user?.pfp,
          externalAuthProviderUserId: eoaUUID,
          updatedAt: BigInt(Math.floor(Date.now() / 1000)),
          createdAt: BigInt(Math.floor(Date.now() / 1000)),
          totalFollowers: followersCount,
          totalFollowing: followingCount,
        }
        console.log("updaze eoa", update)
        const newUser = await upsertUser(update)
        newUser.pfp = newUser?.pfp ?? DEFAULT_PFP

        setUser({
          ...update,
          walletType: "eoa",
          name: user?.name,
        })
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [
    ready,
    authenticated,
    privyUser,
    smartAccountAddress,
    isConnected,
    eoaAddress,
    followersCount,
  ])
}
