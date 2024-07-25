import { create } from "zustand";
import { IUser } from "@/supabase/types";

interface ExtendedUser extends IUser {
  walletType?: "smartwallet" | "eoa";
}

interface UserState {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser | null) => void;
  setWalletType: (walletType: "smartwallet" | "eoa") => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  setWalletType: (walletType) => set((state) => ({
    user: state.user ? { ...state.user, walletType } : null,
  })),
}));
