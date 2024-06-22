import React, { ReactNode } from "react";
import NavBar from "./NavBar"; // Assuming NavBar is in the same directory

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        paddingBottom: "80px",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Content of the page */}
      {children}

      {/* Translucent bottom navigation bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          position: "fixed",
          bottom: "25px",
          zIndex: 15,
        }}
      >
        <NavBar />
      </div>
    </div>
  );
}

export default Layout;
