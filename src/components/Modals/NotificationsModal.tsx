// @ts-nocheck

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { NotificationsModalPage } from "../Notifications/NotificationModalPage";


export function NotificationsModal({ children }: {
  children: ReactNode;
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
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
            className="bg-[#171717] rounded-t-3xl
        h-[95vh] mb-5 w-[100vw] relative"
          >
            <NotificationsModalPage />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
