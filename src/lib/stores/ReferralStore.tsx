// @ts-nocheck
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ReferralState {
  referralId: string | null
  setReferralId: (id: string) => void
}
// prev: export const useReferralStore = create<ReferralState>()(
export const useReferralStore = create<ReferralState>(
  persist(
    (set) => ({
      referralId: null,
      setReferralId: (id: string) => set({ referralId: id }),
    }),
    {
      name: "referral-storage",
    }
  )
)
