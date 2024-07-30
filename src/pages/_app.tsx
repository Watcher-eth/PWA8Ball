// @ts-nocheck
import "@/styles/fonts.css";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";


import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { base, baseSepolia, mainnet } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { init, AirstackProvider } from "@airstack/airstack-react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PrivyProvider } from "@privy-io/react-auth";

import { SonnerToaster } from "@/components/ui/SonnerToaster";

import { AuthChecker } from "@/providers/AuthProvider";
import { GraphQlProvider } from "@/providers/GraphQlProvider";

import { useServiceWorker } from "@/hooks/useServiceWorker"; // Import the hook

import { CustomHead } from "@/components/layouts/CustomHead";
import { RootLayout } from "@/components/layouts/RootLayout";

export const queryClient = new QueryClient();

const PRIVY_CONFIG = {
  loginMethods: ["email", "wallet", "google", "farcaster", "apple", "twitter"],
  appearance: {
    theme: "dark",
    accentColor: "#0050FF",
    logo: "https://your-logo-url",
  },
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    noPromptOnSignature: true,
  },
};

export const wagmiConfig = getDefaultConfig({
  appName: "8Ball",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [baseSepolia, base, mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function App({ Component, pageProps, router }: AppProps) {
  // console.log(router)
  // console.log({pageProps})
  // amplitude.getInstance().init("YOUR_API_KEY");
  useServiceWorker(); // Use the custom hook

  return (
    <>
      <CustomHead {...pageProps} router={router} />
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AirstackProvider
            apiKey={process.env.NEXT_PUBLIC_PUBLIC_AIRSTACK ?? ""}
          >
            <PrivyProvider
              appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
              config={PRIVY_CONFIG}
            >
              <AuthChecker>
                <RainbowKitProvider coolMode>
                  <GraphQlProvider>
                    <RootLayout>
                      <Component {...pageProps} />
                    </RootLayout>
                  </GraphQlProvider>
                </RainbowKitProvider>
              </AuthChecker>
            </PrivyProvider>
          </AirstackProvider>
        </QueryClientProvider>
      </WagmiProvider>
      {/**Need to check if this is valid*/}
      <SonnerToaster
        position="top-center"
        className="bg-[#121212] rounded-xl z-100"
      />
    </>
  );
}
