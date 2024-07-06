// useUserStore.ts
import { create } from "zustand";
import { IUser } from "@/lib/supabase/types";


interface ExtendedUser extends IUser {
  balance?: string;
}

interface UserState {
  user: ExtendedUser | null; // Add balance to User type
  setUser: (user: ExtendedUser | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // Initial user state is null
  setUser: (user) => set({ user }),
}));
