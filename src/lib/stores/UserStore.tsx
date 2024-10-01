// @ts-nocheck
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { replaceBigInts } from "@/utils/replaceBigInts"
import { User } from "@/__generated__/graphql"

interface ExtendedUser extends User {
  socials?: string
  walletType?: "smartwallet" | "eoa"
  invited?: boolean
  totalFollowers?: number
  totalFollowing?: number
}

interface UserState {
  user: ExtendedUser | null
  setUser: (user: ExtendedUser | null) => void
  setWalletType: (walletType: "smartwallet" | "eoa") => void
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        // @dev Should only be true in development
        const isDevelopment = process.env.NODE_ENV === "development"
        set({
          user: user
            ? {
                ...replaceBigInts(user),
                invited: isDevelopment ? true : user.invited ?? false,
              }
            : null,
        })
      },
      setWalletType: (walletType) =>
        set((state) => ({
          user: state.user ? { ...state.user, walletType } : null,
        })),
    }),
    {
      name: "user-storage",
      // getStorage: () => localStorage,
    }
  )
)
