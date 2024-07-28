
export function ContrastButton({
  label,
  className = "",
  onClick,
  IconComponent,
  icon,
}: {
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
  IconComponent?: React.FC;
  icon?: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        w-1/2 h-10 font-semibold text-[0.95rem] text-white bg-slate-400/10
        ring-1 ring-transparent hover:ring-white/10 active:ring-white/20
        flex justify-center items-center rounded-md
        hover:scale-102 active:scale-98 transition-all cursor-pointer
        ${className}
      `}
    >
      {icon}
      {IconComponent && (
        // @ts-ignore
        <IconComponent className="size-4 mr-1" strokeWidth={3} />
      )}
      {label}
    </div>
  );
}
