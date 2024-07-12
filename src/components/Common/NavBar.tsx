// @ts-nocheck

import {
  ActivityIcon,
  Home,
  Medal,
  PlusSquare,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
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
      className="bg-black/20 items-center justify-center p-[0.9rem] rounded-full backdrop-blur-sm"
      style={{
        backdropFilter: "saturate(100%) blur(35px)",
        zIndex: 3,
        alignSelf: "center",
        border: "0.5px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      <div className="w-[65vw] max-w-[17rem] flex px-2 justify-between items-center mx-auto">
        <Link href={HOME_PATH}>
          <div className="active:scale-94">
            <Home className="h-6 text-white w-6" />
          </div>
        </Link>
        {user?.walletaddress ? (
          <>
            <Link href={ACTIVITY_PATH}>
              <div className="active:scale-94">
                <ActivityIcon className="h-6 text-white w-6" />
              </div>
            </Link>
            <Link href={getProfilePath(user.external_auth_provider_user_id)}>
              <div className="active:scale-94">
                {user?.pfp ? (
                  <img className="size-6 rounded-full" src={user?.pfp} />
                ) : (
                  <UserCircle className="h-6 text-white w-6" />
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <div className="active:scale-94" onClick={openLoginModal}>
              <ActivityIcon className="h-6 text-white w-6" />
            </div>
            <div className="active:scale-94" onClick={openLoginModal}>
              {user?.pfp ? (
                <img className="size-6 rounded-full" src={user?.pfp} />
              ) : (
                <UserCircle className="h-6 text-white w-6" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
