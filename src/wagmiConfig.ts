import type { Chain } from "viem"
import type { Config } from "wagmi"
import { createConfig } from "@wagmi/core"
// import { createConfig } from "@privy-io/wagmi" // SWAP: @wagmi/core with @privy-io/wagmi
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import {
  metaMaskWallet,
  rabbyWallet,
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  frameWallet,
  safeWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { toPrivyWallet } from "@privy-io/cross-app-connect"

import { createTransports } from "@/utils/createTransports"
import { SUPPORTED_CHAINS } from "@/constants/chains"

declare module "wagmi" {
  interface Register {
    config: Config
  }
}

const APP_DETAILS = {
  appName: "Glimpse",
  projectId: "<insert project id here>",
} as const

const privyWallet = toPrivyWallet({
  id: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  name: "PrivyWallet",
  iconUrl: "https://example.com/image.png",
})

console.log(privyWallet)

const WALLET_GROUPS = [
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet,
      coinbaseWallet,
      rabbyWallet,
      rainbowWallet,
      frameWallet,
    ],
  },
  {
    groupName: "Other",
    wallets: [
      injectedWallet,
      ledgerWallet,
      walletConnectWallet,
      trustWallet,
      safeWallet,
      privyWallet,
    ],
  },
]

const connectors = connectorsForWallets(WALLET_GROUPS, APP_DETAILS)

const transports = createTransports(SUPPORTED_CHAINS as Chain[])

export const wagmiConfig = createConfig({
  connectors,
  chains: SUPPORTED_CHAINS as unknown as readonly [Chain, ...Chain[]],
  transports,
  ssr: true,
})
