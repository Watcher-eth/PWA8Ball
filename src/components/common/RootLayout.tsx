import { ReactNode } from "react";
import { NavBar } from "@/components/common/NavBar"; // Assuming NavBar is in the same directory
import { isMobile } from "@/utils/isMobile";
import { SmartAccountProvider } from "@/lib/onchain/SmartAccount";

export function RootLayout({ children }: { children: ReactNode }) {

  return (
    <SmartAccountProvider>
      <div className="relative pb-20 items-center justify-center">
        {/* Content of the page */}
        {children}
        {isMobile() && (
          <div className="flex items-center justify-center w-screen fixed bottom-[25px] z-[15]">
            <NavBar />
          </div>
        )}
      </div>
    </SmartAccountProvider>
  );
}