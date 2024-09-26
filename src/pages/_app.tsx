import "@/styles/fonts.css"
import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import type { AppProps } from "next/app"
import { WagmiProvider } from "wagmi"
// import { WagmiProvider } from "@privy-io/wagmi" // SWAP: wagmi with @privy-io/wagmi
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { init, AirstackProvider } from "@airstack/airstack-react"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth"
// import * as amplitude from "@amplitude/analytics-browser";
import "../utils/patch"
import { SonnerToaster } from "@/components/ui/SonnerToaster"

import { AuthChecker } from "@/providers/AuthProvider"
import { GraphQlProvider } from "@/providers/GraphQlProvider"

import { useServiceWorker } from "@/hooks/useServiceWorker" // Import the hook

import { CustomHead } from "@/components/layouts/CustomHead"
import { RootLayout } from "@/components/layouts/RootLayout"

import { wagmiConfig } from "@/wagmiConfig"
import { base, baseSepolia, mainnet } from "viem/chains"
export const queryClient = new QueryClient()

const PRIVY_CONFIG: PrivyClientConfig = {
  loginMethods: ["email", "wallet", "google", "farcaster", "apple", "twitter"],
  appearance: {
    theme: "dark",
    accentColor: "#0050FF",
    logo: "https://your-logo-url",
  },
  defaultChain: baseSepolia,
  supportedChains: [baseSepolia], // , base, mainnet
  // embeddedWallets: {
  //   createOnLogin: "users-without-wallets",
  //   noPromptOnSignature: true,
  // },
}

// export const wagmiConfig = getDefaultConfig({
//   appName: "8Ball",
//   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
//   chains: [baseSepolia, base, mainnet],
//   connectors: [injected()],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });

export default function App({ Component, pageProps, router }: AppProps) {
  // console.log(router)
  // console.log({pageProps})
  // this breaks the next build... monke sooooooo shocked
  // amplitude.init("3b52857bdc943ed9b3ec5ac60e5dbba1", {
  //   autocapture: { elementInteractions: true },
  // });
  useServiceWorker() // Use the custom hook

  return (
    <>
      <CustomHead {...pageProps} router={router} />
      <SonnerToaster
        position="top-center"
        className="bg-[#121212] rounded-xl z-100"
      />
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={PRIVY_CONFIG}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider useConfig={wagmiConfig} config={wagmiConfig}>
            <AirstackProvider
              apiKey={process.env.NEXT_PUBLIC_PUBLIC_AIRSTACK ?? ""}
            >
              <RainbowKitProvider coolMode>
                <GraphQlProvider>
                  <RootLayout>
                    <AuthChecker>
                      <Component {...pageProps} />
                    </AuthChecker>
                  </RootLayout>
                </GraphQlProvider>
              </RainbowKitProvider>
            </AirstackProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
      {/**Need to check if this is valid*/}
    </>
  )
}
