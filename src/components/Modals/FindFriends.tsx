// @ts-nocheck

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import {FindFriends} from "../Share/InviteFriendsModal";

export function FindFriendsModal({ children }: { children: ReactNode }) {
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
            className="bg-[#101010] rounded-3xl
        h-[90vh] mb-5 w-[100vw] relative"
          >
            <FindFriends type={1} />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
