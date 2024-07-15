// @ts-nocheck

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { motion } from "framer-motion";

import { ShareTopic } from "../Share/ShareTopic.tsx";

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
          <motion.div className="mt-4 hover:scale-110 active:scale-93 transition-all">
            {children}
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
            className="bg-white rounded-3xl
        h-[90vh] mb-5 w-screen relative"
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

