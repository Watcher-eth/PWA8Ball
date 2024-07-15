export function StandardBleedOverlay({ children }: { children: React.ReactNode }) {
  return <div className="sm:-mx-0 md:-mx-4 lg:-mx-8 xl:-mx-14">{children}</div>;
}

export function InverseBleedOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="sm:p-0 md:px-4 lg:px-8 xl:px-14">{children}</div>;
}

export function InverseVerticalBleedOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="-mt-24">{children}</div>;
}