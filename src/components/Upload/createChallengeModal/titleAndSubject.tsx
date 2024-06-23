// @ts-nocheck

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUploadStore } from "@/lib/context/UploadContext";
import { Input } from "@/components/ui/input";
import "../../../styles/fonts.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function AddTitle(props: { setStep: (step: number) => void }) {
  const uploadStore = useUploadStore();
  const [title, setTitle] = useState("");

  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    uploadStore.setTitle(e.target.value);
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
      <div className="text-gray-300 flex  justify-between items-center text-[1.2rem] m-[-0.2rem] font-bold mx-[1.65rem]">
        [Max 20 characters]
      </div>
      <Textarea
        onChange={handleTitleChange}
        placeholder="Your Title"
        value={uploadStore?.title}
        style={
          title === ""
            ? { color: "lightgray", fontFamily: "Aeonik-Bold" }
            : { color: "white", fontFamily: "Aeonik-Bold" }
        }
        className="text-[2.8rem] border-0  text-white m-4 my-8"
      ></Textarea>
      <div className="flex items-center mt-2 w-[80vw]  mb-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(2)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(4)}
        >
          <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200 text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AddTitle;

export function AddSubject(props: { setStep: (step: number) => void }) {
  const uploadStore = useUploadStore();
  const [subject, setSubject] = useState("");

  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    uploadStore.setSubject(e.target.value);
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
      <div className="text-gray-300 flex mt-[0rem]  justify-between items-center text-[1.15rem] m-[-0.2rem] font-bold mx-[1.65rem]">
        [Main subject of your prediction]
      </div>
      <Textarea
        onChange={handleSubjectChange}
        placeholder="Your Subject"
        value={uploadStore?.subject}
        style={
          subject === ""
            ? { color: "lightgray", fontFamily: "Aeonik-Bold" }
            : { color: "white", fontFamily: "Aeonik-Bold" }
        }
        className="text-[2.65rem] border-0 pr-1 text-white m-4 my-10"
      ></Textarea>
      <div className="flex items-center mt-2 w-[80vw]  mb-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(3)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(5)}
        >
          <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200 text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
