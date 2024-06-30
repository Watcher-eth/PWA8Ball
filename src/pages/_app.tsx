import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { polygon, polygonMumbai } from "viem/chains";
const chains = [polygon, polygonMumbai];

import { APP_DESCRIPTION, APP_NAME, network } from "@/utils/constants";
import { LocalStorageProvider } from "@/lib/shared/LocalStorageProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Layout from "@/components/Common/Layout";
import { Toaster } from "@/components/ui/sonner";
import { PrivyProvider } from "@privy-io/react-auth";
import AuthChecker from "@/lib/providers/AuthProvider";
import LoginModal from "@/components/Modals/LoginModal";
import withDeviceCheck from "@/components/Common/MobileOnly";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const WrappedComponent = withDeviceCheck(Component);

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
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
        }}
      >
        <AuthChecker>
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
          <Layout>
            <WrappedComponent {...pageProps} />
          </Layout>
        </AuthChecker>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
