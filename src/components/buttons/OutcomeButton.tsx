import { Button } from "@/components/ui/Button";

export function OutcomeButton({
  text,
  multiplier,
  option,
  className,
  isDesktop,
  onClick,
}: {
  text: string;
  multiplier: number;
  option: number;
  className?: string;
  isDesktop?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const outcomeOptionClassName = getClassNameFromOption(option);
  return (
    <Button
      onClick={(e) => {
        onClick?.(e);
        // e.stopPropagation();
      }}
      className={`
            ${outcomeOptionClassName}
            active:scale-99 hover:scale-101 transition-all
            text-[1.3rem] text-white font-bold h-[2.8rem] rounded-md items-center
            w-full
            ${className}
        `}
    >
      <div
        className={
          text?.length < 6
            ? "text-[22px] sm:text-[18px] lg:text-[22px]"
            : "text-[18px] sm:text-[16px] lg:text-[22px]"
        }
      >
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
