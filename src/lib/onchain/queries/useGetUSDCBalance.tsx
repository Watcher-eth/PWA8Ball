// hooks/useUSDCBalance.js
import { useQuery } from "@tanstack/react-query";
import { getUSDCBalance } from "../contracts/Usdc";

export const useUSDCBalance = (address: `0x${string}`) => {
  return useQuery({
    queryKey: ["usdcBalance", address],
    queryFn: () => getUSDCBalance(address),

    enabled: !!address, // Only run the query if the address is provided
  });
};
