// @ts-nocheck

import { useEffect } from "react";
import { useUserStore } from "../stores/UserStore";
import { getUSDCBalance } from "../onchain/contracts/Usdc";
const useUSDCBalanceUpdater = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user?.walletaddress) return;

    const fetchUSDCBalance = async () => {
      try {
        const balance = await getUSDCBalance(
          user.walletaddress as `0x${string}`
        );
        const adjustedBalance = balance / BigInt(10 ** 5);
        console.log("balance2", adjustedBalance);
        setUser(...user, adjustedBalance);
      } catch (error) {
        console.error("Failed to fetch USDC balance:", error);
      }
    };

    // Fetch balance immediately
    fetchUSDCBalance();

    // Set interval to fetch balance every 5 minutes (300000 ms)
    const intervalId = setInterval(fetchUSDCBalance, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [user?.walletaddress, setUser]);
};

export default useUSDCBalanceUpdater;
