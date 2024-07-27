import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check } from "lucide-react";

const SIZE = 50; // Adjust size as needed
const STROKE_WIDTH = 6;
const BACKGROUND_COLOR = "#555555";
const WHITE_COLOR = "#FFFFFF";
const BORDER_COLOR = "#212121";
const SUCCESS_COLOR = "#4CAF50";

export function Spinner({
  loading,
  success
}: {
  loading: boolean
  success: boolean
}) {
  const controls = useAnimation();
  const morphControls = useAnimation();

  useEffect(() => {
    if (loading) {
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 1.2,
        },
      });
    } else {
      controls.stop();
    }
  }, [loading, controls]);

  useEffect(() => {
    if (success) {
      morphControls.start({
        scale: 1,
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      });
    } else {
      morphControls.start({
        scale: 0,
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      });
    }
  }, [success, morphControls]);

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="absolute flex justify-center items-center"
        animate={controls}
        initial={{ rotate: 0 }}
        style={{ width: SIZE * 0.7, height: SIZE * 0.7 }}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={(SIZE - STROKE_WIDTH) / 2}
            stroke={BACKGROUND_COLOR}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <path
            d={`
              M ${STROKE_WIDTH / 2}, ${SIZE / 2}
              a ${(SIZE - STROKE_WIDTH) / 2} ${
              (SIZE - STROKE_WIDTH) / 2
            } 0 1,0 ${SIZE - STROKE_WIDTH},0
            `}
            stroke={WHITE_COLOR}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`
              M ${STROKE_WIDTH / 2}, ${SIZE / 2}
              a ${(SIZE - STROKE_WIDTH) / 2} ${
              (SIZE - STROKE_WIDTH) / 2
            } 0 1,0 ${SIZE - STROKE_WIDTH},0
            `}
            stroke="none"
            strokeWidth={STROKE_WIDTH + 2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            opacity={0.9}
          />
        </svg>
      </motion.div>
      {success && (
        <motion.div
          className="absolute flex justify-center items-center"
          animate={morphControls}
          initial={{ scale: 0 }}
        >
          <div
            className="flex justify-center items-center rounded-full"
            style={{
              width: SIZE * 0.85,
              height: SIZE * 0.85,
              backgroundColor: SUCCESS_COLOR,
            }}
          >
            <Check size={SIZE * 0.5} strokeWidth={5} color={WHITE_COLOR} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
