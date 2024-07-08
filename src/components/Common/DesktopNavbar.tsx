// @ts-nocheck

import React from "react";
import useUserStore from "./useUserStore";
import { User } from "./types";
import { Bell } from "lucide-react";

export const DesktopNavbar: React.FC = () => {
  const user = useUserStore();

  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <div className="flex items-center">
        <img
          src="https://path-to-your-left-image.png" // Replace with your image path
          alt="Left Icon"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6" />
        {user && (
          <div className="flex items-center space-x-2">
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};
