// @ts-nocheck

import { useQuery } from "@tanstack/react-query";
import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { lensClient } from "../../pages/_app";
import { useUserStore } from "./UserContext";

import { createWalletClient, custom } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygon } from "viem/chains";

type ContextData = {
  setSelectedProfile: Dispatch<SetStateAction>;
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const ProfileContext = createContext<ContextData>(null);
ProfileContext.displayName = "ProfileContext";

export const useProfile = (): ContextData => {
  return useContext(ProfileContext);
};

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

export default ProfileContext;
