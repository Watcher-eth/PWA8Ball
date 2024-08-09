// @ts-nocheck
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { motion } from "framer-motion";

import { NotificationsContent } from "./NotificationsContent";

export function NotificationsModal({
  children,
}: {
  children: React.ReactNode;
}) {
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
            className={`bg-[#080808] rounded-t-3xl
        h-[95vh] mb-5 w-screen relative`}
          >
            <NotificationsContent />
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
