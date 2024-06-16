import "@/styles/globals.css";
import { siweClient } from "@/utils/siweClient";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { AppProps } from "next/app";
import { polygon, polygonMumbai } from "viem/chains";
import { WagmiConfig, createConfig } from "wagmi";
const chains = [polygon, polygonMumbai];
import {
  LensConfig,
  LensProvider,
  development,
  production,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { APP_DESCRIPTION, APP_NAME, network } from "@/utils/consts";
import { LocalStorageProvider } from "@/lib/shared/LocalStorageProvider";
import {
  LensClient,
  production as LensProduction,
} from "@lens-protocol/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Layout from "@/components/Common/Layout";
import { ProfileProvider } from "@/lib/context/context";
import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";
import { Toaster } from "@/components/ui/sonner";
export const queryClient = new QueryClient();

//Wagmi and connectKit config
const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains,
    appName: "Blitz",
    appDescription: "or it didnt happen...",
    appUrl: "https://tryblitz.xyz", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <siweClient.Provider>
          <ThirdwebProvider
            activeChain="polygon"
            clientId="b5a7b992f2eba0465fc15efb724b92c4"
            supportedWallets={[embeddedWallet()]}
          >
            <ConnectKitProvider theme="nouns">
              <Head>
                <meta name="application-name" content={APP_NAME} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content={APP_NAME} />
                <meta name="description" content={APP_DESCRIPTION} />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                  name="apple-mobile-web-app-status-bar-style"
                  content="black-translucent"
                />
                <meta name="theme-color" content="#FFFFFF" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/icons/AppIcon512.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
              </Head>
              <Component {...pageProps} />
            </ConnectKitProvider>
          </ThirdwebProvider>
        </siweClient.Provider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
