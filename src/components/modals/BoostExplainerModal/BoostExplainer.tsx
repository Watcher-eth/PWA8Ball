import { BatteryCharging, CalendarClock, Receipt, X } from "lucide-react";

export function BoostExplainer({
  setOpen,
  onClose,
}: {
  setOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className={`
        flex flex-col items-center w-full bg-[#131313]
        py-[15px] mt-10 rounded-t-[30px]  min-h-[585px]
      `}
    >
      <div
        className={`
          flex flex-col items-start w-full overflow-hidden
          bg-[#131313] px-[23px] py-[15px] rounded-[20px]
        `}
      >
        <button
          onClick={onClose}
          className={`
            px-1.5 py-2 rounded-[17px] overflow-hidden
            bg-[#282828] top-[75px] left-[85%]
            border-none cursor-pointer
            transition-all active:scale-97
          `}
        >
          <X color={"#686868"} strokeWidth={5} height={20} />
        </button>
        <h2
          className={`
            text-[24px] font-bold text-white
            mt-[7px] mb-[8px] self-start
          `}
        >
          What is boosting?
        </h2>
        <p
          className={`
            text-[15px] text-[lightgray]
            mb-[37px] font-medium self-start
          `}
        >
          If you boost a market you add some of your funds to improve the
          accuracy of odds for a prediction and help everyone get fairer prices.
        </p>
        <div className="flex flex-row mb-5">
          <BatteryCharging
            color="white"
            strokeWidth={3}
            size={50}
            style={{ marginRight: "10px", marginTop: -10 }}
          />
          <div className="flex flex-col">
            <h3 className="text-[20px] text-white font-semibold mb-1.5 self-start">
              Improve accuracy of odds
            </h3>
            <p
              className={`
                text-[15px] text-[lightgray] font-normal
                self-start mb-2 pr-[1.5px]
              `}
            >
              Boost a market with your funds to improve the accuracy of odds and
              liquidity for a given prediction.
            </p>
          </div>
        </div>
        <div className="flex flex-row mb-5">
          <Receipt
            color="white"
            strokeWidth={2.5}
            size={55}
            style={{ marginRight: "10px", marginTop: -12 }}
          />
          <div className="flex flex-col">
            <h3 className="text-[20px] text-white font-semibold mb-1.5 self-start">
              Get rewarded
            </h3>
            <p
              className={`
                text-[15px] text-[lightgray] font-[Aeonik]
                self-start mb-2
              `}
            >
              In return for improving every predictor's experience you earn a
              share of fees for the prediction and you also accumulate more
              cred.
            </p>
          </div>
        </div>
        <div className="flex flex-row mb-2.5">
          <CalendarClock
            color="white"
            strokeWidth={3}
            size={53}
            style={{ marginRight: "10px", marginTop: -11 }}
          />
          <div className="flex flex-col">
            <h3 className="text-[20px] text-white font-semibold mb-1.5 self-start">
              Play the long game
            </h3>
            <p
              className={`
                text-[15px] text-[lightgray] font-[Aeonik]
                self-start mb-2 pr-[1px]
              `}
            >
              The longer you boost a market the higher your share of fees will
              become. If you want to maximize your rewards wait till after
              resolution.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center mb-5">
        <button
          onClick={() => {
            onClose();
            setOpen();
          }}
          className={`
            mt-3 flex flex-row
            rounded-[24px] overflow-hidden
            border-none cursor-pointer
            bg-[#D9D9D9] w-[85vw] p-2.5
            items-center justify-center
            transition-all active:scale-97
          `}
        >
          <div className="flex flex-row items-center justify-center">
            <span className="text-[20px] font-extrabold text-[#1D1D1D]">
              Got it
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
