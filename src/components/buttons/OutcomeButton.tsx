import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function OutcomeButton({
  text,
  multiplier,
  option,
  className,
  isDesktop,
}: {
  text: string;
  multiplier: number;
  option: number;
  className?: string;
  isDesktop?: boolean;
}) {
  const outcomeOptionClassName = getClassNameFromOption(option);
  return (
    <Button
      onClick={(e) => e.stopPropagation()}
      className={`
            ${outcomeOptionClassName}
            active:scale-[0.99] hover:scale-[1.01] transition-all
            text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl
            ${isDesktop ? "w-[18vw]" : "w-[42vw]"}
            ${className}
        `}
    >
      <div className={text?.length < 6 ? "text-[22px]" : "text-[18px]"}>
        {text}{" "}
      </div>
      <div
        className={`
          text-[0.81rem] font-medium text-white/80
          self-end mb-0.5 ml-1
        `}
      >
        {multiplier}%
      </div>
    </Button>
  );
}

function getClassNameFromOption(option: string | number) {
  if (option == 0) {
    return "bg-rose-600 hover:!bg-rose-700 active:bg-rose-800" as const; // red
  } else if (option == 1) {
    return "bg-blue-600 hover:!bg-blue-700 active:bg-blue-800" as const;
  } else {
    return "";
  }
}
