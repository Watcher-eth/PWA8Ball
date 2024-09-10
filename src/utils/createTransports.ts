import { Transport, type Chain } from "viem"
import { fallback, http } from "@wagmi/core"

// import { Chain } from "@/types/chain"
import { CHAINS_BY_ID } from "@/constants/chains"

type Transports = Record<Chain["id"], Transport>;

export function createTransports(chains: Chain[]): Transports {
  return chains.reduce<Transports>((acc, chain) => {
    // console.log(chain.rpcUrls.default.http[0]);
    // const apeChain = CHAINS_BY_ID[chain.id];
    console.log(chain)
    acc[chain.id] = fallback([
      http(chain.rpcUrls.default?.http[0] ?? chain.rpcUrls.primary),
        // http(apeChain.rpcUrls.primary),
      //   http(apeChain.rpcUrls.fallback),
    ])
    return acc;
  }, {});
};
