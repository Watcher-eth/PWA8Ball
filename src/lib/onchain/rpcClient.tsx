// @ts-nocheck

import { createPublicClient, http } from "viem"
import { DEFAULT_CHAIN } from "@/constants/chains"

export const rpcClient = createPublicClient({
  chain: DEFAULT_CHAIN,
  transport: http(),
})
