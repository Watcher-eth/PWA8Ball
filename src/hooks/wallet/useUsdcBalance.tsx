import { type Address } from "viem";
import { useTokenBalance } from "@/hooks/wallet/useTokenBalance";
import { BASE_SEPOLIA_USDC_ADDRESS } from "@/constants/_Onchain";


export function useUsdcBalance({ address }: { address?: Address }) {
  const balance = useTokenBalance({
    tokenAddress: BASE_SEPOLIA_USDC_ADDRESS,
    address
  });

  return balance;
}