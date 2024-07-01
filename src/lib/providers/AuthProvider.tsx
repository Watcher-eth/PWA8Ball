// @ts-nocheck

// components/AuthChecker.tsx
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import { useUserStore } from "../stores/UserStore";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useModalStore } from "@/lib/stores/ModalStore"; // Ensure to import modal store

interface AuthCheckerProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function AuthChecker({
  children,
  requireAuth = false,
}: AuthCheckerProps) {
  const { ready, authenticated } = usePrivy();
  const { user } = useUserStore();
  const router = useRouter();
  const openLoginModal = useModalStore((state) => state.openLoginModal);

  useInitializeUser(
    user?.external_auth_provider_user_id,
    user?.hasTwitterLinked
  ); // Assuming these parameters

  useEffect(() => {
    if (ready && requireAuth && !authenticated) {
      openLoginModal(); // Open the login modal instead of redirecting
    }
  }, [ready, authenticated, requireAuth, router, openLoginModal]);

  if (!ready) {
    console.log("isLoading");
    // try {
    //   return <>{children}</>;
    // } catch (error) {
    //   console.log(error);
    //   return <></>; // Show nothing while loading
    // }
    return <>{children}</>;
  }
  console.log({ requireAuth, authenticated });
  if (requireAuth && !authenticated) {
    console.log("need auth");
    return null; // Return null while showing modal
  }

  return <>{children}</>;
}
