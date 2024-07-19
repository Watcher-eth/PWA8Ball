import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check } from "lucide-react";

import { Spinner } from "./Spinner";

interface LoadingPredictionProps {
  image: string;
  question: string;
  answer: string;
  option: string;
  loading: boolean;
  success: boolean;
}

export function MobileLoadingPrediction({
  image,
  question,
  answer,
  loading,
  success,
}:LoadingPredictionProps) {
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

export function DesktopLoadingPrediction({
  image,
  question,
  answer,
  loading,
  success,
}: LoadingPredictionProps) {
  const controls = useLoadingAnimationControls();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full rounded-lg overflow-hidden">
      {/* <div className=""> */}
        <motion.img
          src={image}
          alt="Prediction"
          className="absolute  object-cover w-full h-full rounded-t-lg"
          style={{
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          }}
        />
        <motion.div
          className="absolute  w-full h-full backdrop-blur-xl rounded-t-lg"
          style={{
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          }}
        />
        <motion.div
          className="absolute  w-full h-full rounded-t-lg"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(8, 8, 8, 0.8), #080808)",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          }}
        />
        <motion.img
          src={image}
          alt="Prediction"
          className="rounded-md mb-6 object-cover mt-16"
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
          className="text-5xl mt-9 text-white mb-8  font-bold"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ zIndex: 10 }}
        >
          {answer}
        </motion.p>
        <div className="absolute bottom-[8rem]">
          <Spinner success={success} loading={loading} />
        </div>
      {/* </div> */}
    </div>
  );
};


function useLoadingAnimationControls() {
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

  return controls;
}