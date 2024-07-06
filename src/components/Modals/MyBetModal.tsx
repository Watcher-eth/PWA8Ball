// @ts-nocheck

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { AtSign, Copy, Share, Users, X } from "lucide-react";
import { AspectRatio } from "../ui/AspectRatio";
import Image from "next/image";
import { toast } from "sonner";

import ChallengeFriends from "../../../public/images/ChallengeFriends.png";
import { Toaster } from "../ui/Toaster";
import MyBetModal from "../Common/Charts/MyBetModal.tsx";

interface BetModalProps {
  children: ReactNode;
  title: string;
  image: string;
  price: number;
  ownedAmount: number;
  options: string[];
  percentage: number;
  betId: string;
  topic: string;
  icon: string;
  question: string;
  name?: string;
  userId?: string;
  option?: number;
  optionNumber?: number;
  isExternal?: boolean;
  onClose: () => void;
  openCashout: () => void;
  handleReceipt: () => void;
}
export function BetModal({
  children,
  title,
  image,
  price,
  ownedAmount,
  options,
  percentage,
  betId,
  topic,
  icon,
  question,
  name,
  userId,
  option,
  optionNumber,
  isExternal,
  onClose,
  openCashout,
  handleReceipt,
}: BetModalProps) {
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
        console.error("Share failed:", err);
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
            className=" rounded-t-3xl
        h-[90vh] w-[100vw] relative"
          >
            <MyBetModal
              title={title}
              image={image}
              price={price}
              ownedAmount={ownedAmount}
              options={options}
              percentage={percentage}
              betId={betId}
              topic={topic}
              icon={icon}
              question={question}
              name={name}
              userId={userId}
              option={option}
              optionNumber={optionNumber}
              isExternal={isExternal}
              onClose={onClose}
              openCashout={openCashout}
              handleReceipt={handleReceipt}
            />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
