// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUploadStore } from "@/lib/context/UploadContext";
import { Input } from "@/components/ui/input";
import "../../../styles/fonts.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function AddQuestion(props: { setStep: (step: number) => void }) {
  const uploadStore = useUploadStore();
  const [question, setQuestion] = useState("");

  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const handleTitleChange = (e) => {
    setQuestion(e.target.value);
    uploadStore.setText(e.target.value);
  };

  return (
    <motion.div
      key="step3"
      className="flex flex-col pb-3"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-gray-300 flex  justify-between items-center text-[1.05rem] m-[-0rem] font-bold mx-[1.65rem]">
        [The main question your predicting]
      </div>
      <Textarea
        onChange={handleTitleChange}
        placeholder="Example: Will Satoshi Nakamoto reveal himself to the public in 2024? "
        value={uploadStore?.text}
        style={
          question === ""
            ? { color: "lightgray", fontFamily: "Aeonik-Bold" }
            : { color: "white", fontFamily: "Aeonik-Bold" }
        }
        className="text-[1.55rem] leading-8 border-0 max-w-[82vw] h-[50vw] overflow-y-auto  text-white m-4 my-6"
      />
      <div className="flex items-center mt-2 w-[80vw]  mb-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(1)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(3)}
        >
          <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200 text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AddQuestion;
