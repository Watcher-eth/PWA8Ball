// @ts-nocheck
import { Predictions } from "@/components/Predictions";
import { DesktopMarketPage } from "@/components/Predictions/DesktopMarketPage";
import { MobiTop } from "@/components/ui/MobiTop";
import { useRouter } from "next/router";
import { MobileMarketPage } from "@/components/Predictions/MobileMarketPage";

export default function MarketPage({ params, searchParams }: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <MobiTop
        mobile={<MobileMarketPage id={id} />}
        desktop={<DesktopMarketPage id={id} />}
      />
    </>
  );
}
