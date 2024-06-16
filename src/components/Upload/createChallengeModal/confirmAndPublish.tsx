import React from "react";
import { motion } from "framer-motion";
import { useUploadStore } from "@/lib/context/UploadContext";
import Image from "next/image";
import "../../../styles/fonts.css";
function ConfirmSceen() {
  const uploadStore = useUploadStore();

  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
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
      <div className="flex flex-col my-4 mx-3 rounded-2xl relative justify-end h-[98vw] w-[86vw]">
        <Image
          alt="CoverPreview"
          src={uploadStore?.mediaHash}
          className="rounded-2xl"
          objectFit="cover"
          layout="fill"
        />
        <div
          style={{ zIndex: 2 }}
          className="h-[62vw] w-[86vw]    bg-gradient-to-t from-transparent via-black/[0.3] to-transparent absolute bottom-0"
        />
        <div
          style={{ zIndex: 2, fontFamily: "Benzin-Bold" }}
          className="text-white leading-[2.8rem] text-[2.8rem] pb-1 p-3 mr-6"
        >
          {uploadStore.title}
        </div>
        <div
          style={{ zIndex: 2, fontFamily: "Aeonik-Bold" }}
          className="text-white/[0.85] leading-[1.3rem] text-[1.5rem] p-3 pt-0 mr-6"
        >
          {uploadStore.subject}
        </div>
        <div
          style={{ zIndex: 2, fontFamily: "Aeonik-Bold" }}
          className="flex items-center h-[4.67rem] text-center leading-5 text-white px-3 text-[1rem] justify-center w-[86vw] rounded-b-2xl bg-gray-900/[0.2] backdrop-blur-xl"
        >
          {uploadStore.text}
        </div>
      </div>
    </motion.div>
  );
}

export default ConfirmSceen;
