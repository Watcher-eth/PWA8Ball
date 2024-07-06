import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function AltSkeleton({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <motion.div
      className={`bg-[#252525] rounded-xl ${className}`}
      variants={skeletonVariants}
      initial="initial"
      animate="pulse"
    >
      {children}
    </motion.div>
  );
}

export const skeletonVariants = {
  initial: { opacity: 1 },
  pulse: {
    opacity: 0.4,
    transition: {
      duration: 0.8,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};
