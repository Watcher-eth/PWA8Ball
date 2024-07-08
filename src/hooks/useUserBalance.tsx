import { useEffect, useState } from "react"
import { Address } from "viem"
import { getUSDCBalance } from "@/lib/onchain/contracts/Usdc"



export function useUserBalance({ userAddress }: { userAddress: Address }) {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  async function getUserBalances(userAddress: Address) {
    setIsLoading(true);
    const balance = await getUSDCBalance(userAddress);
    setBalance(Number(balance));
    setIsLoading(false);

    return balance;
  }

  useEffect(() => {
    getUserBalances(userAddress);
  }, [userAddress]);

  return {
    isLoading,
    balance,
  };
}