import { ReactNode } from "react";
import { NavBar } from "@/components/Common/NavBar"; // Assuming NavBar is in the same directory
import { isMobile } from "@/utils/isMobile";



export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative pb-20 items-center justify-center">
      {/* Content of the page */}
      {children}
      {isMobile() && (
        <div className="flex items-center justify-center w-[100vw] fixed bottom-[25px] z-[15]">
          <NavBar />
        </div>
      )}
    </div>
  );
};
