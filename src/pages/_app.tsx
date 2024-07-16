// @ts-nocheck
import "@rainbow-me/rainbowkit/styles.css";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { init, AirstackProvider } from "@airstack/airstack-react";

import { Layout } from "@/components/Common/Layout";
import { SonnerToaster } from "@/components/ui/SonnerToaster";
import { PrivyProvider } from "@privy-io/react-auth";
import { AuthChecker } from "@/lib/providers/AuthProvider";

import { useServiceWorker } from "@/hooks/useServiceWorker"; // Import the hook
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { CustomHead } from "@/components/CustomHead";
import { DrawerProvider } from "@/lib/stores/DrawerContext";
import { base, baseSepolia } from "viem/chains";

export const queryClient = new QueryClient();

const PRIVY_CONFIG = {
  loginMethods: ["email", "wallet", "google", "farcaster"],
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

export default function App({ Component, pageProps, router }: AppProps) {
  // console.log(router)
  // console.log({pageProps})

  // amplitude.getInstance().init("YOUR_API_KEY");
  useServiceWorker(); // Use the custom hook

  const config = getDefaultConfig({
    appName: "8Ball",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [baseSepolia, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  return (
    <>
      <CustomHead {...pageProps} router={router} />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <AirstackProvider
            apiKey={process.env.NEXT_PUBLIC_PUBLIC_AIRSTACK ?? ""}
          >
            <PrivyProvider
              appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
              config={PRIVY_CONFIG}
            >
              <AuthChecker>
                <DrawerProvider>
                  <RainbowKitProvider coolMode>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </RainbowKitProvider>
                </DrawerProvider>
              </AuthChecker>
            </PrivyProvider>
          </AirstackProvider>
        </QueryClientProvider>
      </WagmiProvider>
      {/**Need to check if this is valid*/}
      <SonnerToaster
        position="top-center"
        style={{ zIndex: 100 }}
        className="bg-gray-200 rounded-xl"
      />
    </>
  );
}
