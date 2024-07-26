import { DrawerClose } from "@/components/ui/drawer";

import { KeypadActionButton } from "./KeypadActionButton";
import { KeypadButton } from "./KeypadButton";
import { KeypadAmountButton } from "./KeypadAmountButton";

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
        {["10", "25", "50", "100", userBalance?.toFixed(2)].map((amount) => (
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
            className="flex  flex-row justify-between items-center px-2 py-4"
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
