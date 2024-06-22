import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Profile(props: { setStep: (step: number) => void }) {
  async function authenticateUser() {
    console.log("authenticting user");
  }

  return (
    <div>
      <div className="text-gray-900 text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Sign in with Lens
      </div>
      <div className="text-gray-400 flex   text-base/[1.14rem]  items-center  text-[1rem] mb-4  font-bold mx-[1.65rem]">
        Please log in with your Lens Profile or create a new one to continue.
      </div>
      <div className="h-[0.05rem] w-[80vw] my-6 bg-gray-300 mx-6 rounded-full" />
      <motion.div
        onClick={() => {
          authenticateUser();
          props.setStep(4);
        }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          style={{
            backgroundColor: "#3D4B41",
            fontSize: "1.19rem",
            fontWeight: "bold",
            color: "#DBCCF3",
          }}
          className="w-[81vw]  font-bold text-gray-700 mx-5 h-12 my-0 space-x-0 mb-6 flex items-center rounded-xl"
        >
          <img
            className="h-[2.8rem] nml-[-0.25rem] mt-[0.15rem] w-[2.8rem]"
            src="https://github.com/lens-protocol/brand-kit/blob/074e865b5da4b2b80133915b15e82f9ba1f02881/01%20Logo/PNG/@1x/Icon-T-Purple_@1x.png?raw=true"
          />
          <div>Sign in </div>
        </Button>
      </motion.div>
    </div>
  );
}

export default Profile;
