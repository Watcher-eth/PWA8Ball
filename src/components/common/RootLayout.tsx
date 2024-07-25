import { isMobile } from "@/utils/isMobile";
import { SmartAccountProvider } from "@/lib/onchain/SmartAccount";
import { MobileNavBar } from "@/components/layouts/MobileNavBar";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmartAccountProvider>
      <div className="relative pb-20 items-center justify-center">
        {/* Content of the page */}
        {children}
        {isMobile() && (
          <div className="flex items-center justify-center w-screen fixed bottom-6 z-15">
            <MobileNavBar />
          </div>
        )}
      </div>
    </SmartAccountProvider>
  );
}
