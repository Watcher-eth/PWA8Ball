export function TimeframeSelector({
  timeframes,
  timeframe,
  setTimeframe,
}: {
  timeframes: string[]
  timeframe: string
  setTimeframe: (timeframe: string) => void
}) {
  return (
    <div
      className={`
        flex flex-row items-center justify-between self-center
        mb-4  px-12
      `}
    >
      {timeframes.map((item, index) => (
        <div
          key={index}
          onClick={() => setTimeframe(item)}
          className={`
            rounded-full cursor-pointer group
            ${timeframe === item ? "bg-white/90" : "bg-transparent"}
            ring-1 ring-transparent hover:ring-white/10 active:ring-white/20
            px-2 pb-0.5
          `}
        >
          <span
            className={`
              text-sm font-semibold
              ${timeframe === item ? "text-black" : "text-white/80"}
            `}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}
