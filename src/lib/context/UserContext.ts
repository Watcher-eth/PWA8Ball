import create from "zustand";

// Define the User state type
interface UserState {
  isLoggedIn: boolean;
  profiles: any[]; // You can replace 'any' with a specific type for profiles
  friends: any[]; // You can replace 'any' with a specific type for friends
  setIsLoggedIn: (loggedIn: boolean) => void;
  setProfiles: (profiles: any[]) => void;
  setFriends: (friends: any[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  profiles: [],
  friends: [],
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setProfiles: (profiles) => set({ profiles: profiles }),
  setFriends: (friends) => set({ friends: friends }),
}));
