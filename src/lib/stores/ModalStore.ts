// stores/ModalStore.ts
import { create } from "zustand"



export const useModalStore = create<{
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))
