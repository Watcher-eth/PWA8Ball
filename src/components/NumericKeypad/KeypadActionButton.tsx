export function KeypadActionButton({
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
        mt-5 p-2 rounded-full bg-white w-[80vw] text-base text-center text-[#131313]
        font-extrabold active:scale-95 hover:scale-101 transition-all
      `}
    >
      {label}
    </button>
  );
}
