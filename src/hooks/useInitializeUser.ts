// @ts-nocheck

import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useUserStore } from "@/lib/stores/UserStore";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import {
  getUserFromDB,
  createUserInDB,
  createUserFromEOAInDB,
} from "@/supabase/userApi";
import { useAccount } from "wagmi";
import { v5 as uuidv5 } from "uuid";

const NAMESPACE = "10e62626-6a5d-45ef-96d8-02682a9977a7"; // Define a static namespace for generating UUIDs
const DEFAULT_PFP =
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQalRrZ3DhpviKTK_4Mn_uCvClxYNP5QntBI2GluPXMX77Ps3A6";

export function useInitializeUser() {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { user, setUser, setWalletType } = useUserStore();
  const { smartAccountAddress } = useSmartAccount();
  const { address: eoaAddress, isConnected } = useAccount();

  async function fetchUser() {
    if (ready && authenticated && privyUser) {
      // Handle Privy smart wallet user
      const dbUser = await getUserFromDB(privyUser?.id);
      if (dbUser) {
        console.log({ dbUser });
        setUser({
          ...dbUser,
          walletType: "smartwallet",
        });
      } else {
        const newUser = await createUserInDB(privyUser.id);
        newUser.pfp = DEFAULT_PFP;

        setUser({ ...newUser, walletType: "smartwallet" });
      }
    } else if (isConnected && eoaAddress) {
      // Handle EOA user
      const eoaUUID = uuidv5(eoaAddress, NAMESPACE);
      const dbUser = await getUserFromDB(eoaUUID);
      if (dbUser) {
        dbUser.pfp = DEFAULT_PFP;

        setUser({
          ...dbUser,
          walletType: "eoa",
        });
      } else {
        const newUser = await createUserFromEOAInDB(eoaUUID, eoaAddress);
        newUser.pfp = newUser?.pfp ?? DEFAULT_PFP;

        setUser({
          ...newUser,
          walletType: "eoa",
          name: eoaAddress,
        });
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, [
    ready,
    authenticated,
    privyUser,
    smartAccountAddress,
    isConnected,
    eoaAddress,
  ]);
}
