// @ts-nocheck

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
import amplitude from "amplitude-js";
import { OG_API_SPLASH_URL } from "@/utils/urls";
import { CustomHead } from "@/components/CustomHead";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  console.log(router)
  console.log({pageProps})
  // const WrappedComponent = withDeviceCheck(Component);

  // amplitude.getInstance().init("YOUR_API_KEY");

  return (
    <>
      <CustomHead {...pageProps} router={router} />
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
            <Layout>
              {/* <WrappedComponent {...pageProps} /> */}
              <Component {...pageProps} />
            </Layout>
          </AuthChecker>
        </PrivyProvider>
      </QueryClientProvider>
    </>
  );
}
