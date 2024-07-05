// @ts-nocheck
import { motion } from "framer-motion";
import { MobileOnly } from "@/components/Common/MobileOnly";


export function MobileOnlyModal({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 w-[100vw] h-[100vh] z-1000 flex justify-center items-center
      `}
    >
      <motion.div
        layout
        transition={{ duration: 0.2 }}
        className="rounded-[20px] p-5 bg-white"
      >
        <MobileOnly />
      </motion.div>
    </div>
  );
}
