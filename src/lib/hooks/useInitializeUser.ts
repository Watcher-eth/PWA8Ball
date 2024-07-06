// @ts-nocheck
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useUserStore } from "@/lib/stores/UserStore";
import { getUSDCBalance } from "@/lib/onchain/contracts/Usdc";
import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { getUserFromDB, createUserInDB } from "@/lib/supabase/userApi";

export function useInitializeUser() {
  const { ready, authenticated, user: privyUser } = usePrivy();
  const { user, setUser } = useUserStore();
  const { smartAccountAddress } = useSmartAccount();

  async function fetchUser() {
    if (ready && authenticated && privyUser) {
      // Check if user exists in the database
      const dbUser = await getUserFromDB(privyUser?.id);
      if (dbUser) {
        // Update user context with DB values
        console.log("dbUser", dbUser);
        const balance = await getUSDCBalance(dbUser?.walletaddress);
        setUser({ ...dbUser, balance });
        console.log("Balance", balance, smartAccountAddress);
      } else {
        // Create new user in DB
        const newUser = await createUserInDB(privyUser.id);
        setUser({ ...newUser, balance: "0" });
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, [ready, authenticated, privyUser, smartAccountAddress]);
}
