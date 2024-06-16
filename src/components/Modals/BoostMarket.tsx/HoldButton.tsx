import React, { useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check } from "lucide-react";

const HoldButton = ({ onComplete, buttonText }) => {
  const holdDuration = 2; // Total time to hold the button in seconds
  const controls = useAnimation();

  const startAnimation = useCallback(() => {
    controls.start({
      width: "100%",
      transition: { duration: holdDuration },
    });
  }, [controls]);

  const resetAnimation = useCallback(() => {
    controls.stop();
    controls.start({
      width: "0%",
      transition: { duration: 0.2 },
    });
  }, [controls]);

  const handlePressIn = () => {
    startAnimation();
    setTimeout(() => {
      onComplete();
    }, holdDuration * 1000);
  };

  const handlePressOut = () => {
    resetAnimation();
  };

  return (
    <div className="relative w-full h-12 bg-[#212121] rounded-lg overflow-hidden cursor-pointer">
      <motion.div
        className="absolute top-0 left-0 h-full bg-[#FF0050]"
        animate={controls}
        style={{ width: "0%" }}
      />
      <div
        className="flex items-center justify-center h-full w-full"
        onMouseDown={handlePressIn}
        onMouseUp={handlePressOut}
        onMouseLeave={handlePressOut}
      >
        <span className="relative z-10 text-lg font-bold text-white">
          {buttonText}
        </span>
        <motion.div
          className="absolute z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Check color="white" strokeWidth={4} />
        </motion.div>
      </div>
    </div>
  );
};

export default HoldButton;
