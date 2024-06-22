import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check } from "lucide-react";

const SIZE = 50; // Adjust size as needed
const STROKE_WIDTH = 6;
const BACKGROUND_COLOR = "#555555";
const WHITE_COLOR = "#FFFFFF";
const BORDER_COLOR = "#212121";
const SUCCESS_COLOR = "#4CAF50";

interface SpinnerProps {
  loading: boolean;
  success: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading, success }) => {
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
};

interface LoadingPredictionProps {
  image: string;
  question: string;
  answer: string;
  option: string;
  loading: boolean;
  success: boolean;
}

const LoadingPrediction: React.FC<LoadingPredictionProps> = ({
  image,
  question,
  answer,
  loading,
  success,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        height: 100,
        width: 100,
        transition: { type: "spring", damping: 20, stiffness: 100 },
      });
      await controls.start({ opacity: 1, transition: { delay: 0.3 } });
      await controls.start({ opacity: 1, transition: { delay: 0.6 } });
    };

    sequence();
  }, [controls]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[430px]">
      <motion.img
        src={image}
        alt="Prediction"
        className="absolute top-[-15px] object-cover w-full h-[425px] rounded-t-lg mb-6"
        style={{
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
        }}
      />
      <motion.div
        className="absolute top-[-15px] w-full h-[425px] rounded-t-lg mb-6"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(13, 13, 13, 0.8), #131313)",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
        }}
      />
      <motion.img
        src={image}
        alt="Prediction"
        className="rounded-xl mb-6 object-cover mt-14"
        animate={controls}
        initial={{ height: 0, width: 0 }}
        style={{ zIndex: 10 }}
      />
      <motion.p
        className="text-lg font-bold text-white"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        style={{ zIndex: 10 }}
      >
        Submitting your Prediction
      </motion.p>
      <motion.p
        className="text-md mt-1 text-[#858585] text-center px-7 font-normal"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        style={{ zIndex: 10 }}
      >
        {question}
      </motion.p>
      <motion.p
        className="text-5xl mt-4 text-white  font-bold"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        style={{ zIndex: 10 }}
      >
        {answer}
      </motion.p>
      <div className="absolute bottom-[9rem]">
        <Spinner success={success} loading={loading} />
      </div>
    </div>
  );
};

export default LoadingPrediction;
