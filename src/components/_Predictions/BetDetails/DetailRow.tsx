export function DetailRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-row w-full items-center">
      <div className="flex flex-col p-2.5 size-14 rounded-md bg-[#131313] items-center mr-3 justify-center">
        {icon}
      </div>
      <div className="flex flex-col space-y-[-0.1rem]">
        <span className="text-sm font-bold text-gray-200">{title}</span>
        <span className="text-lg font-bold text-white">
          {subtitle}
        </span>
      </div>
    </div>
  );
}