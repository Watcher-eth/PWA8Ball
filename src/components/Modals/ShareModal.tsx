// @ts-nocheck

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
import ShareBetModal from "../Share/ShareBet.tsx";
import ChallengeFriends from "../../../public/images/ChallengeFriends.png";
import { Toaster } from "../ui/sonner";

interface ShareModal {
  children: ReactNode;
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  options: string;
}
function ShareModal({
  children,
  id,
  title,
  image,
  topic,
  question,
  options,
}: ShareModal) {
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
        console.error("Share failed:");
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
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
            className="bg-white rounded-3xl  
        h-[90vh] mb-5 w-[100vw] relative"
          >
            <ShareBetModal
              id={id}
              title={title}
              image={image}
              topic={topic}
              question={question}
              options={options}
            />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default ShareModal;
