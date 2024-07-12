// @ts-nocheck

import React from "react";
import { Bell, Search } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { motion } from "framer-motion";
import { DesktopNotificationModal } from "../Notifications/DesktopNotificationModal";
import { DesktopSearchModal } from "../Search/DesktopSearchModal";
export function DesktopNavbar() {
  const { user } = useUserStore();

  return (
    <div className="flex justify-between items-center p-0 pb-8 pt-3 px-8 text-white">
      <div
        className="flex items-center active:scale-98 hover:scale-105 transition-all duration-300"
      >
        <img
          src="/images/OrbLogo.png" // Replace with your image path
          alt="Left Icon"
          className="size-12 rounded-full"
        />
      </div>
      <div className="flex items-center space-x-8">
        <DesktopSearchModal userId={user?.external_auth_provider_user_id}>
          <div className="active:scale-98 hover:scale-105">
            <Search className="size-6" strokeWidth={3} />
          </div>
        </DesktopSearchModal>
        <DesktopNotificationModal userId={user?.external_auth_provider_user_id}>
          <motion.div
            className="hover:scale-105 active:scale-98 transition-all"
            onPress={{ scale: 0.98 }}
            whileHover={{ scale: 1.05 }}
          >
            <Bell className="size-6" strokeWidth={3} />
          </motion.div>
        </DesktopNotificationModal>
        {user && (
          <div
            className="flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all"
          >
            <img
              src={user.pfp}
              alt={user.name}
              className="size-8 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};
