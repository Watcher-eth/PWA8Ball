import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { AtSign, Copy, Share, Users, X } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { toast } from "sonner";

import ChallengeFriends from "../../../public/images/ChallengeFriends.png";
import { Toaster } from "../ui/sonner";

interface ShareModal {
  children: ReactNode;
}
function ShareModal({ children }: ShareModal) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "WebShare Example",
          text: "Check out this website!",
          url: "https://www.example.com",
        });
        console.log("Data was shared successfully");
      } catch (err) {
        console.error("Share failed:", err.message);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log("Web Share not supported on this browser");
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <motion.div
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.1 }}
            className="mt-[1rem]"
          >
            {children}
          </motion.div>
        </DrawerTrigger>
        <Toaster
          position="top-center"
          style={{ zIndex: 100 }}
          className="bg-gray-200 rounded-xl"
        />

        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl  ml-[4vw] mb-5 w-[92vw] relative"
          >
            <div className="flex mt-6 w-[86vw] items-center justify-between">
              <Users
                size={35}
                className=" ml-6 stroke-gray-400"
                strokeWidth={3}
              />

              <DrawerClose>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className=" p-2 left-6 rounded-full self-start bg-gray-100"
                >
                  <X size={17} className="  stroke-gray-400" strokeWidth={5} />
                </motion.div>
              </DrawerClose>
            </div>
            <div className="text-gray-900 text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
              Challenge your friends
            </div>
            <div className="text-gray-400 flex  justify-between items-center text-base/[1.18rem] mt-[0.15rem] text-[0.9rem] m-[-0.2rem] font-bold mx-[1.65rem]">
              Challenge your friends to predict the outcome of 'China's
              Population 2030'
            </div>

            <div className="w-[80vw] my-4 mt-[-0rem] mx-6 h-[80vw] relative rounded-xl">
              <Image
                src={ChallengeFriends}
                alt="Photo by Drew Beamer"
                layout="fill"
                style={{ borderRadius: "6px" }}
                className=" object-cover"
              />
            </div>
            <div
              style={{ zIndex: 11 }}
              className="flex items-center mt-[-1.5rem]  w-[80vw mb-5   mx-6 justify-between mx-2"
            >
              <motion.div
                style={{ zIndex: 11 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText("Link");
                  toast.success("Copied to clipboard");
                }}
              >
                <Button
                  style={{ border: "1px solid lightgray" }}
                  className="active:bg-gray-100 space-x-1 flex items-center hover:bg-gray-100 bg-gray-100 text-[1.15rem] text-gray-500 font-bold  h-[2.8rem] rounded-full w-[38vw]"
                >
                  <Copy size={17} className="mt-[0.05rem]" strokeWidth={2} />
                  <div>Copy</div>
                </Button>
              </motion.div>

              <motion.div
                style={{ zIndex: 11 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
              >
                <Button className="active:bg-black space-x-1 flex items-center hover:bg-black bg-black text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full w-[38vw]">
                  <Share size={19} className="mt-[0rem]" strokeWidth={3} />
                  <div>Share</div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ShareModal;
