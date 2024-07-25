export function KeypadAmountButton({
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
