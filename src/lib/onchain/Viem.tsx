import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";

import {
  EmbeddedWalletState,
  getUserEmbeddedWallet,
  isConnected,
  useEmbeddedWallet,
  usePrivy,
} from "@privy-io/expo";
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
import { PrivyUser } from "@privy-io/public-api";

export async function getWalletClient(
  user: PrivyUser | null,
  wallet: EmbeddedWalletState
) {
  const account = getUserEmbeddedWallet(user);

  const walletClient = createWalletClient({
    account: account?.address as `0x${string}`,
    chain: baseSepolia,
    transport: fallback([
      custom(wallet.provider),
      http(
        "https://base-sepolia.g.alchemy.com/v2/zBh4KLxjpr1p3LncaGuHwgOA_X3J0b5F"
      ),
    ]),
  });
  return walletClient;
}

export const rpcClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export function useWalletClient() {
  const wallet = useEmbeddedWallet();
  const { user } = usePrivy();

  const account = getUserEmbeddedWallet(user);

  const walletClient = useMemo(() => {
    if (!wallet.provider || !account) return null;

    return createWalletClient({
      account: account.address,
      chain: baseSepolia,
      transport: custom({
        async request({ method, params }) {
          return await wallet.provider.request({ method, params });
        },
      }),
    });
  }, [wallet.provider, account]);

  return walletClient;
}
