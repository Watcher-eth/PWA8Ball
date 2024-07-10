// @ts-nocheck

import React from "react";
import { Bell } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { motion } from "framer-motion";
export const DesktopNavbar: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="flex justify-between items-center p-0 pb-8 pt-3  text-white">
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
        <motion.div onPress={{ scale: 0.98 }} whileHover={{ scale: 1.05 }}>
          <Bell className="w-6 h-6" strokeWidth={3} />
        </motion.div>
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
