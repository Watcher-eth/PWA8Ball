// @ts-nocheck

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { BettersOverview } from "./BettersOverview";

export function MobileBettersModal({
  children,
  title,
  question,
  image,
  optionA,
  optionB,
  odds,
  marketId,
  users,
}) {
  return (
    <div className="z-2">
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#080808] rounded-3xl  self-center mb-5 w-[95vw] relative"
          >
            <AnimatePresence>
              <BettersOverview
                isDesktop={false}
                title={title}
                question={question}
                image={image}
                optionA={optionA}
                optionB={optionB}
                odds={odds}
                marketId={marketId}
                users={users}
              />
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
