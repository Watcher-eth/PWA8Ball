// @ts-nocheck

import React, { ReactNode, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  BadgeDollarSign,
  CreditCard,
  MinusIcon,
  PlusIcon,
  Repeat,
  ShoppingBag,
  Vote,
  WalletCards,
  X,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import GetGhoModal from "./getGhoModal";
import ConfirmActionModal from "./confirmActionModal";
import BuyModal from "./buyModal";
import useVotingStore from "@/lib/stores/VotingStore";
import Marquee from "react-fast-marquee";
import { useModalStore } from "@/lib/stores/ModalStore";
import { useUserStore } from "@/lib/stores/UserStore";

function VotingModal(props: {
  text: string;
  option: number;
  multiplier: number;
  image: string;
  question: string;
  options: string[];
  marketId: string;
  odds: number;
  handleOpen: () => void;
}) {
  const [goal, setGoal] = React.useState(1);
  const [step, setStep] = React.useState(1);

  function onClick(adjustment: number) {
    setGoal(Math.max(1, Math.min(15, goal + adjustment)));
  }
  const stepVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const [sliderValue, setSliderValue] = useState(""); // Use a string to hold the value
  const setVotingState = useVotingStore((state) => state.setState);

  const userBalance = 40;

  const formatWithCommas = (value) => {
    // Remove all commas
    let newValue = value.replace(/,/g, "");

    // Split the value into integer and decimal parts
    const parts = newValue.split(".");
    let integerPart = parts[0] || "";
    let decimalPart = parts[1] || "";

    // Limit the decimal part to two digits
    decimalPart = decimalPart.slice(0, 2);

    // Add commas for thousands, millions, etc. to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer and decimal parts with a decimal point
    newValue = integerPart + (decimalPart ? "." + decimalPart : "");

    return newValue;
  };

  const baseFontSize = "4rem";
  const lengthAdjustmentThreshold = 3;
  const fontSizeAdjustmentFactor = 0.95;

  const [fontSize, setFontSize] = useState(baseFontSize);
  const [paddingTop, setPaddingTop] = useState(62);
  const [paddingBottom, setPaddingBottom] = useState(55);

  useEffect(() => {
    const newLength =
      sliderValue.length > lengthAdjustmentThreshold
        ? Math.pow(
            fontSizeAdjustmentFactor,
            sliderValue.length - lengthAdjustmentThreshold
          ) * parseFloat(baseFontSize)
        : parseFloat(baseFontSize);
    setFontSize(`${newLength}rem`); // animate the change
  }, [sliderValue]);

  const handleButtonPress = (value) => {
    if (value === ".") {
      // Add a decimal point only if there isn't one already
      if (!sliderValue.includes(".")) {
        setSliderValue((prev) => prev + value);
      }
    } else {
      // Ensure the decimal has been added and limit the decimal part to two digits
      if (!sliderValue.includes(".")) {
        // If there's no decimal, just add the number
        if (sliderValue.length < 12)
          setSliderValue((prev) => formatWithCommas(prev + value));
      } else {
        // If there is a decimal, split the value
        const parts = sliderValue.split(".");
        const integerPart = parts[0];
        const decimalPart = parts[1] || "";

        // Check if the decimal part is less than 2
        if (decimalPart.length < 2) {
          // Update the slider value with the new number added to the decimal part
          setSliderValue(integerPart + "." + decimalPart + value);
        }
      }
    }
  };

  const handleDelete = () => {
    setSliderValue((prev) => formatWithCommas(prev.slice(0, -1)));
  };

  const confirmSelection = (option) => {
    if (parseFloat(sliderValue.replace(/,/g, "")) >= userBalance) {
      // showToast();
      return;
    }
    setVotingState({
      amount: parseFloat(sliderValue.replace(/,/g, "")),
    });
  };

  const amount = useVotingStore((state) => state.amount);
  const { user } = useUserStore();
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <motion.div
            onClick={() => {
              if (!user?.walletaddress) props.handleOpen();
            }}
            whileTap={{ scale: 0.93 }}
            className="mt-[1rem]"
          >
            {props?.option === 0 && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="active:bg-[#FF0050] hover:bg-[#FF0050] bg-[#FF0050] text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl w-[42vw]">
                  <div style={{ fontSize: props?.text?.length < 6 ? 22 : 18 }}>
                    {props?.text}{" "}
                  </div>
                  <div
                    style={{
                      marginLeft: "0.2rem",
                      fontSize: "0.81rem",
                      color: "rgba(250, 250, 250, 0.8)",
                      fontWeight: 500,
                      alignSelf: "flex-end",
                      marginBottom: 2,
                    }}
                  >
                    {props?.multiplier}%
                  </div>
                </Button>
              </motion.div>
            )}
            {props?.option === 1 && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="active:bg-[#0050FF] hover:bg-[#0050FF] bg-[#0050FF] text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl w-[42vw]">
                  <div style={{ fontSize: props?.text?.length < 6 ? 22 : 18 }}>
                    {" "}
                    {props?.text}
                  </div>
                  <div
                    style={{
                      marginLeft: "0.2rem",
                      fontSize: "0.81rem",
                      color: "rgba(250, 250, 250, 0.8)",
                      fontWeight: 500,
                      alignSelf: "flex-end",
                      marginBottom: 2,
                    }}
                  >
                    {props?.multiplier}%
                  </div>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className=" border-0 rounded-[2rem] self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl   w-[100vw] relative"
          >
            <AnimatePresence>
              {step === 1 && (
                <div className="flex flex-col p-8 w-full pt-4 bg-[#131313] rounded-[2.5rem] pb-8 z-15">
                  <div className="flex flex-row items-center bg-gray-[#212121] rounded-2xl  w-full justify-center relative">
                    <img
                      className="h-8 w-8 rounded-full object-cover "
                      src={props?.image}
                      alt="Question"
                    />
                    <Marquee className="ml-2">
                      <span className="text-lg font-bold text-gray-400 whitespace-nowrap">
                        {props.question}
                        {"   "}
                      </span>
                    </Marquee>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    style={{ paddingTop, paddingBottom }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <span className="text-3xl font-mono text-gray-400 mr-1">
                        $
                      </span>
                      <motion.span
                        className="font-bold text-gray-400"
                        animate={{ fontSize }}
                        transition={{ duration: 0.3 }}
                      >
                        {sliderValue || "0.00"}
                      </motion.span>
                    </div>

                    {parseFloat(sliderValue.replace(/,/g, "")) <=
                      userBalance.toFixed(2) || sliderValue === "" ? (
                      <div className="flex flex-row items-center mt-0">
                        <div
                          className="p-1 bg-red-500 rounded-full"
                          style={{
                            backgroundColor:
                              props.option === 0 ? "#FF0050" : "#0050FF",
                          }}
                        >
                          <Vote color="white" strokeWidth={3} size={16} />
                        </div>
                        <span className="text-lg font-bold text-gray-200 ml-2">
                          {props.options[props.option]}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center mt-0">
                        <span className="text-sm font-bold text-red-600 ml-2">
                          Bro you can't even afford a hair cut 😵‍💫
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-2 py-1 rounded-xl w-full border border-dashed border-orange-500 mb-4">
                    <span className="text-lg font-bold text-orange-500 text-center block">
                      Possible Payout: $
                      {(
                        parseFloat(sliderValue.replace(/,/g, "")) *
                        (props.option === 0
                          ? 100 / props.multiplier
                          : 100 / (99 - props.multiplier))
                      ).toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between px-2">
                    {["10", "25", "50", "100", userBalance.toFixed(2)].map(
                      (amount) => (
                        <motion.button
                          key={amount}
                          onClick={() => setSliderValue(String(amount))}
                          className="text-sm font-bold p-1 px-3 rounded-xl bg-[#212121] text-white mr-2 mb-1"
                          whileTap={{ scale: 0.95 }}
                        >
                          {amount === userBalance.toFixed(2)
                            ? "Max"
                            : `$${amount}`}
                        </motion.button>
                      )
                    )}
                  </div>
                  <div className="flex flex-col -mx-5">
                    {[
                      ["1", "2", "3"],
                      ["4", "5", "6"],
                      ["7", "8", "9"],
                    ].map((row) => (
                      <div
                        key={row.join()}
                        className="flex flex-row justify-between items-center px-2 py-4"
                      >
                        {row.map((num) => (
                          <motion.button
                            key={num}
                            onClick={() => handleButtonPress(num)}
                            className="text-xl font-bold text-white px-5"
                            whileTap={{ scale: 0.95 }}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                    ))}
                    <div className="flex flex-row justify-between items-center px-2 py-4 pb-0">
                      <motion.button
                        onClick={() => handleButtonPress(".")}
                        className="text-xl font-bold text-white px-5"
                        whileTap={{ scale: 0.95 }}
                      >
                        .
                      </motion.button>
                      <motion.button
                        onClick={() => handleButtonPress("0")}
                        className="text-xl font-bold text-white px-5"
                        whileTap={{ scale: 0.95 }}
                      >
                        0
                      </motion.button>
                      <motion.button
                        onClick={handleDelete}
                        className="text-xl font-bold text-white px-5"
                        whileTap={{ scale: 0.95 }}
                      >
                        {`<`}
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center w-full mt-4 justify-center">
                    {sliderValue === "" ? (
                      <DrawerClose>
                        <motion.button
                          className="mt-5 p-2 rounded-full bg-white w-[80vw] text-[1rem] text-center text-[#131313] font-extrabold"
                          whileTap={{ scale: 0.95 }}
                        >
                          Cancel
                        </motion.button>
                      </DrawerClose>
                    ) : (
                      <motion.button
                        onClick={() => {
                          confirmSelection(2);
                          setStep(2);
                        }} // Assuming the next step index is 1
                        className="mt-5 p-2 rounded-full bg-white w-[80vw] text-[1rem] text-center text-[#131313] font-extrabold"
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue
                      </motion.button>
                    )}
                  </div>
                </div>
              )}
              {step === 2 && user?.balance > amount ? (
                <ConfirmActionModal
                  option={props?.option}
                  options={props?.options}
                  image={props?.image}
                  question={props?.question}
                  title={props?.text}
                  setStep={setStep}
                  id={props?.marketId}
                  odds={props.odds}
                />
              ) : step === 2 ? (
                <GetGhoModal setStep={setStep} />
              ) : null}
              {step === 3 && (
                <ConfirmActionModal
                  option={props?.option}
                  options={props?.options}
                  image={props?.image}
                  question={props?.question}
                  title={props?.text}
                  setStep={setStep}
                  id={props?.marketId}
                  odds={props.odds}
                />
              )}
              {step === 4 && <BuyModal setStep={setStep} method={1} />}
              {step === 5 && <BuyModal setStep={setStep} method={2} />}
              {step === 6 && <BuyModal setStep={setStep} method={3} />}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default VotingModal;
