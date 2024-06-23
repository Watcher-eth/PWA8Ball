// @ts-nocheck
"use client";
import React, { useContext, useRef, useState } from "react";
import Camera from "./Camera";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BadgeInfo,
  Baseline,
  Camera as CameraIcon,
  Check,
  Clock2,
  Disc,
  DollarSignIcon,
  Heart,
  Image as ImageIcon,
  Link,
  Music,
  Music2,
  Music4,
  RotateCw,
  Type,
  XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import Home from "./UseGifModal";
import { Drawer } from "vaul";
import { useUploadStore } from "../../lib/context/UploadContext";
import Image from "next/image";
import { HighlightHashtags } from "../Feed/Post";
import ChooseTimeModal from "./ChooseTimeModal";
import "../../app/fonts.css";
import Publish from "./Publish";
import { useQuery } from "@tanstack/react-query";
import { lensClient } from "../../pages";
import { motion } from "framer-motion";
import { useStorage, useStorageUpload } from "@thirdweb-dev/react";
import CID from "cids";
import RandomMemoji from "../ui/MemojiAvatar";
import { useProfile } from "../../lib/context/context";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

function UploadPage({ walletAddress }) {
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [divHeight, setDivHeight] = useState(38); // Initial height in vw
  const [inputDivHeight, setInputDivHeight] = useState(-2.5); // Initial height

  const [status, setStatus] = useState("image"); // Initial height
  const uploadStore = useUploadStore();
  const uploadedMedia = uploadStore?.mediaHash;
  const postType = uploadStore?.type;
  const [open, setOpen] = useState(false);
  const time = uploadStore?.time;
  const { mutateAsync: upload } = useStorageUpload();
  const storage = useStorage();
  const { profile } = useProfile();

  // Handle Media Uploads (Library, Camera, Files) and update Context
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const charactersPerLine = 20; // Adjust as needed
    const textarea = e.target;

    const lines = Math.ceil(
      textarea.scrollHeight /
        (2.1 * parseFloat(getComputedStyle(textarea).fontSize))
    );
    let newDivHeight = 38; // Default height
    if (lines >= 5 && lines <= 6) {
      newDivHeight = 45; // Set to 45vw if 5-6 lines
    } else if (lines >= 7) {
      newDivHeight = 50; // Set to 50vw if 7 or more lines
    }

    // Calculate the height based on the number of lines
    setDivHeight(newDivHeight);

    uploadStore.setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
    uploadStore.setText(e.target.value);
  };

  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileInputClick = () => {
    // Trigger a click event on the file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAudioInputClick = () => {
    // Trigger a click event on the audio input element
    uploadStore.setType(`${uploadStore.type}-with-audio`);
    if (audioInputRef.current) {
      audioInputRef.current.click();
    }
  };

  async function uploadMedia(selectedFile) {
    if (!selectedFile) return null;
    const mediaUrl = URL.createObjectURL(selectedFile);
    const type = selectedFile.type.includes("audio")
      ? `${postType}-with-audio`
      : `${postType}-with-image`;

    uploadStore.setMedia(mediaUrl);
    uploadStore.setType(type);

    try {
      const ipfsHash = await upload({ data: [selectedFile] });
      const URI = ipfsHash[0];
      const parts = URI.split("/");
      const finalHash = storage?.resolveScheme(URI);

      const cid = parts[2];
      const end = parts[3];
      const CIDURL = new CID(cid).toV1().toString("base32");

      uploadStore.setMedia(finalHash);
      console.log("Uploaded media to IPFS:", cid);
      return URI;
    } catch (error) {
      console.error("Error uploading media to IPFS:", error);
    }

    return mediaUrl;
  }

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    uploadStore.setSecondaryMedia(URL.createObjectURL(selectedFile));
    uploadStore.setPayed(true);

    uploadStore.setImageType(selectedFile.type);
    console.log(selectedFile.type);
    uploadMedia(selectedFile);
  };

  const handleAudioInputChange = (e) => {
    const selectedAudio = e.target.files[0];
    uploadStore.setImageType(selectedAudio.type);
    setStatus("audio");

    uploadMedia(selectedAudio);
  };

  const handleCameraInputChange = (e) => {
    const capturedMedia = e.target.files[0];
    uploadStore.setImageType(capturedMedia.type);
    console.log(capturedMedia.type);
    setStatus("image");
    uploadStore.setType("image");

    uploadMedia(capturedMedia);
  };

  const [popoverOpened, setPopoverOpened] = useState(false);
  const popoverTargetRef = useRef(null);

  const openPopover = (targetRef) => {
    popoverTargetRef.current = targetRef;
    setPopoverOpened(true);
  };

  function resetMedia() {
    setStatus("image");
    uploadStore.setMediaHash("");
    uploadStore.setType("image");
  }
  console.log("uploadedMEdia", uploadedMedia);
  return (
    <div
      style={
        status === "text" && uploadStore.type !== "gif"
          ? { padding: "10px" }
          : { paddingLeft: "0px" }
      }
      className="flex flex-col overflow-y-scroll pb-[2rem] relative min-h-[102vh] max-h-[115vh] z-2 rounded-2xl "
    >
      {status === "text" && uploadStore.type !== "gif" && (
        <div className="flex flex-col mx-2 mt-4 mb-2">
          <div className="h-full py-2 px-1 w-[90vw] self-center bg-[#202020] rounded-xl relative shadow-xl">
            <div
              style={{ fontFamily: "Aeonik-Bold" }}
              className="p-2 pb-0 h-[53vw] items-end justify-end relative  leading-9 font-bold text-white"
            >
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                className="text-[2.1rem] max-w-[82vw] p-1   line-clamp-5 bg-transparent min-h-[48vw]   resize-none border-none outline-none  rounded-lg"
                placeholder="Whats going on..."
              />
            </div>
          </div>
        </div>
      )}

      {uploadStore.type !== "text" && uploadStore.mediaHash === "" && (
        <div className="flex flex-col items-center space-y-[0.75rem] max-w-[84vw] z-20 absolute top-[9rem] right-[0.3rem]">
          <Button
            className="rounded-full "
            onClick={() => {
              uploadStore.setType("text");
              setStatus("text");
            }}
            variant="ghost"
          >
            <Type className=" h-7 w-7 stroke-white" />
          </Button>

          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*,video/*"
            capture="camera"
            style={{ display: "none" }}
            onChange={handleCameraInputChange}
          />
          <label htmlFor="audioUpload">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                className="rounded-full  stroke-white"
                onClick={handleAudioInputClick}
                variant="ghost"
              >
                <Music stroke="4px" className=" h-7 w-7 stroke-white" />
              </Button>
            </motion.div>
          </label>
          <input
            type="file"
            ref={audioInputRef}
            accept="audio/*"
            style={{ display: "none" }}
            onChange={handleAudioInputChange}
          />

          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="h-5 mt-[2px]   mb-[5px]  w-10  rounded-sm"
              >
                <div className="text-[1.2rem] text-white font-bold">GIF</div>
              </motion.div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 " />
              <Drawer.Content className="bg-black z-20 flex flex-col rounded-t-[10px] h-[70.6667vh] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-[101010] rounded-t-[10px]  flex-1">
                  <Home setOpen={setOpen} />
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full  mb-8" />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          <ChooseTimeModal />
        </div>
      )}
      {status === "image" && uploadedMedia && (
        <div className="flex flex-col relative">
          <div className="min-h-[100vw] max-h-[75vh]  relative">
            {uploadStore.type === "gif" && (
              <img className=" min-h-[45vh] max-h-[75vh]" src={uploadedMedia} />
            )}

            {uploadStore.type !== "gif" && (
              <img
                className=" min-h-[45vh] max-h-[75vh]"
                src={uploadStore.media}
                sizes="100vw"
                width="0"
                height="0"
                style={{ width: "100%", height: "auto" }}
              />
            )}

            <div className="absolute  top-0 w-[100vw] h-full min-h-[45vh] max-h-[75vh] bg-gradient-to-b from-transparent via-transparent to-[#1c1c1c]" />
          </div>

          <div className="flex items-center mx-1  px-2 mb-4 mt-5">
            <div className="flex flex-col ">
              <textarea
                style={{ fontFamily: "Aeonik-Bold", zIndex: 22 }}
                value={inputValue}
                onChange={handleInputChange}
                className=" ml-1  text-[2.1rem] line-clamp-1  mt-[-3.8rem] leading-6 text-white max-w-[90.5vw]  bg-transparent sd border-none outline-none "
                placeholder="Title"
              />

              <div className="text-[0.9rem] mt-[0.35rem]   ml-[0.4rem]  text-gray-200 font-bold ">
                Description
              </div>
              <div className="flex flex-col">
                <textarea
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                  className="w-[88vw] text-white h-[5rem] pt-4  p-2  mr-2 mt-[-1rem] leading-5 text-[1.15rem] resize-none border-none outline-none bg-transparent rounded-lg"
                  placeholder="Write a caption"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {uploadStore.type === "gif" ? null : uploadStore.media !== "" &&
        uploadStore.mediaHash === "" ? (
        <motion.div
          onClick={() => {
            uploadStore.setMedia("");
            uploadStore.setSecondaryMedia("");
            uploadStore.setType("image-uploaded");
          }}
          whileTap={{ scale: 0.9 }}
          className="flex self-center absolute top-[3rem] right-[1.22rem] z-20"
        >
          <XCircle className="stroke-white h-8 w-8" />
        </motion.div>
      ) : uploadStore.media !== "" && uploadStore.mediaHash !== "" ? null : (
        <motion.div
          onClick={() => {
            uploadStore.setMedia("");
            uploadStore.setType("image-uploaded");
            uploadStore.setPayed(false);
          }}
          whileTap={{ scale: 0.9 }}
          className="flex self-center absolute top-[2.5rem] bg right-[1.1rem] z-20"
        >
          <XCircle
            style={{ backdropFilter: "blur(12px)" }}
            className="h-8 w-8   bg-black/20  rounded-full  stroke-white"
          />
        </motion.div>
      )}

      {uploadStore.secondaryMedia !== "" && uploadStore.mediaHash === "" && (
        <div
          style={{
            zIndex: 10,
            width: "100vw",
            height: "86vh",

            alignSelf: "center",
            borderRadius: "12px",
            position: "absolute",
            top: "1rem",
            left: 0,
          }}
        >
          <img
            fill
            layout="fill"
            objectFit="cover"
            style={{ objectFit: "cover" }}
            src={uploadStore.secondaryMedia}
            alt="Captured Image/Video"
            className="rounded-2xl"
          />
        </div>
      )}
      {uploadStore.media !== "" && uploadStore.mediaHash === "" && (
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            uploadStore.setMediaHash(uploadStore.media);
            uploadStore.setType("image-uploaded");
            uploadStore.setPayed(false);
            console.log("test", uploadStore.media);
          }}
          className="flex self-center absolute bottom-[3.3rem] right-[1.22rem] z-20"
        >
          <ArrowRight className="h-10 w-10 p-1 bg-white rounded-full z-20 stroke-black" />
        </motion.div>
      )}

      {uploadStore.mediaHash !== "" && (
        <div
          style={{
            marginTop: status === "text" ? "0rem" : "0rem",
            width: status !== "text" && "98vw",
          }}
          className="flex mb-[-1rem] items-center justify-between mr-3 px-2 mt-[-0.4rem]  pb-7"
        >
          <div className="flex flex-col  ">
            <div className="text-[0.9rem] mx-1 p-2 mr-1 mt-2  text-gray-200 font-bold ">
              Duration
            </div>
            <div
              style={{ fontFamily: "Aeonik-Bold" }}
              className="text-[2rem] mx-1 ml-[0.7rem] mt-[-13px]  mr-1 text-white text-gray-400 "
            >
              {time} Hours
            </div>
          </div>

          <div className="flex flex-col  ">
            <div className="flex items-center self-end mr-[-0.85rem] space-x-[-1.5rem]">
              <div className="text-[0.9rem] mx-1 p-2 mr-1 mt-2  text-gray-200 font-bold ">
                Rewards
              </div>
              <Button
                variant={"ghost"}
                className="popover-button "
                onClick={() => openPopover(".popover-button")}
              >
                <BadgeInfo className="stroke-white h-[1rem] mt-2 w-[1rem]" />
              </Button>
              <Popover
                opened={popoverOpened}
                target={popoverTargetRef.current}
                style={{ marginLeft: 1, paddingRight: 1 }}
                onBackdropClick={() => setPopoverOpened(false)}
              >
                <div className="flex items-center bg-white py-1 pl-2 ">
                  <div className="h-[5.1rem] mr-2 relative w-[5.1rem] text-[3.5rem] items-center jusitfy-center rounded-md bg-orange-600">
                    <div className="absolute left-3 self-center">💸</div>
                  </div>
                  <div className="flex flex-col space-y-[-0.2rem]">
                    <div
                      style={{ fontFamily: "Aeonik-Bold" }}
                      className="bg-white text-[1rem] mb-[0.1rem] rounded-lg text-black"
                    >
                      Create and earn
                    </div>

                    <div
                      style={{ fontFamily: "Aeonik" }}
                      className="bg-white text-[0.85rem] w-[10rem] h-[4rem] rounded-lg text-black"
                    >
                      Earn Rewards for creating experiences, moments and
                      memories onchain.
                    </div>
                  </div>
                </div>
              </Popover>
            </div>
            <div
              style={{ fontFamily: "Aeonik-Bold" }}
              className="text-[2rem] mx-1 ml-[0.7rem] mt-[-13px]  mr-1 text-white text-gray-400 "
            >
              0.001ETH
            </div>
          </div>
        </div>
      )}

      {status === "text" && (
        <div className="flex items-center justify-between mr-3 px-2 mt-[0rem]  pb-7">
          <div className="flex flex-col  ">
            <div className="text-[0.9rem] mx-1 p-2 mr-1 mt-2  text-gray-200 font-bold ">
              Duration
            </div>
            <div
              style={{ fontFamily: "Aeonik-Bold" }}
              className="text-[2rem] mx-1 ml-[0.7rem] mt-[-13px]  mr-1 text-white text-gray-400 "
            >
              {time} Hours
            </div>
          </div>

          <div className="flex flex-col  ">
            <div className="flex items-center space-x-[-1.5rem]">
              <div className="text-[0.9rem] mx-1 p-2 mr-1 mt-2  text-gray-200 font-bold ">
                Rewards
              </div>
              <Button
                variant={"ghost"}
                className="popover-button "
                onClick={() => openPopover(".popover-button")}
              >
                <BadgeInfo className="stroke-white h-[1rem] mt-2 w-[1rem]" />
              </Button>
              <Popover
                opened={popoverOpened}
                target={popoverTargetRef.current}
                style={{ marginLeft: 1, paddingRight: 1 }}
                onBackdropClick={() => setPopoverOpened(false)}
              >
                <div className="flex items-center bg-white py-1 pl-2 ">
                  <div className="h-[5.1rem] mr-2 relative w-[5.1rem] text-[3.5rem] items-center jusitfy-center rounded-md bg-orange-600">
                    <div className="absolute left-3 self-center">💸</div>
                  </div>
                  <div className="flex flex-col space-y-[-0.2rem]">
                    <div
                      style={{ fontFamily: "Aeonik-Bold" }}
                      className="bg-white text-[1rem] mb-[0.1rem] rounded-lg text-black"
                    >
                      Create and earn
                    </div>

                    <div
                      style={{ fontFamily: "Aeonik" }}
                      className="bg-white text-[0.85rem] w-[10rem] h-[4rem] rounded-lg text-black"
                    >
                      Earn Rewards for creating experiences, moments and
                      memories onchain.
                    </div>
                  </div>
                </div>
              </Popover>
            </div>
            <div
              style={{ fontFamily: "Aeonik-Bold" }}
              className="text-[2rem] mx-1 ml-[0.7rem] mt-[-13px]  mr-1 text-white text-gray-400 "
            >
              0.003ETH
            </div>
          </div>
        </div>
      )}
      {uploadStore.mediaHash !== "" ? (
        <motion.div
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "1.1rem",
            display: "flex",
          }}
          whileTap={{ scale: 0.93 }}
          onClick={() => {
            setStatus("image");
            uploadStore.setMediaHash("");
            uploadStore.setType("image");
          }}
        >
          <ArrowLeft
            style={{ backdropFilter: "blur(12px)" }}
            className="h-7 w-7 p-1 bg-black/20  rounded-full  stroke-white"
          />
        </motion.div>
      ) : (
        <label htmlFor="imageUpload">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <motion.div
            style={{ position: "absolute", bottom: "3.1rem", left: "1rem" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="rounded-full  stroke-white"
              onClick={handleFileInputClick}
              variant="ghost"
            >
              <ImageIcon className=" h-8 w-8 stroke-white" />
            </Button>
          </motion.div>
        </label>
      )}
      <div className="self-center  pb-[3rem]  ">
        {profile && uploadStore.mediaHash !== "" && (
          <Publish profile={profile} />
        )}
      </div>
    </div>
  );
}

function SetTimeModal() {
  const client = new LitJsSdk.LitNodeClient();
  const chain = "ethereum";
  const timestamp = "1651276942";
  //Access Conditions

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <Button
          className="rounded-full mr-1 bg-gray-500 w-13 shadow-lg"
          variant="ghost"
        >
          <RotateCw className="mr-1 h-6 w-6" />
        </Button>
        <div className="text-[1.3rem] font-medium">Set Expiration</div>
        <Button className="rounded-full mr-1 bg-green-200 h-9 w-13 shadow-lg">
          <Check className="mr-1 h-6 w-6" color="green" />
        </Button>
      </div>
      <div className="w-[10rem] self-center m-5 border-4 border-gray-300 rounded-xl">
        <div className="text-[3.2rem] mx-2">12:00</div>
      </div>
      <div className="flex justify-between mx-9 my-7">
        <Button className="rounded-full bg-gray-900 shadow-lg">+30min</Button>
        <Button className="rounded-full bg-gray-900 shadow-lg">+1hr</Button>
        <Button className="rounded-full bg-gray-900 shadow-lg">+6hr</Button>
      </div>
    </div>
  );
}

function SetPriceModal() {
  return <div>index</div>;
}

function MusicBadge(props: { songName: string; artistName: string }) {
  return (
    <Badge className="absolute h-7  top-6 right-5 bg-white text-black text-[0.9rem] rounded-full">
      <Music4 className="h-[17.5px] mr-1" /> NightingGale by Febi Matrix
    </Badge>
  );
}
function LinkBadge(props: { songName: string; artistName: string }) {
  return (
    <Badge className="absolute h-7  top-6 right-5 bg-white text-black text-[0.9rem] rounded-full">
      <Link className="h-[17.5px] mr-1" /> twitter.co
    </Badge>
  );
}
export default UploadPage;
