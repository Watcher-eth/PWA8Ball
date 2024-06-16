import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScanFace, Vote } from "lucide-react";
import useVotingStore from "@/lib/stores/VotingStore";
function ConfirmActionModal(props: {
  setStep: (step: number) => void;
  image: string;
  option: string;
  options: string[];
}) {
  // Confirm price and purchase
  //Cancle to go back
  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  const amount = useVotingStore((state) => state.amount);

  return (
    <motion.div
      key="step3"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        style={{ borderRadius: "2.8rem" }}
        className="h-[5.6rem] w-[5.6rem] object-cover my-2 align-center"
        src={props?.image}
      />
      <div
        style={{ fontFamily: "Aeonik-Bold", alignSelf: "center" }}
        className="text-white flex items-center justify-between   text-[1.45rem] font-bold  align-center "
      >
        Confirm your prediction
      </div>
      <div
        style={{ alignSelf: "center" }}
        className="text-gray-100 flex items-center justify-between   text-[0.9rem]  align-center "
      >
        Who will win the 2024 US Presidential Elections?
      </div>

      <div
        className="py-1 px-2"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,

          borderRadius: 15,

          backgroundColor: props?.option === 0 ? "#75171D" : "#013145",
          marginBottom: -30,
          zIndex: 3,
        }}
      >
        <Vote
          color={props?.option === 0 ? "#E23B3B" : "#0596FF"}
          height={20}
          style={{ marginBottom: 1.2 }}
        />
        <div
          style={{
            fontSize: 16,
            color: props?.option === 0 ? "#E23B3B" : "#0596FF",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          {props?.options[props?.option]}
        </div>
      </div>
      <div
        className="py-20"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1B1B1E",
          borderRadius: 12,
          position: "relative",
          width: "90%",
          margin: 15,
          padding: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <div
            style={{
              fontSize: 45,
              color: "white",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 1,
            }}
          >
            ${amount.toPrecision(2)}
          </div>
        </div>
        <div
          style={{
            fontSize: 14,
            color: "lightgray",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Potential Payout{" "}
          {props.option === 0
            ? (100 / 60).toFixed(1)
            : (100 / (100 - 60)).toFixed(1)}
          x
        </div>
      </div>
      <div className="flex items-center mt-5 w-[80vw]  mb-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(3 - 1)}
            className="active:bg-[#1D1D1D] text-[#D9D9D9] hover:bg-[#1D1D1D] bg-[#1D1D1D] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(2 + 1)}
        >
          <Button className="active:bg-[#D9D9D9] space-x-1 flex items-center hover:bg-black bg-[#D9D9D9] text-[1.15rem] text-[#1D1D1D] font-bold  h-[2.8rem] rounded-full w-[38vw]">
            <ScanFace size={20} className="mt-[0.05rem]" strokeWidth={2} />
            <div>Confirm</div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ConfirmActionModal;
