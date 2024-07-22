// @ts-nocheck

import { useEffect, useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useUserStore } from "@/lib/stores/UserStore";
import { getUSDCBalance } from "@/lib/onchain/contracts/Usdc";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import {
  getUserFromDB,
  createUserInDB,
  createUserFromEOAInDB,
} from "@/supabase/userApi";
import { useAccount } from "wagmi";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

const NAMESPACE = "10e62626-6a5d-45ef-96d8-02682a9977a7"; // Define a static namespace for generating UUIDs
const DEFAULT_PFP =
  "https://media.decentralized-content.com/-/rs:fit:1920:1920/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWZvMmZsZGVreHZ5dXFiYWczbHZjNjdpZTZxNXZmdnRmcGo1bm5zcmdyYWdrNTVxcHcyMmk";

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
        const balance = await getUSDCBalance(dbUser?.walletaddress);

        setUser({
          ...dbUser,
          balance,
          walletType: "smartwallet",
        });
      } else {
        const newUser = await createUserInDB(privyUser.id);
        newUser.pfp = DEFAULT_PFP;

        setUser({ ...newUser, balance: "0", walletType: "smartwallet" });
      }
    } else if (isConnected && eoaAddress) {
      // Handle EOA user
      const eoaUUID = uuidv5(eoaAddress, NAMESPACE);
      const dbUser = await getUserFromDB(eoaUUID);
      if (dbUser) {
        const balance = await getUSDCBalance(dbUser?.walletaddress);
        dbUser.pfp = DEFAULT_PFP;

        setUser({
          ...dbUser,
          walletType: "eoa",
          balance: balance,
        });
      } else {
        const newUser = await createUserFromEOAInDB(eoaUUID, eoaAddress);
        newUser.pfp = newUser?.pfp ?? DEFAULT_PFP;

        const balance = await getUSDCBalance(eoaAddress);

        setUser({
          ...newUser,
          balance: "0",
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
