import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/supabase/types";

interface ExtendedUser extends IUser {
  walletType?: "smartwallet" | "eoa";
  invited?: boolean;
}

interface UserState {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser | null) => void;
  setWalletType: (walletType: "smartwallet" | "eoa") => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        // @dev Should only be true in development
        const isDevelopment = process.env.NODE_ENV === "development";
        set({
          user: user
            ? {
                ...user,
                invited: isDevelopment ? true : user.invited ?? false,
              }
            : null,
        });
      },
      setWalletType: (walletType) =>
        set((state) => ({
          user: state.user ? { ...state.user, walletType } : null,
        })),
    }),
    {
      name: "user-storage", 
      getStorage: () => localStorage,
    }
  )
);
