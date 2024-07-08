// @ts-nocheck

import React, { useEffect } from "react";
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
  AtSign,
  BadgeDollarSign,
  Contact,
  CreditCard,
  MinusIcon,
  PlusIcon,
  Repeat,
  ShoppingBag,
  WalletCards,
  Receipt,
  X,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function BoostExplainerModal({ isOpen, setOpen, onClose }) {
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

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="border-0 rounded-3xl self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className=" rounded-3xl  relative"
        >
          <AnimatePresence>
            <BoostExplainer setOpen={setOpen} onClose={onClose} />
          </AnimatePresence>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}

export default BoostExplainerModal;

import { BatteryCharging, CalendarClock } from "lucide-react";

interface BetModalConfirmationScreenProps {
  setOpen: () => void;
  onClose: () => void;
}

const BoostExplainer: React.FC<BetModalConfirmationScreenProps> = (props) => {
  const { setOpen, onClose } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#131313",
        padding: "15px 0",
        marginTop: "40px",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        minHeight: "585px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#131313",
          padding: "15px 23px",
          borderRadius: "20px",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          style={{
            padding: "8px 6px",
            borderRadius: "17px",
            overflow: "hidden",
            position: "absolute",
            left: "85%",
            top: "75px",
            backgroundColor: "#282828",
            border: "none",
            cursor: "pointer",
          }}
        >
          <X color={"#686868"} strokeWidth={5} height={20} />
        </motion.button>
        <h2
          style={{
            marginTop: "7px",
            fontSize: "24px",
            color: "white",
            fontWeight: 700,
            marginBottom: "8px",
            alignSelf: "flex-start",
          }}
        >
          What is boosting?
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "lightgray",
            marginBottom: "37px",
            fontWeight: 500,
            alignSelf: "flex-start",
          }}
        >
          If you boost a market you add some of your funds to improve the
          accuracy of odds for a prediction and help everyone get fairer prices.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
          }}
        >
          <BatteryCharging
            color="white"
            strokeWidth={3}
            size={50}
            style={{ marginRight: "10px", marginTop: -10 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: 600,
                marginBottom: "6px",
                alignSelf: "flex-start",
              }}
            >
              Improve accuracy of odds
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "lightgray",
                fontWeight: 400,
                marginBottom: "8px",
                alignSelf: "flex-start",
                paddingRight: "1.5px",
              }}
            >
              Boost a market with your funds to improve the accuracy of odds and
              liquidity for a given prediction.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
          }}
        >
          <Receipt
            color="white"
            strokeWidth={2.5}
            size={55}
            style={{ marginRight: "10px", marginTop: -12 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: 600,
                marginBottom: "6px",
                alignSelf: "flex-start",
              }}
            >
              Get rewarded
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "lightgray",
                fontWeight: 400,
                marginBottom: "8px",
                alignSelf: "flex-start",
              }}
            >
              In return for improving every predictor's experience you earn a
              share of fees for the prediction and you also accumulate more
              cred.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <CalendarClock
            color="white"
            strokeWidth={3}
            size={53}
            style={{ marginRight: "10px", marginTop: -11 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                color: "white",
                fontWeight: 600,
                marginBottom: "6px",
                alignSelf: "flex-start",
              }}
            >
              Play the long game
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "lightgray",
                fontWeight: 400,
                marginBottom: "8px",
                alignSelf: "flex-start",
                paddingRight: "1px",
              }}
            >
              The longer you boost a market the higher your share of fees will
              become. If you want to maximize your rewards wait till after
              resolution.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onClose();
            setOpen();
          }}
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "row",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: "#D9D9D9",
            width: "85vw",
            padding: "10px",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "#1D1D1D",
                fontWeight: 800,
              }}
            >
              Got it
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
