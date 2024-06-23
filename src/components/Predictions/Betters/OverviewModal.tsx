// @ts-nocheck

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProportionalSlider from "./Slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";
import { shortenAddress } from "@/lib/utils/shortenAddress";

const BettersOverviewModal = ({
  children,
  title,
  question,
  image,
  optionA,
  optionB,
  odds,
  marketId,
  users,
}) => {
  const router = useRouter();

  return (
    <div style={{ zIndex: 2 }}>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="border-0 rounded-3xl self-center">
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="bg-[#131313] rounded-3xl  ml-[4vw] mb-5 w-[92vw] relative"
          >
            <AnimatePresence>
              <div className="flex flex-col p-0 rounded-2xl m-4 bg-[#141414]">
                <div className="flex flex-row items-center ">
                  <img
                    src={image}
                    className="h-14 w-14 rounded-md object-cover overflow-hidden mr-2"
                    style={{ borderRadius: 8 }}
                  />
                  <div className="max-w-[70%]">
                    <div
                      style={{
                        fontFamily: "Aeonik-Bold",
                        fontSize: "17px",
                        color: "white",
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Aeonik-Bold",
                        fontSize: "12px",
                        color: "lightgray",
                      }}
                      className="line-clamp-2"
                    >
                      {question}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "12px",
                    marginBottom: "-3px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Aeonik-Bold",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    {(100 - odds).toFixed(0)}% {optionA}
                  </p>
                  <p
                    style={{
                      fontFamily: "Aeonik-Bold",
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    {odds.toFixed(0)}% {optionB}
                  </p>
                </div>

                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <ProportionalSlider value={odds / 99} />
                </div>
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "#454141",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
                {users.length > 0 && (
                  <p
                    style={{
                      fontFamily: "Aeonik-Bold",
                      fontSize: "20px",
                      color: "white",
                      marginBottom: "0px",
                    }}
                  >
                    {title} Predictors
                  </p>
                )}

                {users.length > 0 ? (
                  <div style={{ height: "28vh", overflowY: "scroll" }}>
                    {users.map((user, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        style={{ alignSelf: "center" }}
                      >
                        <BettersOverviewItem onClose={() => {}} {...user} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <BettersOverviewPlaceholder />
                )}
                {users.length > 4 && (
                  <p
                    style={{
                      fontFamily: "AeonikBold",
                      fontSize: "14px",
                      color: "#DCDCDC",
                      marginBottom: "15px",
                      marginTop: "15px",
                      alignSelf: "center",
                    }}
                  >
                    Show {users.length - 4} more
                  </p>
                )}
              </div>
            </AnimatePresence>
          </motion.div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BettersOverviewModal;

const BettersOverviewItem = ({
  name,
  walletaddress,
  amount,
  option,
  pfp,
  external_auth_provider_user_id,
  onClose,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        onClose();
        router.push({
          pathname: `/profile/${external_auth_provider_user_id}`,
          query: { id: external_auth_provider_user_id },
        });
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "8px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src={pfp}
          alt={name}
          style={{
            height: "45px",
            width: "45px",
            borderRadius: "22px",
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "7px",
            maxWidth: "70%",
          }}
        >
          <p
            style={{
              fontFamily: "Aeonik-Bold",

              fontSize: "18px",
              color: "white",
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontFamily: "Aeonik-Bold",
              fontSize: "14px",
              color: "lightgray",
            }}
          >
            {shortenAddress(walletaddress)}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 10px",
          minWidth: "90px",
          marginRight: "5px",
          borderWidth: "1.5px",
          borderColor: "#212121",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            fontFamily: "Aeonik-Bold",
            color: "white",
          }}
        >
          ${(amount / 10 ** 6).toFixed(2)} {option.name}
        </p>
      </div>
    </div>
  );
};

export function BettersOverviewPlaceholder() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "8px",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Skeleton style={{ width: 45, borderRadius: 22 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "7px",
            gap: "5px",
          }}
        >
          <Skeleton style={{ width: "40%", borderRadius: 10 }} />

          <Skeleton style={{ width: "65%", borderRadius: 10 }} />
        </div>
      </div>

      <Skeleton style={{ width: 90, borderRadius: 20 }} />
    </div>
  );
}
