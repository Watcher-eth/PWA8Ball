// @ts-nocheck
import { GetServerSideProps } from "next";


import { SmartAccountProvider } from "@/lib/onchain/SmartAccount";
import { DesktopHomePage } from "@/components/Feed/DesktopHomePage";
import { MobileHomePage } from "@/components/Feed/MobileHomePage";
import { MobiTop } from "@/components/ui/MobiTop";
import { fetchTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const trendingMarkets = await fetchTrendingMarkets();

  return {
    props: {
      trendingMarkets,
    },
  };
};
export default function Home({ trendingMarkets }) {
  return (
    <SmartAccountProvider>
      <MobiTop
        mobile={<MobileHomePage trendingMarkets={trendingMarkets} />}
        desktop={<DesktopHomePage trendingMarkets={trendingMarkets} />}
      />
    </SmartAccountProvider>
  );
}
