// @ts-nocheck

import { createPublicClient, http } from "viem"
import { baseSepolia } from "viem/chains"

export const rpcClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
})
