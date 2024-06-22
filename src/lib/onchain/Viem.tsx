
import {
  createPublicClient,
  createWalletClient,
  custom,
  fallback,
  http,
} from "viem";
import { baseGoerli, baseSepolia } from "viem/chains";
import { checkWallet } from "../hooks/getWalletAddress";
import { useMemo } from "react";


export const rpcClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});


