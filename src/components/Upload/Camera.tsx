// @ts-nocheck

import React, { createContext, useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, XCircle } from "lucide-react";
import { useUploadStore } from "../../lib/context/UploadContext";
import CID from "cids";
import { useStorage, useStorageUpload } from "@thirdweb-dev/react";
import Image from "next/image";

const CameraContext = createContext();

export function useCamera() {
  return useContext(CameraContext);
}

function Camera({ children }) {
  const uploadStore = useUploadStore();
  const [file, setFile] = useState(null);
  const { mutateAsync: upload } = useStorageUpload();
  const storage = useStorage();
  const [isVisible, setVisible] = useState(false); // State to control visibility
  const cameraInputRef = useRef(null);
  const [image, setImage] = useState();
  async function handleCameraInputChange(e) {
    const selectedFile = e.target.files[0];
    uploadStore.setPayed(true);
    if (selectedFile) {
      uploadStore.setSecondaryMedia(URL.createObjectURL(selectedFile));

      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const mediaData = e.target.result;
        console.log(URL.createObjectURL(selectedFile));
        uploadStore.setType("image-uploaded");

        // Upload the file to IPFS
      };
      const ipfsHash = await upload({ data: [selectedFile] });
      const URI = ipfsHash[0];
      const finalHash = await storage?.resolveScheme(URI);
      setImage(finalHash);
      uploadStore.setMedia(finalHash);

      fileReader.readAsArrayBuffer(selectedFile);
    }
  }

  function openCamera() {
    if (cameraInputRef) {
      cameraInputRef.current.click();
      setVisible(true);
    }
  }

  return (
    <CameraContext.Provider value={{ openCamera }}>
      {isVisible && ( // Show only if isVisible is true
        <div
          style={{
            height: "100vh",
            width: "100vw",
          }}
          className="flex flex-col items-center  justify-center"
        ></div>
      )}

      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*,video/*"
        capture="user"
        style={{ display: "none" }}
        onChange={handleCameraInputChange}
      />
      {children}
    </CameraContext.Provider>
  );
}

export default Camera;
