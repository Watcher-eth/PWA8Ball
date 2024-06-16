// useUserStore.ts
import { create } from "zustand";
import { User } from "../drizzle/schema";

interface UserState {
  user: (User & { balance?: string }) | null; // Add balance to User type
  setUser: (user: (User & { balance?: string }) | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // Initial user state is null
  setUser: (user) => set({ user }),
}));
