// @ts-nocheck

import { Receipt } from "@/components/share/UserPosition.tsx";

export default function MarketPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params ?? {};
  // const metadata = generateMetadata({ params, searchParams });
  return (
    <Receipt
      title="Base 10mil Mau"
      points={3920}
      image="https://images.mirror-media.xyz/publication-images/yyhMh-YKnMgC0jETSQqvv.png?height=1200&width=2400"
      options={["Yes", "No"]}
      option={1}
      id={11}
      question="Will Base reach 10 million monthly active wallets during onchain summer?"
    />
  );
}
