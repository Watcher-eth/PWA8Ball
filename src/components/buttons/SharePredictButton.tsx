import { motion } from "framer-motion";
import { ScanFace, ShareIcon } from "lucide-react";

export function SharePredictButton({ success }: { success: boolean }) {
  let IconComponent;
  let label;
  if (success) {
    IconComponent = ShareIcon;
    label = "Share your Prediction";
  } else {
    IconComponent = ScanFace;
    label = "Predict";
  }
  return (
    <>
      <IconComponent className="text-black" strokeWidth={3} size={23} />
      <motion.span
        initial={{ opacity: success ? 0 : 1 }}
        animate={{ opacity: 1 }}
        className="transition-opacity duration-500"
      >
        {label}
      </motion.span>
    </>
  );
}