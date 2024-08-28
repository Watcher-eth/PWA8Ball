// @ts-nocheck

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { MailCheck } from "lucide-react";
import { FindFriendsModal } from "@/components/onboarding/Invites/FindFriendsModal";

export function InviteFriendsPlaceholder(props: { isDesktop: boolean }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }));
  }, [controls]);

  return (
    <div
      className={`flex h-full flex-col items-center ${
        props?.isDesktop ? "rounded-[1.5rem]" : "pt-[50px]"
      } bg-[#080808]`}
    >
      <motion.h1
        custom={1}
        initial={{ opacity: 0 }}
        animate={controls}
        className="text-[24px] my-[10px] mb-1 z-10 text-white font-bold"
      >
        More fun together
      </motion.h1>
      <motion.p
        custom={2}
        initial={{ opacity: 0 }}
        animate={controls}
        className="text-[15px] text-center px-[10px] text-[lightgray] -mb-3 z-10"
      >
        Invite your friends and see what they believe in
      </motion.p>
      <motion.img
        custom={3}
        initial={{ opacity: 0 }}
        animate={controls}
        src="/images/Friends.png"
        className="w-full object-cover h-[30%]"
      />
      <FindFriendsModal>
        <motion.button
          custom={4}
          initial={{ opacity: 0 }}
          animate={controls}
          className={`
            flex flex-row items-center justify-center
            py-[7px] px-[22px] rounded-[20px] overflow-hidden
            bg-white border-none cursor-pointer
          `}
        >
          <MailCheck
            style={{ marginBottom: -1 }}
            color="black"
            size={17}
            strokeWidth={3.4}
          />
          <span className="text-[16.5px] text-center font-bold text-black ml-[3px]">
            Invite
          </span>
        </motion.button>
      </FindFriendsModal>
    </div>
  );
}
