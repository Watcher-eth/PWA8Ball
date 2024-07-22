import { type Address } from "viem";
import { USDC_ADDRESS } from "@/lib/onchain/contracts/Usdc";
import { useTokenBalance } from "@/hooks/wallet/useTokenBalance";


export function useUsdcBalance({ address }: { address?: Address }) {
  const balance = useTokenBalance({
    tokenAddress: USDC_ADDRESS,
    address
  });

  return balance;
}