// @ts-nocheck

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer.tsx";
import { Button } from "../ui/button.tsx";
import { motion } from "framer-motion";
import { AtSign, Copy, Share, Users, X } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio.tsx";
import Image from "next/image";
import { toast } from "sonner";
import ShareBetModal from "../Share/ShareBet.tsx";
import ChallengeFriends from "../../../public/images/ChallengeFriends.png";
import { Toaster } from "../ui/sonner.tsx";
import { MobileOnly } from "@/components/Common/MobileOnly";

interface ShareModal {
  open: boolean;
}
function MobileOnlyModal({ open }: ShareModal) {
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
      <Drawer open={open}>
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
        h-[100vh] mb-5 w-[100vw] relative"
          >
            <MobileOnly />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileOnlyModal;
