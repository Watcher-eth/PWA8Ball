// @ts-nocheck

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UploadImage from "./uploadImage";
import AddTitle, { AddSubject } from "./titleAndSubject";
import AddQuestion from "./description";
import ConfirmSceen from "./confirmAndPublish";
import CommentModal from "../comment/commentModal";
function CreateChallenge() {
  const [step, setStep] = useState(1);

  // TODO: Problem

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <motion.div
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.1 }}
            className="mt-[1rem]"
          >
            <Button className="bg-gray-600 text-white rounded-xl">
              create
            </Button>
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#101010] rounded-3xl  ml-[4vw] mb-5 w-[92vw] relative"
          >
            <div className="flex mt-6 w-[86vw] items-center justify-between">
              {step === 1 && (
                <div className="text-white text-[1.7rem] font-bold mx-[1.65rem]">
                  Reply to
                </div>
              )}
              {step === 2 && (
                <div className="text-white text-[2rem] font-bold mx-[1.65rem]">
                  Question
                </div>
              )}
              {step === 3 && (
                <div className="text-white text-[2rem] font-bold mx-[1.65rem]">
                  Title
                </div>
              )}
              {step === 4 && (
                <div className="text-white text-[2rem] font-bold mx-[1.65rem]">
                  Subject
                </div>
              )}
              {step === 5 && (
                <div className=" text-white text-[2rem] font-bold mx-[1.65rem]">
                  Upload Cover
                </div>
              )}
              {step === 6 && (
                <div className="text-gray-300 flex  justify-between items-center text-[1.2rem] m-[-0.2rem] font-bold mx-[1.65rem]">
                  [Confirm your selection]
                </div>
              )}

              <DrawerClose>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className=" p-2 left-6 rounded-full  bg-gray-100"
                >
                  <X size={17} className="  stroke-gray-400" strokeWidth={5} />
                </motion.div>
              </DrawerClose>
            </div>
            <AnimatePresence>
              {step === 1 && <CommentModal setStep={setStep} />}

              {step === 2 && <AddQuestion setStep={setStep} />}
              {step === 3 && <AddTitle setStep={setStep} />}
              {step === 4 && <AddSubject setStep={setStep} />}
              {step === 5 && <UploadImage setStep={setStep} />}
              {step === 6 && (
                <div className="flex flex-col items-center space-y-0">
                  <ConfirmSceen />{" "}
                  <div className="flex items-center mt-2 w-[80vw]  pb-7 mx-6 justify-between mx-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setStep(4)}
                        className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
                      >
                        Back
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(5)}
                    >
                      <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200  text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
                        Upload
                      </Button>
                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default CreateChallenge;
