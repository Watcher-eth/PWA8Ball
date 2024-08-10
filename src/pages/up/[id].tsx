// @ts-nocheck

import { MobiTop } from "@/components/layouts/MobiTop";
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
    <div className="flex justify-center items-center h-[100vh]">
      <img
        className="absolute top-0 w-full h-full"
        src="https://rockstarintel.com/wp-content/uploads/2024/03/GTA-VI-article-image-illustration-2.webp"
      />
      <div className="absolute top-0 w-full h-full backdrop-blur-md" />
      <MobiTop
        desktop={
          <Receipt
            title="Base 10mil Mau"
            points={3920}
            image="https://rockstarintel.com/wp-content/uploads/2024/03/GTA-VI-article-image-illustration-2.webp"
            options={["Yes", "No"]}
            option={1}
            id={11}
            isDesktop
            question="Will Base reach 10 million monthly active wallets during onchain summer?"
          />
        }
        mobile={
          <Receipt
            title="Base 10mil Mau"
            points={3920}
            image="https://rockstarintel.com/wp-content/uploads/2024/03/GTA-VI-article-image-illustration-2.webp"
            options={["Yes", "No"]}
            option={1}
            id={11}
            question="Will Base reach 10 million monthly active wallets during onchain summer?"
          />
        }
      />
    </div>
  );
}
