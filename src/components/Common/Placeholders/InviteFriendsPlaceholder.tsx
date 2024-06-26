import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { MailCheck } from "lucide-react";

const InviteFriendsPlaceholder: React.FC = () => {
  const router = useRouter();
  const controls = useAnimation();
  const { height, width } = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#101010",
        paddingTop: 50,
        height: height,
      }}
    >
      <motion.h1
        custom={1}
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          fontSize: 24,
          margin: "10px 0 0px",
          color: "white",
          zIndex: 10,
          fontWeight: 700,
        }}
      >
        More fun together
      </motion.h1>
      <motion.p
        custom={2}
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          fontSize: 15,
          textAlign: "center",
          padding: "0 10px",
          color: "lightgray",
          marginBottom: -20,
          zIndex: 10,
        }}
      >
        Invite your friends and see what they believe in
      </motion.p>
      <motion.img
        custom={3}
        initial={{ opacity: 0 }}
        animate={controls}
        src="/images/Friends.png"
        style={{
          width: "100vw",
          height: height / 3.9,
        }}
      />
      <motion.button
        custom={4}
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          padding: "7px 22px",
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
        }}
        onClick={() => {
          router.push("/findFriendsModal");
        }}
      >
        <MailCheck
          style={{ marginBottom: -1 }}
          color="black"
          size={17}
          strokeWidth={3.4}
        />
        <span
          style={{
            fontSize: 16.5,
            textAlign: "center",
            fontWeight: 700,
            color: "black",
            marginLeft: 3,
          }}
        >
          Invite
        </span>
      </motion.button>
    </div>
  );
};

export default InviteFriendsPlaceholder;
