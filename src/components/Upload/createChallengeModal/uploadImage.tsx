// @ts-nocheck

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadStore } from "@/lib/context/UploadContext";
import CID from "cids";
import { useStorage, useStorageUpload } from "@thirdweb-dev/react";

function UploadImage(props: { setStep: (step: number) => void }) {
  const uploadStore = useUploadStore();
  const fileInputRef = useRef(null);
  const { mutateAsync: upload } = useStorageUpload();
  const storage = useStorage();

  async function uploadMedia(selectedFile) {
    if (!selectedFile) return null;
    const mediaUrl = URL.createObjectURL(selectedFile);

    uploadStore.setMedia(mediaUrl);

    try {
      const ipfsHash = await upload({ data: [selectedFile] });
      const URI = ipfsHash[0];
      const parts = URI.split("/");
      const finalHash = storage?.resolveScheme(URI);

      const cid = parts[2];
      const end = parts[3];
      const CIDURL = new CID(cid).toV1().toString("base32");

      uploadStore.setMediaHash(finalHash);
      console.log("Uploaded media to IPFS:", cid);
      return URI;
    } catch (error) {
      console.error("Error uploading media to IPFS:", error);
    }

    return mediaUrl;
  }

  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    uploadStore.setSecondaryMedia(URL.createObjectURL(selectedFile));

    uploadStore.setImageType(selectedFile.type);
    console.log(selectedFile.type);
    uploadMedia(selectedFile);
  };

  const handleFileInputClick = () => {
    // Trigger a click event on the file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
        [Make it pop]
      </div>
      <label htmlFor="imageUpload">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        {uploadStore?.media === "" ? (
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={handleFileInputClick}
            className="rounded-2xl h-[82vw] mx-5 my-5 mt-6 w-[82vw] items-center flex flex-col justify-center bg-[#1A1A1A]"
          >
            <div className="w-[9rem] items-center rounded-full flex justify-center flex-col h-[9rem] border-dashed border-2 border-gray-300 ">
              <div className="w-[6rem] items-center rounded-full flex justify-center flex-col h-[6rem] border-dashed border-2 border-gray-300 ">
                <ImagePlus size={40} className="stroke-gray-300" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={handleFileInputClick}
            className="rounded-2xl h-[82vw] mx-5 my-5 mt-6 w-[82vw] items-center flex flex-col justify-center bg-[#1A1A1A] relative"
          >
            <img
              alt="uploadPreview"
              src={uploadStore?.media}
              className="rounded-2xl object-cover w-full h-full"
            />
          </motion.div>
        )}
      </label>
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
          onClick={() => props.setStep(6)}
        >
          <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200 text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UploadImage;
