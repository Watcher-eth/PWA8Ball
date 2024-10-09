export function StandardPageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#080808] sm:px-0 md:px-4   ${className}`}
    >
      {children}
    </div>
  );
}
