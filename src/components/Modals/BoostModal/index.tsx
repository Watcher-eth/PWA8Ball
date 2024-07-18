
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
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  BadgeDollarSign,
  CreditCard,
  MinusIcon,
  PlusIcon,
  Repeat,
  ShoppingBag,
  WalletCards,
  X,
} from "lucide-react";

import { useVotingStore } from "@/lib/stores/VotingStore";

import { ConfirmButton } from "./ConfirmButton";


export function BoostModal({
  children,
  image,
  id,
}: {
  children: ReactNode;
  image: string;
  id: string;
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

  //   const { smartAccountReady, smartAccountClient, smartAccountAddress, eoa } =
  //   useSmartAccount();

  // const { mutate: boostV2 } = useBoostMarket2();
  // const { user } = usePrivy();
  // const { user: userCon } = useUserStore();
  const [toastVisible, setToastVisible] = useState(false);

  // const handleBoost = async () => {
  //   //TODO: Check Balance of user
  //   const userBalance = Number(userCon.balance) / 1000000;
  //   const hasBalance = userBalance > BigInt(15);

  //   if (!hasBalance) {
  //     router.push("/GetFundsModal");
  //   }
  //   if (hasBalance && smartAccountAddress)
  //     try {
  //       boostV2({
  //         userId: user.id,
  //         marketId: props.id,
  //         amount: 1000000,
  //         client: smartAccountClient,
  //         address: smartAccountAddress,
  //       });

  //       setToastVisible(true);
  //       setTimeout(() => setToastVisible(false), 6500); // Hide toast after 3.5 seconds
  //       setTimeout(() => {
  //         props.onClose();
  //         router.push("UserLp");
  //       }, 4500); // Hide toast after 3.5 seconds
  //     } catch (error) {
  //       console.error("Failed to boost market:", error);
  //       alert("Failed to boost market!");
  //     }
  // };

  const Option = useVotingStore((state) => state.option);
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="w-full">{children}</DrawerTrigger>
        <DrawerContent className=" border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl  ml-[4vw] mb-5 w-[92vw] relative"
          >
            <AnimatePresence>
              {step === 1 && (
                <div className="flex flex-col p-1 rounded-2xl m-4 bg-[#141415]">
                  <div className="flex flex-row items-center justify-between mb-2">
                    <img
                      src={image}
                      alt="Market"
                      className="size-10 rounded-full object-cover overflow-hidden"
                    />
                    <DrawerClose>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className=" p-2 left-6 rounded-full bg-[#282828]"
                      >
                        <X
                          size={17}
                          className="  stroke-gray-300"
                          strokeWidth={5}
                        />
                      </motion.div>
                    </DrawerClose>
                  </div>
                  <div className="text-xl text-white mt-1 font-bold">
                    Boost and earn rewards
                  </div>
                  <div className="text-base text-md mt-[0.1rem] mb-1 text-[#BEBDBD] font-bold">
                    Boost this market to earn extra gold points and trading
                    fees.
                  </div>
                  <div className="h-[0.1rem] w-full bg-[#313131] my-2"></div>
                  <div className="flex flex-row items-center justify-between mt-1 mb-2">
                    <div className="flex flex-col">
                      <div className="text-sm text-[#BEBDBD] font-bold">
                        Minimum Boost
                      </div>
                      <div className="text-lg text-white font-bold">$10.00</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-[#BEBDBD] font-bold">
                        Fee rate
                      </div>
                      <div className="text-lg text-white font-bold">0.5%</div>
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="text-sm text-[#BEBDBD] font-bold">
                      Boost
                    </div>
                    <div className="text-lg text-white font-bold">
                      3 Points for every $1.00 supplied
                    </div>
                  </div>
                  <ConfirmButton
                    id={id}
                    buttonText="Confirm"
                    onComplete={() => {}}
                  />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};


