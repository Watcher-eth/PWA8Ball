import { AnimatePresence, motion } from "framer-motion";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { BoostExplainer } from "./BoostExplainer";

export function BoostExplainerModal({
  isOpen,
  setOpen,
  onClose,
}: {
  isOpen: boolean;
  setOpen: () => void;
  onClose: () => void;
}) {
  return (
    <Drawer open={isOpen}>
      <DrawerContent className="border-0 rounded-3xl self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className=" rounded-3xl  relative"
        >
          <AnimatePresence>
            <BoostExplainer setOpen={setOpen} onClose={onClose} />
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}
