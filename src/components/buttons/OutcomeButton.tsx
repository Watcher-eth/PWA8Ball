import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function OutcomeButton({
  text,
  multiplier,
  option,
  className,
}: {
  text: string;
  multiplier: number;
  option: number;
  className?: string;
}) {
  const outcomeOptionClassName = getClassNameFromOption(option);
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        className={`
            ${outcomeOptionClassName}
            text-[1.3rem] text-white font-bold h-[2.8rem] rounded-xl w-[42vw]
            ${className}
        `}
      >
        <div className={text?.length < 6 ? "text-[22px]" : "text-[18px]"}>
          {text}{" "}
        </div>
        <div
          className={`
            text-[0.81rem] font-medium text-[rgba(250,250,250,0.8)]
            self-end mb-0.5 ml-1
          `}
        >
          {multiplier}%
        </div>
      </Button>
    </motion.div>
  );
}

function getClassNameFromOption(option: string | number) {
  if (option == 0) {
    return "active:bg-[#FF0050] hover:bg-[#FF0050] bg-[#FF0050]" as const; // red
  } else if (option == 1) {
    return "active:bg-[#0050FF] hover:bg-[#0050FF] bg-[#0050FF]" as const;
  } else {
    return "";
  }
}
