import { Button } from "@/components/ui/Button"

export function OutcomeButton({
  text,
  multiplier,
  option,
  className,
  isDesktop,
  onClick,
}: {
  text: string
  multiplier: number
  option: number
  className?: string
  isDesktop?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const outcomeOptionClassName = getClassNameFromOption(option)
  return (
    <Button
      onClick={onClick}
      className={`
            ${outcomeOptionClassName}
            active:scale-99 hover:scale-101 transition-all
            text-[1.3rem] text-white font-bold h-[2.8rem] rounded-[0.6rem] items-center
            w-full
            ${className}
        `}
    >
      <div
        className={
          text?.length < 6
            ? "text-[22px] sm:text-[18px] xl:text-[22px]"
            : "text-[18px] sm:text-[16px] xl:text-[22px]"
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
  )
}

function getClassNameFromOption(option: string | number) {
  if (option == 0) {
    return `
      bg-red-500/5 hover:!bg-red-500/10
      border border-red-500/20
      active:border-red-500/30 active:bg-red-500/15
      ` as const
    //"bg-[#141414] hover:!bg-[#151515]  border-[0.12rem] border-[#212121] active:bg-[#181818]" as const; // red
  } else if (option == 1) {
    return `
      bg-blue-500/5 hover:!bg-blue-500/10
      border border-blue-500/20
      active:border-blue-500/30 active:bg-blue-500/15
      ` as const
    //"bg-[#141414] hover:!bg-[#151515] border-[0.12rem] border-[#212121] active:bg-[#181818]" as const;
  } else {
    return ""
  }
}
