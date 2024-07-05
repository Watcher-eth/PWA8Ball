// @ts-nocheck

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";


import { Toaster } from "@/components/ui/sonner";
import { ShareTopic } from "@/components/Share/ShareTopic";

export function ShareTopicModal({
  children,
  id,
  title,
  image,
  topic,
  question,
  members,
  markets,
}: {
  children: ReactNode;
  id: string;
  title: string;
  image: string;
  topic: string;
  question: string;
  members: number;
  markets: number;
}) {
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
            className="bg-white rounded-3xl h-[90vh] mb-5 w-[100vw] relative"
          >
            <ShareTopic
              id={id}
              title={title}
              image={image}
              topic={topic}
              question={question}
              members={members}
              markets={markets}
            />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

