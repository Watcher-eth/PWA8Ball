// @ts-nocheck

import React from "react";
import { Bell, Search } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { motion } from "framer-motion";
import { DesktopNotificationModal } from "../Notifications/DesktopNotificationModal";
import { SearchDesktopModal } from "../Search/SearchDesktopModal";
export const DesktopNavbar: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="flex justify-between items-center p-0 pb-8 pt-3 px-8 text-white">
      <motion.div
        onPress={{ scale: 0.98 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center"
      >
        <img
          src="/images/OrbLogo.png" // Replace with your image path
          alt="Left Icon"
          className="w-12 h-12 rounded-full"
        />
      </motion.div>
      <div className="flex items-center space-x-4">
        <SearchDesktopModal userId={user?.external_auth_provider_user_id}>
          <motion.div onPress={{ scale: 0.98 }} whileHover={{ scale: 1.05 }}>
            <Search className="w-6 h-6" strokeWidth={3} />
          </motion.div>
        </SearchDesktopModal>
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
