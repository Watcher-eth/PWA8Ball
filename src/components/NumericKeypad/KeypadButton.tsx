export function KeypadButton({
  value,
  handleButtonPress,
  onClick,
}: {
  value: string
  handleButtonPress?: (value: string) => void
  onClick?: () => void
}) {
  return (
    <button
      onClick={() => {
        handleButtonPress?.(value) ?? onClick?.()
      }}
      className={`
        text-xl font-bold text-white px-5
        active:scale-115 hover:scale-102 transition-all
      `}
    >
      {value}
    </button>
  )
}
