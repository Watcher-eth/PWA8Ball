import {
  ActivityIcon,
  Home,
  Medal,
  PlusSquare,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
import { useAuthModalStore } from "@/lib/stores/ModalStore";
import { ACTIVITY_PATH, HOME_PATH, getProfilePath } from "@/utils/urls";

export function NavBar() {
  const { user } = useUserStore();
  const { isLoginModalOpen, openLoginModal, closeLoginModal } =
    useAuthModalStore();

  return (
    <div
      className="bg-black/[0.2]  items-center justify-center p-[0.9rem] rounded-full backdrop-blur-sm"
      style={{
        backdropFilter: "saturate(100%) blur(35px)",
        zIndex: 3,
        alignSelf: "center",
        border: "0.5px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      <div className="w-[65vw] flex px-2 justify-between items-center mx-auto">
        <Link href={HOME_PATH}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <Home className="h-6 text-white w-6" />
          </motion.div>
        </Link>
        {user?.walletaddress ? (
          <>
            <Link href={ACTIVITY_PATH}>
              <motion.div whileTap={{ scale: 0.94 }}>
                <ActivityIcon className="h-6 text-white w-6" />
              </motion.div>
            </Link>
            <Link href={getProfilePath(user.external_auth_provider_user_id)}>
              <motion.div whileTap={{ scale: 0.94 }}>
                {user?.pfp ? (
                  <img className="h-6 w-6 rounded-full" src={user?.pfp} />
                ) : (
                  <UserCircle className="h-6 text-white w-6" />
                )}
              </motion.div>
            </Link>
          </>
        ) : (
          <>
            <motion.div onClick={openLoginModal} whileTap={{ scale: 0.94 }}>
              <ActivityIcon className="h-6 text-white w-6" />
            </motion.div>
            <motion.div onClick={openLoginModal} whileTap={{ scale: 0.94 }}>
              {user?.pfp ? (
                <img className="h-6 w-6 rounded-full" src={user?.pfp} />
              ) : (
                <UserCircle className="h-6 text-white w-6" />
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
