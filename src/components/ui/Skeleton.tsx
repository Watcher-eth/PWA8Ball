import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#181818]", className)}
      {...props}
    />
  );
}

export function AltSkeleton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={`bg-[#272727] animate-pulse rounded-xl ${className}`}
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
