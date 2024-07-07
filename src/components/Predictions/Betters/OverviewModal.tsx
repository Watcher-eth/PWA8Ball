// @ts-nocheck
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { ProportionalSlider } from "./ProportionalSlider";
import { Skeleton } from "@/components/ui/Skeleton";
import { shortenAddress } from "@/lib/utils/shortenAddress";
import { getProfilePath } from "@/utils/urls";


export function BettersOverviewModal({
  children,
  title,
  question,
  image,
  optionA,
  optionB,
  odds,
  marketId,
  users,
}) {

  return (
    <div className="z-[2]">
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
                    className="h-14 w-14 rounded-[8px] object-cover overflow-hidden mr-2"
                  />
                  <div className="max-w-[70%]">
                    <div className="font-[Aeonik-Bold] text-[17px] text-white">
                      {title}
                    </div>
                    <div
                      className={`
                        font-[Aeonik-Bold] text-[lightgray] text-[12px] line-clamp-2
                      `}
                    >
                      {question}
                    </div>
                  </div>
                </div>
                <div
                  className={`
                    flex flex-row justify-between items-center mt-3 -mb-1
                  `}
                >
                  <p className="font-[Aeonik-Bold] text-[15px] text-white">
                    {(100 - odds).toFixed(0)}% {optionA}
                  </p>
                  <p className="font-[Aeonik-Bold] text-[15px] text-white">
                    {odds.toFixed(0)}% {optionB}
                  </p>
                </div>

                <div className="w-full">
                  <ProportionalSlider value={odds / 99} />
                </div>
                <div className="h-[1px] w-full bg-[#454141] my-5"/>
                {users?.length > 0 && (
                  <p className="font-[Aeonik-Bold] text-[20px] text-white">
                    {title} Predictors
                  </p>
                )}

                {users?.length > 0 ? (
                  <div className="h-[28vh] overflow-y-scroll">
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
                {users?.length > 4 && (
                  <p
                    className={`
                      font-[AeonikBold] text-[14px] text-[#DCDCDC]
                      my-4 text-center
                    `}
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


const BettersOverviewItem = ({
  name,
  walletaddress,
  amount,
  option,
  pfp,
  external_auth_provider_user_id,
  onClose,
}) => {

  return (
    <Link href={getProfilePath(external_auth_provider_user_id)}>
      <div
        onClick={() => {
          onClose();
        }}
        className={`
          flex flex-row justify-between items-center w-full
          my-2 cursor-pointer
        `}
      >
        <div className="flex flex-row items-center">
          <img
            src={pfp}
            alt={name}
            className="size-[45px] rounded-[22px] overflow-hidden object-cover"
          />
          <div className="flex flex-col ml-2 max-w-[70%]">
            <p className="font-[Aeonik-Bold] text-[18px] text-white">{name}</p>
            <p className="font-[Aeonik-Bold] text-[14px] text-[lightgray]">
              {shortenAddress(walletaddress)}
            </p>
          </div>
        </div>
        <div
          className={`
            flex items-center justify-center
            px-2.5 py-1.5 min-w-[90px] mr-1.5
            border border-[#212121] rounded-[20px]
            overflow-hidden
          `}
        >
          <p className="font-[Aeonik-Bold] text-[15px] text-white">
            ${(amount / 10 ** 6).toFixed(2)} {option.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export function BettersOverviewPlaceholder() {
  return (
    <div
      className="flex flex-row justify-between items-center w-full my-2"
    >
      <div
        className="flex flex-row items-center"
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
