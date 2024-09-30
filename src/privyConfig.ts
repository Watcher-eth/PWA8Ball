import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth"

import { DEFAULT_CHAIN } from "@/constants/chains"

export const PRIVY_CONFIG: PrivyClientConfig = {
  loginMethods: [
    "email",
    "wallet",
    "google",
    "farcaster",
    "apple",
    "twitter",
    "wallet",
  ],
  appearance: {
    theme: "dark",
    accentColor: "#0050FF",
    logo: "https://your-logo-url",
  },
  defaultChain: DEFAULT_CHAIN,
  supportedChains: [DEFAULT_CHAIN], // , base, mainnet
  // embeddedWallets: {
  //   createOnLogin: "users-without-wallets",
  //   noPromptOnSignature: true,
  // },
}