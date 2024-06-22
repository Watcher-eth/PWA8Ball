import { ActivityIcon, Home, Medal, PlusSquare, UserCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
function NavBar() {
  const { user } = useUserStore();
  return (
    <div
      className="bg-black/[0.2] items-center justify-center p-[0.9rem] rounded-full backdrop-blur-md"
      style={{
        backdropFilter: "saturate(100%) blur(35px)",
        zIndex: 3,
        alignSelf: "center",
      }}
    >
      <div className="w-[65vw] flex px-2 justify-between items-center mx-auto">
        <Link href={"/"}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <Home className="h-6 text-white w-6" />
          </motion.div>
        </Link>
        <Link href={"/activity"}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <ActivityIcon className="h-6 text-white w-6" />
          </motion.div>
        </Link>
        <Link href={`/profile/${user?.external_auth_provider_user_id}`}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <UserCircle className="h-6 text-white w-6" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
