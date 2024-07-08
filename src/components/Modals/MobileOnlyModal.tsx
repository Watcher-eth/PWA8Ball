// @ts-nocheck

import React from "react";
import { motion } from "framer-motion";
import MobileOnly from "@/components/Common/MobileOnly";

interface MobileOnlyModalProps {
  open: boolean;
}

export function MobileOnlyModal({ open }: MobileOnlyModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        layout
        transition={{ duration: 0.2 }}
        style={{ borderRadius: 20, padding: "20px", backgroundColor: "#fff" }}
      >
        <MobileOnly />
      </motion.div>
    </div>
  );
}
