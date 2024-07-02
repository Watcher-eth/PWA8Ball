// @ts-nocheck

import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { init, AirstackProvider } from "@airstack/airstack-react";

import Layout from "@/components/Common/Layout";
import { Toaster } from "@/components/ui/sonner";
import { PrivyProvider } from "@privy-io/react-auth";
import AuthChecker from "@/lib/providers/AuthProvider";
import LoginModal from "@/components/Modals/LoginModal";

import amplitude from "amplitude-js";
import { useServiceWorker } from "@/lib/hooks/useServiceWorker"; // Import the hook

import { CustomHead } from "@/components/CustomHead";
import { DrawerProvider } from "@/lib/stores/DrawerContext";
import withDeviceCheck from "@/components/Common/MobileOnly";
import MobileOnlyModal from "@/components/Modals/MobileOnlyModal";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  // console.log(router)
  // console.log({pageProps})
  const CheckedComponent = withDeviceCheck(Component);

  // amplitude.getInstance().init("YOUR_API_KEY");
  useServiceWorker(); // Use the custom hook

  return (
    <>
      <CustomHead {...pageProps} router={router} />
      <QueryClientProvider client={queryClient}>
        <AirstackProvider
          apiKey={process.env.NEXT_PUBLIC_PUBLIC_AIRSTACK ?? ""}
        >
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
                <DrawerProvider>
                  <CheckedComponent>
                    <Component {...pageProps} />
                  </CheckedComponent>
                </DrawerProvider>
              </Layout>
            </AuthChecker>
          </PrivyProvider>
        </AirstackProvider>
      </QueryClientProvider>
    </>
  );
}
