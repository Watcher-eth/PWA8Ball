// @ts-nocheck



export default function MarketPage({ params, searchParams }: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params ?? {};
  // const metadata = generateMetadata({ params, searchParams });
  return (
    <>

      <div>{/* Your page component logic */}</div>
    </>
  );
}
