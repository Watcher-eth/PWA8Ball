export function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-slate-400/10
        rounded-full ring-1 ring-white/10 px-3 py-1 backdrop-blur-xl ${className}
        items-center
      `}
    >
      {children}
    </div>
  );
}
