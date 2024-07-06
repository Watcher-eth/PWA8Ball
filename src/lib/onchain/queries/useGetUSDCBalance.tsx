// hooks/useUSDCBalance.js
import { useQuery } from "@tanstack/react-query";
import { getUSDCBalance } from "../contracts/Usdc";
import type { Address } from "viem"
export const useUSDCBalance = (address: Address) => {
  return useQuery({
    queryKey: ["usdcBalance", address],
    queryFn: () => getUSDCBalance(address),

    enabled: !!address, // Only run the query if the address is provided
  });
};

//`0x${string}`