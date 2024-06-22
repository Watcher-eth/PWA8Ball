// useUserStore.ts
import { create } from "zustand";
import { IUser } from "../supabase/mutations/updateUser";

interface UserState {
  user: (IUser & { balance?: string }) | null; // Add balance to User type
  setUser: (user: (IUser & { balance?: string }) | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // Initial user state is null
  setUser: (user) => set({ user }),
}));
