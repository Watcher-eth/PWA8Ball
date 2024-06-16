// @ts-nocheck

import { useUploadStore } from "../../lib/context/UploadContext";
import React, { useState } from "react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";
import { Check, Clock2, RotateCw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import "../../pages/fonts.css";
function ChooseTimeModal() {
  const [open, setOpen] = useState(false);
  const uploadStore = useUploadStore();
  const uploadedMedia = uploadStore?.media;
  const [time, setTime] = useState(0);
  const handleIncrementTime = (increment: number) => {
    const newTime = Math.min(time + increment, 24); // Restrict to a maximum of 24 hours
    setTime(newTime);
  };
  const submitForm = () => {
    uploadStore.setTime(time);
  };
  return (
    <div>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button className=" rounded-full " variant="ghost">
              <Clock2 className="h-7 w-7 stroke-white" />
            </Button>
          </motion.div>
        </Drawer.Trigger>
        <Drawer.Portal className="">
          <Drawer.Overlay
            className="fixed inset-0 bg-black/40"
            style={{ zIndex: 20 }}
          />
          <Drawer.Content
            style={{ zIndex: 20 }}
            className="   flex flex-col rounded-t-[50px] h-[41vh] mt-5 fixed bottom-0 left-0 right-0"
          >
            <div
              style={{ zIndex: 20 }}
              className="p-4 pt-0 bg-[#101010] mt-[-0.5rem] rounded-t-[30px] flex-1 flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-between w-[88vw] self-center ml-2 mt-[0]">
                <motion.div whileTap={{ scale: 1.1 }}>
                  <RotateCw
                    onClick={() => {
                      setTime(0);
                    }}
                    className="rounded-full bg-gray-300 p-1 h-[33px] w-[33px]"
                  />
                </motion.div>
                <div
                  style={{ fontFamily: "Aeonik-Bold" }}
                  className="text-[1.1rem] text-white font-bold"
                >
                  Choose Duration
                </div>
                <Drawer.Close>
                  <motion.div whileTap={{ scale: 1.1 }}>
                    <Check
                      onClick={submitForm}
                      className="rounded-full bg-green-500 p-1 h-[32px] w-[32px] mr-2"
                    />
                  </motion.div>
                </Drawer.Close>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={time} // This is important to trigger animation when `time` changes
                  initial={{ scale: 1 }} // Initial animation state
                  animate={{ scale: 1.1 }} // Animation when `time` changes
                  exit={{ scale: 0.98 }}
                  style={{ fontFamily: "Aeonik" }}
                  className="p-2 rounded-lg text-[3rem] w-80% max-w-[10rem] mt-16 border-2 text-gray-100 border-gray-400 text-center"
                >
                  {time > 9 ? <p>{time}:00</p> : <p>0{time}:00</p>}
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-between w-[72vw] mt-18 self-center  mr-10 ml-10">
                <motion.div whileTap={{ scale: 1.1 }}>
                  {" "}
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      handleIncrementTime(1);
                    }}
                    className="rounded-full bg-white font-bold text-[1.1rem]"
                  >
                    +1hr
                  </Button>
                </motion.div>{" "}
                <motion.div whileTap={{ scale: 0.93 }}>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      handleIncrementTime(6);
                    }}
                    className="rounded-full bg-white font-bold text-[1.1rem]"
                  >
                    +6hr
                  </Button>
                </motion.div>{" "}
                <motion.div whileTap={{ scale: 1.2 }}>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      handleIncrementTime(12);
                    }}
                    className="rounded-full bg-white font-bold text-[1.1rem]"
                  >
                    +12hr
                  </Button>
                </motion.div>
              </div>
              <div className="text-[1.05rem] mt-3 text-gray-300 mt-4 ">
                Max Duration is 24hrs
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

export default ChooseTimeModal;
