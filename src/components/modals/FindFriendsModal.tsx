// @ts-nocheck
import { motion } from "framer-motion";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { FindFriends } from "@/components/share/FindFriends";

export function FindFriendsModal({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="mt-4 active:scale-93 hover:scale-101 transition-all">
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
