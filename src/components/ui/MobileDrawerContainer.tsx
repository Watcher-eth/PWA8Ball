// @ts-nocheck
import { motion, LayoutGroup } from "framer-motion";

import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/useIsMobile";

export function MobileDrawerContainer({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <div suppressHydrationWarning={true}>
      <LayoutGroup>
        <motion.div layout className="font-[Aeonik-Bold] sm:hidden">
          <Drawer open={isMobile}>
            <DrawerContent className="flex flex-col fixed max-h-[103%] border-0 rounded-3xl items-center self-center">
              {children}
            </DrawerContent>
          </Drawer>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
