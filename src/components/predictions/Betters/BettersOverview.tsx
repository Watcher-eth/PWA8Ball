// @ts-nocheck

import { motion } from "framer-motion";
import { ProportionalSlider } from "./ProportionalSlider";
import { BettersOverviewPlaceholder } from "./BettersOverviewPlaceholder";
import { BettersOverviewItem } from "./BetterOverviewItem";

export function BettersOverview({
  children,
  title,
  question,
  image,
  optionA,
  optionB,
  odds,
  marketId,
  users,
  isDesktop,
}) {
  return (
    <div
      className={`flex flex-col p-0 rounded-2xl ${
        isDesktop ? "bg-[transparent]" : " m-4 bg-[#080808]"
      } `}
    >
      <div className="flex flex-row items-center ">
        <img
          src={image}
          className="h-14 w-14 rounded-md object-cover overflow-hidden mr-2"
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
          {odds.toFixed(0)}% {optionA.name}
        </p>
        <p
          style={{
            fontFamily: "Aeonik-Bold",
            fontSize: "15px",
            color: "white",
          }}
        >
          {(100 - odds).toFixed(0)}% {optionB.name}
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
      {users?.length > 0 && (
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

      {users?.length > 0 ? (
        <div style={{ height: "30vh", overflowY: "scroll" }}>
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
          style={{
            fontFamily: "Aeonik",
            fontSize: "14px",
            color: "#DCDCDC",
            marginBottom: "10px",
            marginTop: "15px",
            alignSelf: "center",
          }}
        >
          Show {users.length - 4} more
        </p>
      )}
    </div>
  );
}
