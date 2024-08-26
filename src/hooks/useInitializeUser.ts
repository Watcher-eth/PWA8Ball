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
import { useUpsertUser } from "@/graphql/queries/users/useUpsertUser";
import { serialize } from "@wagmi/core";
import { getChecksummedAddress } from "@/utils/address/getChecksummedAddress";

const NAMESPACE = "10e62626-6a5d-45ef-96d8-02682a9977a7"; // Define a static namespace for generating UUIDs
const DEFAULT_PFP =
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQalRrZ3DhpviKTK_4Mn_uCvClxYNP5QntBI2GluPXMX77Ps3A6";

export function useInitializeUser() {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { user, setUser, setWalletType } = useUserStore();
  const { smartAccountAddress } = useSmartAccount();
  const { address: eoaAddress, isConnected } = useAccount();
  const { upsertUser } = useUpsertUser();

  async function fetchUser() {
    if (ready && authenticated && privyUser && !eoaAddress) {
      // Handle Privy smart wallet user
      const dbUser = await getUserFromDB(smartAccountAddress);
      if (dbUser) {
        console.log({ dbUser });
        setUser({
          ...dbUser,
          pfp: dbUser?.pfp ? dbUser?.pfp : DEFAULT_PFP,
          walletType: "smartwallet",
        });
      } else if (smartAccountAddress && user?.walletType !== "eoa") {
        const update = {
          id: smartAccountAddress,
          walletAddress: smartAccountAddress,
          name: user?.name,
          pfp: user?.pfp,
          socials: user?.socials,
          externalAuthProviderUserId: privyUser?.id,
          updatedAt: BigInt(Math.floor(Date.now() / 1000)),
          createdAt: BigInt(Math.floor(Date.now() / 1000)),
        };

        const newUser = await upsertUser(update);

        newUser.pfp = DEFAULT_PFP;

        setUser({ ...update, walletType: "smartwallet" });
      }
    } else if (isConnected && eoaAddress) {
      // Handle EOA user
      const eoaUUID = uuidv5(eoaAddress, NAMESPACE);
      const dbUser = await getUserFromDB(eoaAddress);
      console.log("dbuser2", dbUser, eoaAddress);

      if (dbUser) {
        setUser({
          ...dbUser,
          pfp: dbUser?.pfp ? dbUser?.pfp : DEFAULT_PFP,
          walletType: "eoa",
        });
      } else {
        const update = {
          id: getChecksummedAddress(eoaAddress),
          walletAddress: getChecksummedAddress(eoaAddress),
          name: user?.name,
          pfp: user?.pfp,
          externalAuthProviderUserId: eoaUUID,
          updatedAt: BigInt(Math.floor(Date.now() / 1000)),
          createdAt: BigInt(Math.floor(Date.now() / 1000)),
        };

        const newUser = await upsertUser(update);
        newUser.pfp = newUser?.pfp ?? DEFAULT_PFP;

        setUser({
          ...update,
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
