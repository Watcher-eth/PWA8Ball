import React, { ReactNode } from "react";
import NavBar from "./NavBar"; // Assuming NavBar is in the same directory

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div style={{ paddingBottom: "80px", position: "relative" }}>
      {/* Content of the page */}
      {children}

      {/* Translucent bottom navigation bar */}
      <NavBar />
    </div>
  );
}

export default Layout;
