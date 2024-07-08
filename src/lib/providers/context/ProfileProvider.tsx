// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useUserStore } from "./UserContext";


type ContextData = {
  setSelectedProfile: Dispatch<SetStateAction>;
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const ProfileContext = createContext<ContextData>(null);
ProfileContext.displayName = "ProfileContext";

export const useProfile = (): ContextData => {
  return useContext(ProfileContext);
};

export function ProfileProvider({ children }: { children?: ReactNode }) {
  const userStore = useUserStore();
  //Get User
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState({});


  return (
    <ProfileContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        setSelectedProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

