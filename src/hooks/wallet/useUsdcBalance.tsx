import { type Address } from "viem"
import { useTokenBalance } from "@/hooks/wallet/useTokenBalance"
import { UsdcConfig } from "@/constants/contracts/usdc"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"

export function useUsdcBalance({ address }: { address?: Address }) {
  const balance = useTokenBalance({
    tokenAddress: UsdcConfig.address[DEFAULT_CHAIN_ID],
    address,
  })

  return balance
}
