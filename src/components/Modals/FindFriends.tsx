// @ts-nocheck

import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";
import {FindFriends} from "../Share/InviteFriendsModal";

export function FindFriendsModal({ children }: { children: ReactNode }) {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="mt-4 active:scale-93 hover:scale-110 transition-all">
            {children}
          </div>
        </DrawerTrigger>
        <DrawerContent className="border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className={`
              bg-[#101010] rounded-3xl rounded-t-[20px]
              h-[90vh] mb-5 w-screen relative
            `}
          >
            <FindFriends type={1} />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
