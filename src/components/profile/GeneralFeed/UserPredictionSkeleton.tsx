// @ts-nocheck
import { motion } from "framer-motion";
import { AltSkeleton } from "@/components/ui/Skeleton";



export function UserPredictionSkeleton({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-center w-9/10 justify-between p-2 rounded-2xl bg-[#171717] my-2"
    >
      <div className="flex items-center gap-2">
        <AltSkeleton className="w-14 h-14" />
        <div className="flex flex-col gap-2">
          <AltSkeleton className="w-[60%] h-[20px]" />
          <AltSkeleton className="w-[55%] h-[17px]" />
        </div>
      </div>
      <AltSkeleton className="w-[18%] h-[35px]"/>
    </motion.div>
  );
}


