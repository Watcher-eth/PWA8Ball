import { DrawerClose } from "@/components/ui/drawer";

export function NumericKeypad({
  sliderValue,
  setSliderValue,
  userBalance,
  handleButtonPress,
  handleDelete,
  handleContinue,
}: {
  sliderValue: string;
  setSliderValue: (value: string) => void;
  userBalance: number;
  handleButtonPress: (value: string) => void;
  handleDelete: () => void;
  handleContinue: () => void;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between px-2">
        {["10", "25", "50", "100", userBalance.toFixed(2)].map((amount) => (
          <KeypadAmountButton
            key={amount}
            onClick={() => setSliderValue(String(amount))}
          >
            {amount === userBalance.toFixed(2) ? "Max" : `$${amount}`}
          </KeypadAmountButton>
        ))}
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
              <KeypadButton
                key={num}
                value={num}
                handleButtonPress={handleButtonPress}
              />
            ))}
          </div>
        ))}
        <div className="flex flex-row justify-between items-center px-2 py-4 pb-0">
          <KeypadButton value={"."} handleButtonPress={handleButtonPress} />
          <KeypadButton value={"0"} handleButtonPress={handleButtonPress} />
          <KeypadButton value="<" onClick={handleDelete} />
        </div>
      </div>
      <div className="flex flex-row items-center w-full mt-4 justify-center">
        {sliderValue === "" ? (
          <DrawerClose>
            <KeypadActionButton label="Cancel" />
          </DrawerClose>
        ) : (
          <KeypadActionButton
            label="Continue"
            onClick={handleContinue} // Assuming the next step index is 1
          />
        )}
      </div>
    </>
  );
}

function KeypadAmountButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        text-sm font-bold rounded-xl bg-[#212121] text-white
        mr-2 mb-1 p-1 px-3
        active:scale-95 hover:scale-101 transition-all
      `}
    >
      {children}
    </button>
  );
}

function KeypadButton({
  value,
  handleButtonPress,
  onClick,
}: {
  value: string;
  handleButtonPress?: (value: string) => void;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={() => {
        handleButtonPress?.(value) ?? onClick?.();
      }}
      className={`
        text-xl font-bold text-white px-5
        active:scale-95 hover:scale-101 transition-all
      `}
    >
      {value}
    </button>
  );
}

function KeypadActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        mt-5 p-2 rounded-full bg-white w-[80vw] text-[1rem] text-center text-[#131313]
        font-extrabold active:scale-95 hover:scale-101 transition-all
      `}
    >
      {label}
    </button>
  );
}
