// @ts-nocheck

import React from "react";
import { TypewriterEffectSmooth } from "./Animated/AnimatedText";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
export function MobileOnly() {
  const words = [
    {
      text: "''The",
      className: "text-[#212121] dark:white text-[2.2rem]",
    },
    {
      text: "future",
      className: "text-[#212121] dark:white text-[2.2rem]",
    },
    {
      text: "awaits''",
      className: "text-[#212121] dark:white text-[2.2rem]",
    },
  ];

  const words2 = [
    {
      text: "The ",
      className: "text-[#212121] dark:white text-[1.1rem]",
    },
    {
      text: "future",
      className: "text-[#212121] dark:white text-[1.1rem]",
    },
    {
      text: "is",
      className: "text-[#212121] dark:white text-[1.1rem]",
    },
    {
      text: "not",
      className: "text-[#212121] dark:white text-[1.1rem]",
    },
    {
      text: "a.",
      className: "text-[#212121] dark:white text-[1.1rem]",
    },
    {
      text: "destionation",
      className: "text-[#212121] dark:white text-[1.1rem]",
    },
  ];
  return (
    <div className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <p className="text-4xl h-[80vh] sm:text-7xl font-bold justify-between mb-10 relative items-center flex flex-col z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <TypewriterEffectSmooth index={1} words={words} />

        <motion.img
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="h-[20vh] rounded-[2rem] shadow-lg "
          src={"/images/Logo.png"}
        />

        <motion.Button className="my-[-1.5rem] text-[#313131] text-[1.4rem]">
          Mobile only
        </motion.Button>
      </p>
    </div>
  );
}

// components/withDeviceCheck.js

import { useEffect } from "react";
import { useRouter } from "next/router";
import { isMobile } from "@/utils/isMobile";

const withDeviceCheck = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isMobile()) {
        router.replace("/mobileOnly");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withDeviceCheck;
