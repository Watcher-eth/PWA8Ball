import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { InviteScreen } from "./InviteScreen";
import { DesktopCreateProfile } from "@/components/onboarding/DesktopCreateProfile";
import { DesktopOnboarding } from "../DesktopOnboardingModal";

function BlurOverlay() {
  const { user } = useUserStore();

  useEffect(() => {
    // Disable scrolling when the overlay is active
    document.body.classList.add("no-scroll");

    // Re-enable scrolling when the overlay is removed
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  console.log("user", user);
  const invited = user?.invited;

  return (
    <div className="fixed w-full inset-0 z-[50] flex items-center justify-center">
      {/* Full-Screen Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-xl animate-fade-in"></div>

      {/* Centered Card */}
      <div className="relative z-10 bg-[#101010]/80 border-2 md:max-w-[50%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[45%] border-[#121212] backdrop-blur-xl animate-fade-in-delayed rounded-lg shadow-lg ">
        {!user ? (
          <DesktopOnboarding />
        ) : user && invited === false ? (
          <InviteScreen />
        ) : user?.name.startsWith("0x") &&
          user?.walletType === "smartwallet" ? (
          <DesktopCreateProfile />
        ) : (
          <InviteScreen />
        )}
      </div>
    </div>
  );
}

export function BlurOverlayWrapper({ children, shouldShowOverlay }) {
  return (
    <>
      {shouldShowOverlay && <BlurOverlay />}
      {children}
    </>
  );
}
