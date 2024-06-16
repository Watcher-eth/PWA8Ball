import { Home, Medal, PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
function NavBar() {
  return (
    <div
      className="w-full bg-black/[0.6] p-4 fixed bottom-0 backdrop-blur-md"
      style={{ backdropFilter: "saturate(180%) blur(20px)", zIndex: 3 }}
    >
      <div className="w-[85vw] flex px-2 justify-between items-center mx-auto">
        <Link href={"/"}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <Home className="h-7 text-white w-7" />
          </motion.div>
        </Link>
        <Link href={"/create"}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <PlusSquare className="h-7 text-white w-7" />
          </motion.div>
        </Link>
        <Link href={"/activity"}>
          <motion.div whileTap={{ scale: 0.94 }}>
            <Medal className="h-7 text-white w-7" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
