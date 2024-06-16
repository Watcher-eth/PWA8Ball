import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUploadStore } from "@/lib/context/UploadContext";
import { Input } from "@/components/ui/input";
import "../../../styles/fonts.css";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function CommentModal(props: { setStep: (step: number) => void }) {
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

  // const handleSubjectChange = (e) => {
  //   setSubject(e.target.value);
  //   uploadStore.setText(e.target.value);
  // };
  return (
    <motion.div
      key="step3"
      className="flex flex-col pb-3"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-gray-300 flex  space-x-1 items-center text-[1.05rem] m-[-0rem] font-bold mx-[1.65rem]">
        <Avatar className="h-[1.35rem] w-[1.35rem]  ">
          <AvatarImage src="https://pbs.twimg.com/profile_images/1716574480993071104/j58mjsfX_400x400.jpg" />
        </Avatar>
        <div className="mt-[0.1rem]">Winny.eth</div>
      </div>
      <Textarea
        onChange={handleTitleChange}
        placeholder="What's on your mind... "
        value={question}
        style={
          question === ""
            ? { color: "lightgray", fontFamily: "Aeonik-Bold" }
            : { color: "white", fontFamily: "Aeonik-Bold" }
        }
        className="text-[1.3rem] max-h-] leading-8 border-0 max-w-[82vw] min-h-[35vw] overflow-y-auto pb-5  text-white m-4 "
      />
      <div className="flex items-center mt-2 w-[80vw]  mb-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(2)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Cancle
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(2)}
        >
          <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200 text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Reply
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CommentModal;
