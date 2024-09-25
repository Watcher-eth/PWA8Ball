
import { mainnet, base, baseSepolia } from "@wagmi/core/chains"

import { BASE_SEPOLIA, ETH } from "@/constants/chains/master"


export const SUPPORTED_CHAINS = [
  {
    ...BASE_SEPOLIA,
    iconUrl: BASE_SEPOLIA.chainImg.src,
    iconBackground: "transparent",
  },
  base,
  {
    ...mainnet,
    iconUrl: ETH.chainImg.src,
    iconBackground: "transparent",
  },
  // mainnet,
].map((chain) => {
  return {
    ...chain,
    // configRpc: CHAINS_BY_ID[chain.id]?.rpcUrls.primary,
    // fallbackRpc: CHAINS_BY_ID[chain.id]?.rpcUrls.fallback,
    // iconUrl: CHAINS_BY_ID[chain.id]?.chainImg.src,
  }
})

export const SUPPORTED_CHAIN_IDS = SUPPORTED_CHAINS.map((chain) => chain.id)

export function isSupportedChain(chainId: number) {
  return SUPPORTED_CHAIN_IDS.includes(Number(chainId))
}

export function isSupportedAndTargetChain({
  chainId,
  targetChainId,
}: {
  chainId: number
  targetChainId?: number
}) {
  return (
    isSupportedChain(chainId) &&
    (targetChainId ? Number(chainId) === Number(targetChainId) : true)
  )
}
