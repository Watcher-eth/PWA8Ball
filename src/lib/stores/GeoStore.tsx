// useAppBlockStore.ts
import { create } from "zustand";

type AppState = {
  isBlocked: boolean;
  checkGeoBlock: () => Promise<void>;
};

export const useAppBlockStore = create<AppState>((set) => ({
  isBlocked: false,
  checkGeoBlock: async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual IPinfo API key
      const response = await fetch("https://ipinfo.io?token=YOUR_API_KEY");
      const { country } = await response.json();
      // Assuming you want to block 'US' country
      if (country === "US") {
        set({ isBlocked: true });
      }
    } catch (error) {
      console.error("Error fetching IP info:", error);
    }
  },
}));
