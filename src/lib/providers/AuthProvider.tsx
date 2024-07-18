// @ts-nocheck
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import { useInitializeUser } from "@/hooks/useInitializeUser";
import { useUserStore } from "@/lib/stores/UserStore";
import { useModalStore } from "@/lib/stores/ModalStore"; // Ensure to import modal store

export function AuthChecker({
  children,
  requireAuth = false,
}: {
  children: ReactNode;
  requireAuth?: boolean;
}) {
  const { ready, authenticated } = usePrivy();
  const { user } = useUserStore();
  const router = useRouter();
  const openLoginModal = useModalStore((state) => state.openLoginModal);

  useInitializeUser(); // Assuming these parameters

  useEffect(() => {
    if (ready && requireAuth && !authenticated) {
      openLoginModal(); // Open the login modal instead of redirecting
    }
  }, [ready, authenticated, requireAuth, router, openLoginModal, user]);

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
  console.log("isAuth", user);
  return <>{children}</>;
}
