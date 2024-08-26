import {create} from "zustand";
import { persist } from "zustand/middleware";

interface ReferralState {
  referralId: string | null;
  setReferralId: (id: string) => void;
}

export const useReferralStore = create<ReferralState>(
  persist(
    (set) => ({
      referralId: null,
      setReferralId: (id: string) => set({ referralId: id }),
    }),
    {
      name: "referral-storage", // Name of the local storage item
    }
  )
);
