// useInitializeUser.ts
import "../../app/globals";
import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";

import { useEffect } from "react";
import { useGetUser } from "../drizzle/drizzle/supabase/queries/getUser";
import { useUserStore } from "../stores/UserStore";
import {
  getUserEmbeddedWallet,
  isNotCreated,
  useEmbeddedWallet,
  usePrivy,
} from "@privy-io/expo";
import { getUSDCBalance } from "../onchain/contracts/Usdc";
import { useUpdateUser } from "../drizzle/drizzle/supabase/mutations/updateUser";
import { checkWallet } from "./getWalletAddress";
import { getWalletClient } from "../onchain/Viem";
import { useSmartAccount } from "../onchain/SmartAccount";

export function useInitializeUser(userId: string , hasTwitterLinked: boolean) {
  const { data: user, error, isLoading } = useGetUser(userId);
  const setUser = useUserStore((state) => state.setUser);
  const { mutate: updateUser } = useUpdateUser();

  const { user: userPrivy } = usePrivy();
  const {  smartAccountAddress, eoa } =
    useSmartAccount();

    const handleFaucetRequest = async () => {
      try {
        const response = await fetch(
          "https://api-sandbox.coinflow.cash/api/faucet",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currency: "USDC",
              amount: {
                cents: 1000,
              },
              blockchain: "base",
              publicKey: smartAccountAddress,
            }),
          }
        );

        const data = await response.json();
      } catch (error) {}
    };

  useEffect(() => {
    async function getUserBalance() {
      if (userPrivy && hasTwitterLinked) {
        const walletaddress = smartAccountAddress

          if (smartAccountAddress && !user?.walletaddress) {

            console.log("params", smartAccountAddress, user?.walletaddress);
            const updates = { walletaddress: String(walletaddress) };
            const userid = userId ? userId: user?.external_auth_provider_user_id;
            updateUser(
              { userId: userid!, updates },
              {
                onSuccess: () => {
                  console.log("Smart accounts updated successfully.");
                },
                onError: (error) => {
                  console.error("Error updating social accounts:", error.message);
                },
              }
            );
          }
          const updatedUser1 = { ...user,  walletaddress };

          setUser(updatedUser1); 

        const balance = await getUSDCBalance(user?.walletaddress);
     
        const updatedUser = { ...user, balance, walletaddress };
        setUser(updatedUser); 
        // Update the Zustand store with the combined data

        if(balance < BigInt(20000000)){     
          handleFaucetRequest();
       }
      } else if(userPrivy && smartAccountAddress){
        const updatedUser = { ...user, userPrivy, walletaddress: smartAccountAddress };

        setUser(updatedUser)
      } else if (error) {
        console.error("Failed to fetch user:", error);
      }
    }
 
    
    if (smartAccountAddress) {
      console.log("updates")
        const updates = { walletaddress: smartAccountAddress! };

        updateUser(
          { userId, updates },
          {
            onSuccess: () => {
              console.log("Social accounts updated successfully.");
            },
            onError: (error) => {
              console.error("Error updating social accounts:", error.message);
            },
          }
        );
      }

      
    if (user) {
      
      getUserBalance();
    }
  }, [user, hasTwitterLinked, error, setUser, smartAccountAddress, eoa]);

  return { isLoading, error };
}
