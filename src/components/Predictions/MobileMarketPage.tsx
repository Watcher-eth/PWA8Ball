

import React, { useEffect, useState } from "react";
import { motion, LayoutGroup } from 'framer-motion';

import { DesktopNavbar } from "@/components/Common/DesktopNavbar";
import { PredictModal } from "@/components/Modals/PredictModal";
import { ShareModal } from "@/components/Modals/ShareModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetUsersByMarketId } from "@/supabase/queries/markets/useGetUsersByMarketId";
import { useGetMarketById } from "@/supabase/queries/useGetMarketById";

import { BettersOverviewModal } from "@/components/Predictions/Betters/OverviewModal";
import { CommentSection } from "@/components/Posts/Comments/CommentSection";
import { BetDetails } from "@/components/Predictions/Details";
import { RelatedMarkets } from "@/components/Predictions/RelatedMarkets";
import { fillUserImages } from "@/utils/fillUserImages";
import { DisplayFeedDrawerContent } from "../Feed/FeedCard";
import { formatMarket } from "../Feed/formatMarketArr";
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";

export function MobileMarketPage({ market, users }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const { user } = useUserStore();
  const openLoginModal = useModalStore((state) => state.openLoginModal);
  const userImages = fillUserImages(users, 3);
  const isMobile = useMediaQuery("(max-width: 640px)");


  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (global?.window?.innerWidth < 640) {
      setHasMounted(true);
    }
  }, []);
  const router = useRouter();

  return (
    <LayoutGroup>
      <motion.div layout className="font-[Aeonik-Bold] sm:hidden">
        <Drawer open={isMobile}>
          <DrawerContent className=" flex flex-col fixed max-h-[103%] border-0 rounded-3xl items-center self-center">
            {market && (
              <DisplayFeedDrawerContent
                setIsDrawerOpen={() => {
                  setIsDrawerOpen(false);
                }}
                users={users}
                market={market}
                userImages={userImages}
                openLoginModal={openLoginModal}
                handleOpen={() => {}}
                {...formatMarket(market)}
              />
            )}
          </DrawerContent>
        </Drawer>
      </motion.div>
    </LayoutGroup>
  );
}



