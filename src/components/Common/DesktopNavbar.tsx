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
        className="flex items-center active:scale-[0.98] hover:scale-[1.05] transition-all duration-300"
      >
        <img
          src="/images/OrbLogo.png" // Replace with your image path
          alt="Left Icon"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex items-center space-x-8">
        <DesktopSearchModal userId={user?.external_auth_provider_user_id}>
          <motion.div onPress={{ scale: 0.98 }} whileHover={{ scale: 1.05 }}>
            <Search className="w-6 h-6" strokeWidth={3} />
          </motion.div>
        </DesktopSearchModal>
        <DesktopNotificationModal userId={user?.external_auth_provider_user_id}>
          <motion.div onPress={{ scale: 0.98 }} whileHover={{ scale: 1.05 }}>
            <Bell className="w-6 h-6" strokeWidth={3} />
          </motion.div>
        </DesktopNotificationModal>
        {user && (
          <motion.div
            onPress={{ scale: 0.98 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <img
              src={user.pfp}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
